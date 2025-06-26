<template>
  <div class="relative h-[90vh] flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-blue-100 text-center p-6">
    <!-- Emoji dell'oggetto da indovinare -->
    <div class="text-8xl mb-6">{{ currentItem.emoji }}</div>

    <!-- Domanda -->
    <h2 class="text-3xl font-semibold text-blue-800 mb-8 sm:mt-0 mt-[56px]">
      {{ t('games.guess.question') }}
    </h2>

    <!-- Opzioni -->
    <div class="flex flex-wrap justify-center gap-4 mb-8 w-full max-w-4xl">
      <button
        v-for="option in currentItem.options"
        :key="option"
        @click="checkAnswer(option)"
        :disabled="answered"
        class="w-auto whitespace-nowrap py-4 px-6 bg-white border-2 border-blue-400 text-blue-800 text-xl font-semibold rounded-lg hover:bg-blue-100 transition text-center"
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
    <div v-if="answered" class="flex gap-4 flex-wrap justify-center">
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
        <div class="flex gap-4 flex-wrap justify-center">
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

const allItems: GuessItem[] = [
  { emoji: '🤖', options: ['robot', 'car', 'dice'], answer: 'robot' },
  { emoji: '🚗', options: ['car', 'robot', 'chip'], answer: 'car' },
  { emoji: '🎲', options: ['dice', 'block', 'graph'], answer: 'dice' },
  { emoji: '❤️', options: ['heart', 'brain', 'chip'], answer: 'heart' },
  { emoji: '🧠', options: ['brain', 'ai', 'chip'], answer: 'brain' },
  { emoji: '👁️', options: ['eye', 'camera', 'search'], answer: 'eye' },
  { emoji: '💡', options: ['lamp', 'idea', 'network'], answer: 'lamp' },
  { emoji: '💭', options: ['idea', 'brain', 'chip'], answer: 'idea' },
  { emoji: '🌐', options: ['network', 'saturn', 'chip'], answer: 'network' },
  { emoji: '📡', options: ['radar', 'antenna', 'signal'], answer: 'radar' },
  { emoji: '🪐', options: ['saturn', 'radar', 'chip'], answer: 'saturn' },
  { emoji: '📶', options: ['signal', 'network', 'antenna'], answer: 'signal' },
  { emoji: '🛰️', options: ['antenna', 'signal', 'radar'], answer: 'antenna' },
  { emoji: '🧬', options: ['dna', 'electrons', 'microscope'], answer: 'dna' },
  { emoji: '🪜', options: ['ladder', 'dna', 'graph'], answer: 'ladder' },
  { emoji: '⚛️', options: ['electrons', 'magnet', 'dna'], answer: 'electrons' },
  { emoji: '🎛️', options: ['controlpanel', 'gears', 'tool'], answer: 'controlpanel' },
  { emoji: '📷', options: ['camera', 'eye', 'monitor'], answer: 'camera' },
  { emoji: '⚙️', options: ['gears', 'joystick', 'tool'], answer: 'gears' },
  { emoji: '🎯', options: ['target', 'graph', 'block'], answer: 'target' },
  { emoji: '🔋', options: ['battery', 'magnet', 'tool'], answer: 'battery' },
  { emoji: '🔬', options: ['microscope', 'chip', 'dna'], answer: 'microscope' },
  { emoji: '💿', options: ['disk', 'chip', 'floppy'], answer: 'disk' },
  { emoji: '🕹️', options: ['joystick', 'gears', 'chip'], answer: 'joystick' },
  { emoji: '🔎', options: ['search', 'idea', 'camera'], answer: 'search' },
  { emoji: '💻', options: ['computer', 'robot', 'monitor'], answer: 'computer' },
  { emoji: '🧲', options: ['magnet', 'battery', 'gears'], answer: 'magnet' },
  { emoji: '📈', options: ['graph', 'chart', 'block'], answer: 'graph' },
  { emoji: '🧪', options: ['experiment', 'tool', 'dna'], answer: 'experiment' },
  { emoji: '🛠️', options: ['tool', 'chip', 'joystick'], answer: 'tool' },
  { emoji: '🧱', options: ['block', 'chip', 'gears'], answer: 'block' },
  { emoji: '📊', options: ['chart', 'graph', 'network'], answer: 'chart' },
  { emoji: '🌍', options: ['globe', 'network', 'map'], answer: 'globe' },
  { emoji: '🧭', options: ['compass', 'map', 'graph'], answer: 'compass' },
  { emoji: '🔌', options: ['plug', 'battery', 'chip'], answer: 'plug' },
  { emoji: '🗺️', options: ['map', 'globe', 'compass'], answer: 'map' },
  { emoji: '🧠', options: ['ai', 'brain', 'idea'], answer: 'ai' },
  { emoji: '💾', options: ['floppy', 'disk', 'experiment'], answer: 'floppy' }
]

function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = array.slice().sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

const items = ref<GuessItem[]>(getRandomItems(allItems, 5))
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
  items.value = getRandomItems(allItems, 5)
  currentIndex.value = 0
  score.value = 0
  answered.value = false
  isCorrect.value = false
}
</script>
