import { ref } from 'vue'

/* Text-to-speech a due livelli:
   1. Piper/VITS (modello neurale in-browser via vits-web, caricato in lazy
      al primo uso): voci naturali identiche su tutti i browser, una per
      lingua, scaricate solo quando servono e salvate nella cache del browser.
   2. Web Speech API come fallback immediato mentre il modello scarica,
      se il caricamento fallisce o il dispositivo non lo regge. */

const TTS_KEY = 'glimmy-tts-enabled'

const ttsEnabled = ref(localStorage.getItem(TTS_KEY) !== 'false')
const isSpeaking = ref(false)

/* Stato del motore neurale, esposto alla UI per l'indicatore di download */
type NeuralStatus = 'idle' | 'loading' | 'ready' | 'failed'
const neuralStatus = ref<NeuralStatus>('idle')
const neuralProgress = ref(0)

const supported = typeof window !== 'undefined' && 'speechSynthesis' in window

const langMap: Record<string, string> = {
  it: 'it-IT',
  en: 'en-US',
  es: 'es-ES'
}

/* Voci Piper per lingua: una sola voce per lingua, scaricata on-demand.
   paola-medium non è nella mappa di vits-web ma esiste nel mirror HF:
   la registriamo a mano perché riccardo-x_low (l'unica inclusa) suona male. */
const piperVoices: Record<string, string> = {
  it: 'it_IT-paola-medium',
  en: 'en_US-hfc_female-medium',
  es: 'es_ES-davefx-medium'
}

const EXTRA_VOICE_PATHS: Record<string, string> = {
  'it_IT-paola-medium': 'it/it_IT/paola/medium/it_IT-paola-medium.onnx'
}

/* ============ Motore neurale (Piper via vits-web) ============ */

let vits: typeof import('@diffusionstudio/vits-web') | null = null
const readyVoices = new Set<string>()
const loadingVoices = new Set<string>()
let currentAudio: HTMLAudioElement | null = null

async function loadNeural(voiceId: string) {
  if (loadingVoices.has(voiceId) || readyVoices.has(voiceId)) return
  loadingVoices.add(voiceId)
  neuralStatus.value = 'loading'
  neuralProgress.value = 0
  try {
    if (!vits) {
      vits = await import('@diffusionstudio/vits-web')
      Object.assign(vits.PATH_MAP as Record<string, string>, EXTRA_VOICE_PATHS)
    }
    const stored: string[] = await vits.stored()
    if (!stored.includes(voiceId)) {
      await vits.download(voiceId as never, (p: { loaded: number; total: number }) => {
        if (p.total) neuralProgress.value = Math.round((p.loaded / p.total) * 100)
      })
    }
    readyVoices.add(voiceId)
    neuralStatus.value = 'ready'
  } catch (e) {
    console.error('Neural TTS load failed, falling back to Web Speech:', e)
    neuralStatus.value = 'failed'
  } finally {
    loadingVoices.delete(voiceId)
  }
}

async function speakNeural(text: string, voiceId: string): Promise<boolean> {
  if (!vits) return false
  try {
    isSpeaking.value = true
    const wav = await vits.predict({ text, voiceId: voiceId as never })
    const url = URL.createObjectURL(wav)
    const audio = new Audio(url)
    audio.onended = () => {
      if (currentAudio === audio) {
        isSpeaking.value = false
        currentAudio = null
      }
      URL.revokeObjectURL(url)
    }
    audio.onerror = () => {
      isSpeaking.value = false
      URL.revokeObjectURL(url)
    }
    currentAudio = audio
    await audio.play()
    return true
  } catch (e) {
    console.error('Neural TTS generation failed:', e)
    isSpeaking.value = false
    return false
  }
}

/* ============ Fallback Web Speech API ============ */

/* Le voci arrivano in modo asincrono: teniamo una cache aggiornata. */
let cachedVoices: SpeechSynthesisVoice[] = []

if (supported) {
  cachedVoices = window.speechSynthesis.getVoices()
  window.speechSynthesis.addEventListener('voiceschanged', () => {
    cachedVoices = window.speechSynthesis.getVoices()
  })
}

/* Sceglie la voce di sistema migliore: le voci neurali di Edge ("Natural")
   e quelle di Google suonano molto meglio delle voci classiche. */
function pickVoice(lang: string): SpeechSynthesisVoice | null {
  const short = lang.split('-')[0]
  const candidates = cachedVoices.filter(
    v => v.lang === lang || v.lang.replace('_', '-').startsWith(short)
  )
  if (candidates.length === 0) return null

  const score = (v: SpeechSynthesisVoice): number => {
    let s = 0
    if (/natural|neural/i.test(v.name)) s += 100
    if (/google/i.test(v.name)) s += 50
    if (/online/i.test(v.name)) s += 10
    if (v.lang === lang) s += 5
    if (v.localService) s += 1
    return s
  }

  return [...candidates].sort((a, b) => score(b) - score(a))[0]
}

function speakWebSpeech(text: string, locale: string) {
  if (!supported) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  const lang = langMap[locale] || locale
  utterance.lang = lang
  const voice = pickVoice(lang)
  if (voice) utterance.voice = voice
  utterance.rate = 0.95
  utterance.pitch = 1.05
  utterance.onstart = () => { isSpeaking.value = true }
  utterance.onend = () => { isSpeaking.value = false }
  utterance.onerror = () => { isSpeaking.value = false }
  window.speechSynthesis.speak(utterance)
}

/* ============ API pubblica ============ */

/* Pulisce il testo prima della lettura: gli underscore dei "buchi" da riempire
   e le emoji non vanno pronunciati. */
function sanitizeForSpeech(text: string): string {
  return text
    .replace(/[_]+/g, '…')
    .replace(/[[\]]/g, '')
    .replace(/\p{Extended_Pictographic}/gu, '')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

async function speak(text: string, locale = 'it') {
  if (!ttsEnabled.value || !text) return
  const clean = sanitizeForSpeech(text)
  if (!clean) return

  stop()

  // Voce neurale se già scaricata per questa lingua; altrimenti avvia il
  // download in background e nel frattempo usa la voce di sistema.
  const voiceId = piperVoices[locale] || piperVoices.en
  if (readyVoices.has(voiceId)) {
    const ok = await speakNeural(clean, voiceId)
    if (ok) return
  } else {
    loadNeural(voiceId)
  }

  speakWebSpeech(clean, locale)
}

function stop() {
  if (supported) window.speechSynthesis.cancel()
  if (currentAudio) {
    currentAudio.pause()
    currentAudio = null
  }
  isSpeaking.value = false
}

function toggleTts() {
  ttsEnabled.value = !ttsEnabled.value
  localStorage.setItem(TTS_KEY, String(ttsEnabled.value))
  if (!ttsEnabled.value) stop()
}

export function useSpeech() {
  return {
    // Con Kokoro il TTS è disponibile ovunque, anche senza Web Speech API
    supported: true,
    ttsEnabled,
    isSpeaking,
    neuralStatus,
    neuralProgress,
    speak,
    stop,
    toggleTts
  }
}
