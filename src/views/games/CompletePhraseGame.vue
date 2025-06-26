<template>
  <main class="min-h-[90vh] bg-yellow-100 p-6 flex flex-col items-center justify-center text-center">
    <div class="max-w-2xl w-full">
      <h1 class="text-3xl font-bold text-yellow-900 mb-6">
        {{ t('games.completePhrase.title') }}
      </h1>

      <div v-if="currentPhrase" class="bg-white p-6 rounded-lg shadow-lg">
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
            :class="{
              'bg-green-300 border-green-500 text-green-900': answered && option === currentPhrase.answer,
              'bg-red-300 border-red-500 text-red-900': answered && option === selected && option !== currentPhrase.answer,
              'bg-white border-yellow-400 text-yellow-800': !answered
            }"
          >
            {{ option }}
          </button>
        </div>

        <button
          v-if="answered && currentIndex < currentSet.length - 1"
          @click="nextPhrase"
          class="mt-4 px-6 py-2 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold rounded-full transition-all duration-200"
        >
          {{ t('common.next') }}
        </button>

        <p v-else-if="answered && currentIndex === currentSet.length - 1" class="mt-4 text-green-700 font-semibold">
          🎉 {{ t('common.completed') }}
        </p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue"
import { useI18n } from "vue-i18n"
import { completePhraseSets, type Phrase } from "../../data/completePhrases"

const { t, locale } = useI18n()

const currentSet = ref<Phrase[]>([])
const currentIndex = ref(0)
const selected = ref<string | null>(null)
const answered = ref(false)

const currentPhrase = computed(() => currentSet.value[currentIndex.value])

const checkAnswer = (option: string) => {
  if (!answered.value) {
    selected.value = option
    answered.value = true
  }
}

const nextPhrase = () => {
  if (currentIndex.value < currentSet.value.length - 1) {
    currentIndex.value++
    selected.value = null
    answered.value = false
  }
}

// funzione centrale per caricare le frasi nella lingua attuale
const setupPhrases = () => {
  const rawLang = locale.value
  const shortLang = rawLang.split("-")[0] as keyof typeof completePhraseSets
  const sets = completePhraseSets[shortLang] || completePhraseSets.it
  const randomSet = sets[Math.floor(Math.random() * sets.length)]

  currentSet.value = randomSet.phrases
  currentIndex.value = 0
  selected.value = null
  answered.value = false
}

// carica all'avvio
onMounted(() => {
  setupPhrases()
})

// cambia in tempo reale se cambia lingua
watch(() => locale.value, () => {
  setupPhrases()
})
</script>
