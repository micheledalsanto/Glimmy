<template>
  <div class="absolute top-4 right-4 z-50 flex gap-4">
    <button
      v-for="lang in langs"
      :key="lang.code"
      @click="switchLang(lang.code)"
      class="w-12 h-12 border-2 border-white rounded-full overflow-hidden shadow-lg hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-yellow-400"
    >
      <img
        class="w-full h-full object-cover"
        :src="`/src/assets/flags/${lang.file}`"
        :alt="lang.code"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const langs = [
  { code: 'it', file: 'it.svg' },
  { code: 'en', file: 'en.svg' },
  { code: 'es', file: 'es.svg' }
]

function switchLang(code: string) {
  locale.value = code
  localStorage.setItem('lang', code)
}
</script>
