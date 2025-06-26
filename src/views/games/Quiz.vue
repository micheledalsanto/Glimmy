<template>
  <div
    class="relative h-[90vh] bg-gradient-to-br from-blue-100 to-pink-100 p-6 flex flex-col items-center justify-center text-center overflow-hidden"
  >
    <!-- Stelline animate -->
    <div v-for="n in 20" :key="n" class="star" :class="randomStyle()" />

    <!-- Titolo -->
    <h2 class="text-3xl sm:text-4xl font-semibold text-indigo-700 mb-8 z-10">
      {{ t('quiz.title') }}
    </h2>

    <!-- Domanda corrente -->
    <div class="bg-white p-6 rounded-2xl shadow-xl w-full max-w-xl z-10">
      <p class="text-xl font-medium text-gray-800 mb-6">
        {{ currentQuestion.question }}
      </p>

      <div class="flex flex-col gap-4">
        <button
          v-for="(option, i) in currentQuestion.options"
          :key="i"
          :disabled="answered"
          @click="selectAnswer(i)"
          :class="buttonClass(i)"
        >
          {{ option }}
        </button>
      </div>

      <!-- Avanti -->
      <button
        v-if="answered && currentIndex < questions.length - 1"
        @click="nextQuestion"
        class="mt-6 px-6 py-3 bg-sky-500 text-white rounded-full font-semibold shadow-md hover:bg-sky-400 transition"
      >
        {{ t('quiz.next') }}
      </button>

      <!-- Fine quiz -->
      <div v-else-if="answered && currentIndex === questions.length - 1" class="mt-6">
        <p class="text-lg font-medium text-green-700">
          {{ t('quiz.finished', { score }) }}
        </p>
        <button
          @click="restart"
          class="mt-4 px-6 py-3 bg-green-500 text-white rounded-full font-semibold shadow-md hover:bg-green-400 transition"
        >
          {{ t('quiz.restart') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

// 📋 Domande multilingua
const allQuestions = {
  it: [
    {
      question: 'Cos\'è l\'intelligenza artificiale?',
      options: ['Una magia', 'Un robot', 'Una simulazione dell’intelligenza umana'],
      answer: 2
    },
    {
      question: 'Quale oggetto usa spesso l’AI?',
      options: ['Tastiera', 'Dati', 'Cucchiaio'],
      answer: 1
    }
  ],
  en: [
    {
      question: 'What is Artificial Intelligence?',
      options: ['Magic', 'A robot', 'A simulation of human intelligence'],
      answer: 2
    },
    {
      question: 'What does AI often use?',
      options: ['Keyboard', 'Data', 'Spoon'],
      answer: 1
    }
  ],
  es: [
    {
      question: '¿Qué es la inteligencia artificial?',
      options: ['Magia', 'Un robot', 'Una simulación de la inteligencia humana'],
      answer: 2
    },
    {
      question: '¿Qué usa a menudo la IA?',
      options: ['Teclado', 'Datos', 'Cuchara'],
      answer: 1
    }
  ]
}

// 📦 Stato
const questions = computed(() => allQuestions[locale.value as 'it' | 'en' | 'es'])
const currentIndex = ref(0)
const currentQuestion = computed(() => questions.value[currentIndex.value])
const selected = ref<number | null>(null)
const answered = computed(() => selected.value !== null)
const score = ref(Number(localStorage.getItem('quiz_score') || 0))

function selectAnswer(index: number) {
  selected.value = index
  if (index === currentQuestion.value.answer) {
    score.value += 1
    localStorage.setItem('quiz_score', score.value.toString())
  }
}

function nextQuestion() {
  selected.value = null
  currentIndex.value++
}

function restart() {
  score.value = 0
  currentIndex.value = 0
  selected.value = null
  localStorage.removeItem('quiz_score')
}

function buttonClass(index: number) {
  if (!answered.value) return 'bg-yellow-200 px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition'

  if (index === currentQuestion.value.answer) return 'bg-green-300 px-6 py-3 rounded-full font-semibold'
  if (index === selected.value) return 'bg-red-300 px-6 py-3 rounded-full font-semibold'
  return 'bg-gray-200 px-6 py-3 rounded-full font-semibold'
}

// ✨ Stelline animate
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
</style>
