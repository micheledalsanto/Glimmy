import { ref } from 'vue'

/* Stato globale della mascotte: i giochi e le pagine chiamano
   say()/react() e GlimmyMascot.vue (nel layout) si anima di conseguenza. */

export type GlimmyMood = 'idle' | 'happy' | 'sad' | 'celebrate' | 'thinking'

const mood = ref<GlimmyMood>('idle')
const message = ref<string | null>(null)

let moodTimer: ReturnType<typeof setTimeout> | null = null
let messageTimer: ReturnType<typeof setTimeout> | null = null

/** Cambia l'umore di Glimmy, tornando a idle dopo `durationMs`. */
function react(newMood: GlimmyMood, durationMs = 2500) {
  mood.value = newMood
  if (moodTimer) clearTimeout(moodTimer)
  if (newMood !== 'idle') {
    moodTimer = setTimeout(() => { mood.value = 'idle' }, durationMs)
  }
}

/** Mostra un fumetto di dialogo accanto a Glimmy. */
function say(text: string, opts: { mood?: GlimmyMood; durationMs?: number } = {}) {
  message.value = text
  if (opts.mood) react(opts.mood, opts.durationMs ?? 4000)
  if (messageTimer) clearTimeout(messageTimer)
  messageTimer = setTimeout(() => { message.value = null }, opts.durationMs ?? 4000)
}

function hush() {
  message.value = null
  if (messageTimer) clearTimeout(messageTimer)
}

export function useGlimmy() {
  return { mood, message, react, say, hush }
}
