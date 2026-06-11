<template>
  <AnimatedBackground>
    <div class="page flex flex-col items-center">
      <div class="text-center mb-8 animate-rise-in">
        <h2 class="page-title text-3xl sm:text-4xl">{{ t('games.memory.title') }}</h2>
        <p class="mt-2 text-ink-soft">{{ t('games.memory.moves', { moves }) }}</p>
      </div>

      <!-- Griglia -->
      <div
        class="grid grid-cols-4 gap-3 sm:gap-4"
        :class="{ 'pointer-events-none': completed }"
      >
        <button
          v-for="(card, index) in cards"
          :key="index"
          class="memory-card"
          :class="{ revealed: isRevealed(index), matched: matched.includes(index) }"
          @click="flipCard(index)"
          :disabled="isRevealed(index)"
        >
          <span class="card-face card-back">
            <AppIcon name="star" :size="26" />
          </span>
          <span class="card-face card-front">{{ card }}</span>
        </button>
      </div>

      <!-- Popup finale -->
      <Transition name="pop">
        <div v-if="completed" class="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 backdrop-blur-sm p-6">
          <div class="card max-w-sm w-full p-8 text-center animate-pop-in">
            <img :src="glimmy" alt="Glimmy" class="w-28 h-28 mx-auto mb-4 animate-float" />
            <h3 class="font-display text-3xl font-bold text-ink mb-2">
              {{ t('games.memory.congrats') }}
            </h3>
            <p class="text-ink-soft mb-6">{{ t('games.memory.completed') }}</p>
            <div class="flex gap-3 justify-center flex-wrap">
              <GlassButton variant="primary" @click="resetGame">
                {{ t('games.memory.playAgain') }}
              </GlassButton>
              <RouterLink to="/games">
                <GlassButton variant="ghost">
                  {{ t('games.memory.backMenu') }}
                </GlassButton>
              </RouterLink>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </AnimatedBackground>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import AnimatedBackground from '../../components/AnimatedBackground.vue'
import AppIcon from '../../components/AppIcon.vue'
import GlassButton from '../../components/GlassButton.vue'
import { useProgress } from '../../composables/useProgress'
import { useSound } from '../../composables/useSound'
import { useGlimmy } from '../../composables/useGlimmy'

const { t } = useI18n()
const { recordGameComplete } = useProgress()
const { playFlip, playCorrect, playFanfare } = useSound()
const { react, say } = useGlimmy()

const glimmy = new URL('../../assets/images/glimmy.png', import.meta.url).href

const baseEmojis = ['🤖', '🧠', '💾', '📡', '⚙️', '🔍', '🛰️', '📱']
const cards = ref(shuffle([...baseEmojis, ...baseEmojis]))

const flipped = ref<number[]>([])
const matched = ref<number[]>([])
const moves = ref(0)
const startTime = ref(Date.now())
const completed = computed(() => matched.value.length === cards.value.length)

function isRevealed(index: number) {
  return flipped.value.includes(index) || matched.value.includes(index)
}

function flipCard(index: number) {
  if (flipped.value.length < 2 && !flipped.value.includes(index)) {
    playFlip()
    flipped.value.push(index)
    if (flipped.value.length === 2) {
      moves.value++
      const [first, second] = flipped.value
      if (cards.value[first] === cards.value[second]) {
        matched.value.push(first, second)
        playCorrect()
        react('happy', 1200)
        if (completed.value) onComplete()
      }
      setTimeout(() => {
        flipped.value = []
      }, 900)
    }
  }
}

function onComplete() {
  const durationSec = Math.round((Date.now() - startTime.value) / 1000)
  playFanfare()
  react('celebrate', 3000)
  say(t('glimmy.gameWin'), { durationMs: 3500 })
  recordGameComplete('memory', { durationSec })
}

function shuffle(array: string[]) {
  const cloned = [...array]
  for (let i = cloned.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[cloned[i], cloned[j]] = [cloned[j], cloned[i]]
  }
  return cloned
}

function resetGame() {
  cards.value = shuffle([...baseEmojis, ...baseEmojis])
  flipped.value = []
  matched.value = []
  moves.value = 0
  startTime.value = Date.now()
}
</script>

<style scoped>
.memory-card {
  position: relative;
  width: 4.25rem;
  height: 4.25rem;
  border-radius: 1rem;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  perspective: 600px;
}

@media (min-width: 640px) {
  .memory-card {
    width: 5.5rem;
    height: 5.5rem;
  }
}

.card-face {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  font-size: 1.75rem;
  backface-visibility: hidden;
  transition: transform 0.45s cubic-bezier(0.34, 1.2, 0.64, 1);
}

@media (min-width: 640px) {
  .card-face { font-size: 2.25rem; }
}

.card-back {
  background: #ffffff;
  color: #f7b32b;
  border: 1px solid rgba(43, 45, 66, 0.06);
  box-shadow: 0 1px 2px rgba(43, 45, 66, 0.04), 0 8px 24px -8px rgba(43, 45, 66, 0.14);
}

.memory-card:hover .card-back {
  box-shadow: 0 2px 4px rgba(43, 45, 66, 0.05), 0 12px 32px -10px rgba(43, 45, 66, 0.2);
}

.card-front {
  background: #fff8e6;
  border: 1.5px solid rgba(247, 179, 43, 0.4);
  transform: rotateY(180deg);
}

.memory-card.revealed .card-back { transform: rotateY(-180deg); }
.memory-card.revealed .card-front { transform: rotateY(0); }

.memory-card.matched .card-front {
  background: #eaf8f2;
  border-color: rgba(63, 191, 143, 0.5);
  animation: match-pulse 0.5s ease;
}

@keyframes match-pulse {
  0%, 100% { transform: rotateY(0) scale(1); }
  50% { transform: rotateY(0) scale(1.1); }
}

.pop-enter-active { transition: opacity 0.3s ease; }
.pop-leave-active { transition: opacity 0.2s ease; }
.pop-enter-from, .pop-leave-to { opacity: 0; }
</style>
