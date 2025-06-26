<template>
  <div class="relative h-[90vh] flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-blue-100 text-center p-6">
    <!-- Emoji dell'oggetto da indovinare -->
    <div class="text-8xl mb-6">{{ currentItem.emoji }}</div>

    <!-- Domanda -->
   <h2 class="text-3xl font-semibold text-blue-800 mb-8 sm:mt-0 mt-[56px]">
  {{ t('games.guess.question') }}
</h2>

    <!-- Opzioni -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 w-full max-w-md">
      <button
        v-for="option in currentItem.options"
        :key="option"
        @click="checkAnswer(option)"
        class="py-4 px-6 bg-white border-2 border-blue-400 text-blue-800 text-xl font-semibold rounded-lg hover:bg-blue-100 transition"
        :disabled="answered"
      >
        {{ t(`games.guess.items.${option}`) }}
      </button>
    </div>

    <!-- Feedback -->
    <div v-if="answered" class="text-xl font-bold mb-6">
      <span v-if="isCorrect" class="text-green-600">{{ t('games.guess.correct') }}</span>
      <span v-else class="text-red-600">
        {{ t('games.guess.wrong') }} {{ t(`games.guess.items.${currentItem.answer}`) }}
      </span>
    </div>

    <!-- Navigazione -->
    <div v-if="answered" class="flex gap-4">
      <button
        v-if="currentIndex < items.length - 1"
        @click="next"
        class="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 rounded-full text-black text-lg font-semibold shadow transition"
      >
        {{ t('games.guess.next') }}
      </button>
      <div v-else class="flex flex-col items-center">
        <p class="text-2xl font-bold text-blue-700 mb-4">
          {{ t('games.guess.congrats') }}
        </p>
        <p class="text-lg text-gray-800 mb-4">
          {{ t('games.guess.score', { score }) }}
        </p>
        <div class="flex gap-4">
          <button
            @click="restart"
            class="px-6 py-3 bg-green-400 hover:bg-green-300 rounded-full text-black font-semibold shadow"
          >
            {{ t('games.guess.playAgain') }}
          </button>
          <RouterLink to="/menu">
            <button
              class="px-6 py-3 bg-blue-400 hover:bg-blue-300 rounded-full text-white font-semibold shadow"
            >
              {{ t('games.guess.backMenu') }}
            </button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

const { t } = useI18n()

interface GuessItem {
  emoji: string
  options: string[]
  answer: string
}

const items = ref<GuessItem[]>([
  { emoji: '🤖', options: ['robot', 'car', 'dice'], answer: 'robot' },
  { emoji: '🧠', options: ['heart', 'brain', 'eye'], answer: 'brain' },
  { emoji: '💡', options: ['lamp', 'idea', 'network'], answer: 'idea' },
  { emoji: '📡', options: ['radar', 'saturn', 'antenna'], answer: 'antenna' },
  { emoji: '🧬', options: ['dna', 'ladder', 'electrons'], answer: 'dna' }
])

const currentIndex = ref(0)
const score = ref(0)
const answered = ref(false)
const isCorrect = ref(false)

const currentItem = computed(() => items.value[currentIndex.value])

function checkAnswer(selected: string) {
  answered.value = true
  isCorrect.value = selected === currentItem.value.answer
  if (isCorrect.value) score.value++
}

function next() {
  currentIndex.value++
  answered.value = false
  isCorrect.value = false
}

function restart() {
  currentIndex.value = 0
  score.value = 0
  answered.value = false
  isCorrect.value = false
}
</script>
