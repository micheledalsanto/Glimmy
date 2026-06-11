<template>
  <div class="glimmy-wrap" :class="`mood-${mood}`">
    <Transition name="bubble">
      <div v-if="message" class="bubble card">
        <p class="text-sm font-semibold text-ink leading-snug">{{ message }}</p>
      </div>
    </Transition>
    <img
      :src="glimmySrc"
      alt="Glimmy"
      class="glimmy-img"
      @click="onPoke"
    />
    <div v-if="mood === 'celebrate'" class="confetti" aria-hidden="true">
      <span v-for="n in 12" :key="n" class="confetto" :style="confettoStyle(n)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useGlimmy } from '../composables/useGlimmy'
import { useSound } from '../composables/useSound'

const glimmySrc = new URL('../assets/images/glimmy.png', import.meta.url).href

const { t } = useI18n()
const { mood, message, say } = useGlimmy()
const { playClick } = useSound()

const pokes = ['poke1', 'poke2', 'poke3', 'poke4']

function onPoke() {
  playClick()
  const key = pokes[Math.floor(Math.random() * pokes.length)]
  say(t(`glimmy.${key}`), { mood: 'happy', durationMs: 3000 })
}

const palette = ['#F7B32B', '#4E9DE0', '#3FBF8F', '#F0766B', '#FFCE4F']

function confettoStyle(n: number) {
  return {
    background: palette[n % palette.length],
    left: `${(n / 12) * 100}%`,
    animationDelay: `${(n % 4) * 0.12}s`
  }
}
</script>

<style scoped>
.glimmy-wrap {
  position: fixed;
  right: 1.25rem;
  bottom: 1.25rem;
  z-index: 60;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.glimmy-img {
  width: 72px;
  height: 72px;
  cursor: pointer;
  filter: drop-shadow(0 8px 16px rgba(43, 45, 66, 0.2));
  animation: glimmy-idle 3.5s ease-in-out infinite;
  transition: transform 0.2s ease;
}

@media (min-width: 768px) {
  .glimmy-img { width: 92px; height: 92px; }
}

.glimmy-img:hover {
  transform: scale(1.08);
}

/* Umori */
@keyframes glimmy-idle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.mood-happy .glimmy-img {
  animation: glimmy-bounce 0.5s ease-in-out 3;
}

@keyframes glimmy-bounce {
  0%, 100% { transform: translateY(0) scale(1); }
  40% { transform: translateY(-16px) scale(1.06); }
  70% { transform: translateY(0) scale(0.97); }
}

.mood-sad .glimmy-img {
  animation: glimmy-sad 1.6s ease-in-out;
}

@keyframes glimmy-sad {
  0%, 100% { transform: rotate(0deg) translateY(0); }
  30% { transform: rotate(-8deg) translateY(4px); }
  60% { transform: rotate(6deg) translateY(4px); }
}

.mood-celebrate .glimmy-img {
  animation: glimmy-spin 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) 2;
}

@keyframes glimmy-spin {
  0% { transform: rotate(0) scale(1); }
  50% { transform: rotate(180deg) scale(1.15); }
  100% { transform: rotate(360deg) scale(1); }
}

.mood-thinking .glimmy-img {
  animation: glimmy-tilt 1.2s ease-in-out infinite;
}

@keyframes glimmy-tilt {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(10deg); }
}

/* Fumetto */
.bubble {
  max-width: 230px;
  padding: 0.65rem 0.9rem;
  border-radius: 1rem 1rem 0.25rem 1rem;
  position: relative;
}

.bubble-enter-active,
.bubble-leave-active {
  transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.bubble-enter-from,
.bubble-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.9);
}

/* Coriandoli */
.confetti {
  position: absolute;
  inset: -40px -10px auto;
  height: 0;
  pointer-events: none;
}

.confetto {
  position: absolute;
  width: 7px;
  height: 10px;
  border-radius: 2px;
  animation: confetto-fall 1.4s ease-in forwards;
}

@keyframes confetto-fall {
  0% { opacity: 1; transform: translateY(0) rotate(0deg); }
  100% { opacity: 0; transform: translateY(110px) rotate(280deg); }
}
</style>
