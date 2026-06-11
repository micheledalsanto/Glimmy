import { ref } from 'vue'

/* Effetti sonori generati con WebAudio: nessun file da scaricare,
   suoni morbidi adatti ai bambini. */

const SOUND_KEY = 'glimmy-sound-enabled'

const soundEnabled = ref(localStorage.getItem(SOUND_KEY) !== 'false')

let ctx: AudioContext | null = null

function audioCtx(): AudioContext | null {
  if (typeof AudioContext === 'undefined') return null
  if (!ctx) ctx = new AudioContext()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function tone(freq: number, startAt: number, duration: number, type: OscillatorType = 'sine', gainPeak = 0.12) {
  const ac = audioCtx()
  if (!ac) return
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  osc.type = type
  osc.frequency.value = freq
  const t0 = ac.currentTime + startAt
  gain.gain.setValueAtTime(0, t0)
  gain.gain.linearRampToValueAtTime(gainPeak, t0 + 0.015)
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration)
  osc.connect(gain).connect(ac.destination)
  osc.start(t0)
  osc.stop(t0 + duration + 0.05)
}

function playCorrect() {
  if (!soundEnabled.value) return
  tone(523.25, 0, 0.18) // C5
  tone(659.25, 0.09, 0.22) // E5
}

function playWrong() {
  if (!soundEnabled.value) return
  tone(220, 0, 0.2, 'triangle', 0.1)
  tone(174.6, 0.12, 0.28, 'triangle', 0.1)
}

function playClick() {
  if (!soundEnabled.value) return
  tone(880, 0, 0.06, 'sine', 0.06)
}

function playFlip() {
  if (!soundEnabled.value) return
  tone(660, 0, 0.08, 'sine', 0.07)
}

function playFanfare() {
  if (!soundEnabled.value) return
  tone(523.25, 0, 0.16) // C5
  tone(659.25, 0.12, 0.16) // E5
  tone(783.99, 0.24, 0.16) // G5
  tone(1046.5, 0.36, 0.4) // C6
}

function playUnlock() {
  if (!soundEnabled.value) return
  tone(783.99, 0, 0.12, 'sine', 0.1)
  tone(987.77, 0.1, 0.12, 'sine', 0.1)
  tone(1318.5, 0.2, 0.35, 'sine', 0.12)
}

function toggleSound() {
  soundEnabled.value = !soundEnabled.value
  localStorage.setItem(SOUND_KEY, String(soundEnabled.value))
}

export function useSound() {
  return {
    soundEnabled,
    toggleSound,
    playCorrect,
    playWrong,
    playClick,
    playFlip,
    playFanfare,
    playUnlock
  }
}
