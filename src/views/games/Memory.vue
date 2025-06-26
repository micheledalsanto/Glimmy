<template>
  <main
    class="relative h-[90vh] bg-gradient-to-br from-indigo-100 to-sky-100 p-6 flex flex-col items-center justify-center"
  >
    <!-- Stelline animate -->
    <div v-for="n in 20" :key="n" class="star" :class="randomStyle()" />

    <h2 class="text-3xl font-semibold text-green-800 mb-6 sm:mt-0 mt-[56px]">
  {{ t('games.memory.title') }}
</h2>

    <!-- Griglia -->
    <div
      class="grid grid-cols-4 gap-4 z-10"
      :class="{ 'pointer-events-none': matched.length === cards.length }"
    >
      <button
        v-for="(card, index) in cards"
        :key="index"
        class="w-20 h-20 sm:w-24 sm:h-24 text-3xl sm:text-4xl bg-white rounded-lg shadow-md flex items-center justify-center font-bold"
        @click="flipCard(index)"
        :disabled="flipped.includes(index) || matched.includes(index)"
      >
        {{ flipped.includes(index) || matched.includes(index) ? card : '❓️' }}
      </button>
    </div>

    <!-- Popup finale -->
    <div
      v-if="matched.length === cards.length"
      class="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-50 p-8 text-center"
    >
      <img
        :src="glimmy"
        alt="Glimmy"
        class="w-32 h-32 mb-4 animate-bounce-slow"
      />
      <h3 class="text-3xl font-bold text-blue-700 mb-2">
        {{ t('games.memory.congrats') }}
      </h3>
      <p class="text-lg mb-6">{{ t('games.memory.completed') }}</p>
      <div class="flex gap-4">
        <button
          class="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 rounded-full text-lg shadow"
          @click="resetGame"
        >
          {{ t('games.memory.playAgain') }}
        </button>
        <RouterLink
          to="/menu"
          class="px-6 py-3 bg-blue-400 hover:bg-blue-300 rounded-full text-lg shadow"
        >
          {{ t('games.memory.backMenu') }}
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

// Traduzioni
const { t } = useI18n()

// Emoji tematiche AI
const baseEmojis = ['🤖', '🧠', '💾', '📡', '⚙️', '🔍', '🛰️', '📱']
const cards = ref(shuffle([...baseEmojis, ...baseEmojis]))

const flipped = ref<number[]>([])
const matched = ref<number[]>([])

function flipCard(index: number) {
  if (flipped.value.length < 2 && !flipped.value.includes(index)) {
    flipped.value.push(index)
    if (flipped.value.length === 2) {
      const [first, second] = flipped.value
      if (cards.value[first] === cards.value[second]) {
        matched.value.push(first, second)
      }
      setTimeout(() => {
        flipped.value = []
      }, 1000)
    }
  }
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
}

const glimmy = new URL('../../assets/images/glimmy.png', import.meta.url).href

function randomStyle() {
  const styles = ['bg-red-200', 'bg-yellow-100', 'bg-lime-100']
  return styles[Math.floor(Math.random() * styles.length)]
}

</script>

<style scoped>
.star {
  position: absolute;
  background-color: white;
  border-radius: 50%;
  opacity: 0.8;
  animation: twinkle 2s infinite ease-in-out;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.5); }
}

@keyframes bounce-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
.animate-bounce-slow {
  animation: bounce-slow 2.5s infinite;
}
</style>
