<template>
  <main class="min-h-screen bg-yellow-100 p-6 flex flex-col items-center justify-center text-center">
    <div class="max-w-2xl w-full">
      <h1 class="text-3xl font-bold text-yellow-900 mb-6">
        {{ t('games.story.title') }}
      </h1>

      <div v-if="gameFinished" class="text-xl font-semibold text-yellow-900">
        <p>{{ t('games.story.score', { score }) }}</p>

        <div class="mt-6 flex flex-col gap-4">
          <button
            @click="resetGame"
            class="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-white font-bold rounded-full shadow"
          >
            {{ t('games.story.playAgain') }}
          </button>
          <RouterLink
            to="/menu"
            class="px-6 py-3 bg-white border border-yellow-500 text-yellow-700 font-bold rounded-full hover:bg-yellow-100"
          >
            {{ t('games.story.backMenu') }}
          </RouterLink>
        </div>
      </div>

      <div v-else-if="currentPhrase" class="bg-white p-6 rounded-lg shadow-lg">
        <p class="text-xl font-semibold mb-4 text-gray-800">
          {{ currentPhrase.text }}
        </p>

        <div class="grid gap-4 mb-4">
          <button
            v-for="(option, index) in currentPhrase.options"
            :key="index"
            :disabled="answered"
            @click="checkAnswer(option)"
            class="px-4 py-2 rounded-full border-2 font-bold transition-all duration-200"
            :class="buttonClass(option)"
          >
            {{ option }}
          </button>
        </div>

        <div v-if="answered" class="mb-4 text-lg font-semibold">
          <p v-if="isCorrect" class="text-green-600">{{ t('games.story.correct') }}</p>
          <p v-else class="text-red-600">{{ t('games.story.wrong') }}</p>
        </div>

        <button
          v-if="answered"
          @click="nextPhrase"
          class="mt-4 px-6 py-2 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold rounded-full shadow transition-all"
        >
          {{ t('games.story.next') }}
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { completePhraseSets } from '../../data/completePhrases'

const { t, locale } = useI18n()

const allPhrases = computed(() => {
  const lang = locale.value
  return completePhraseSets[lang]?.flatMap(set => set.phrases) ?? completePhraseSets['it'].flatMap(set => set.phrases)
})

const shuffled = computed(() => {
  const phrases = allPhrases.value
  return [...phrases].sort(() => Math.random() - 0.5).slice(0, 5)
})

const currentIndex = ref(0)
const score = ref(0)
const answered = ref(false)
const isCorrect = ref(false)

const currentPhrase = computed(() => shuffled.value[currentIndex.value])
const gameFinished = computed(() => currentIndex.value >= shuffled.value.length)

function checkAnswer(option: string) {
  if (!currentPhrase.value) return
  answered.value = true
  isCorrect.value = option === currentPhrase.value.answer
  if (isCorrect.value) score.value++
}

function nextPhrase() {
  currentIndex.value++
  answered.value = false
  isCorrect.value = false
}

function resetGame() {
  currentIndex.value = 0
  score.value = 0
  answered.value = false
  isCorrect.value = false
  shuffled.value = [...allPhrases.value].sort(() => Math.random() - 0.5).slice(0, 5)
}

function buttonClass(option: string) {
  if (!answered.value) {
    return 'bg-white text-gray-800 border-gray-300 hover:bg-yellow-50'
  }
  if (option === currentPhrase.value.answer) {
    return 'bg-green-200 border-green-500 text-green-900'
  }
  return 'bg-red-200 border-red-500 text-red-900'
}
</script>
