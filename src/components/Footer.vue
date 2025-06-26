<template>
  <footer
    class="w-full max-h-[20vh] flex flex-col items-center justify-center gap-3 py-4 overflow-hidden"
  >
    <!-- Language switcher -->
    <div class="flex gap-4">
      <button
        v-for="lang in langs"
        :key="lang.code"
        @click="switchLang(lang.code)"
        class="w-10 h-7 border-2 border-white rounded overflow-hidden hover:scale-110 transition"
        :class="{ 'ring-2 ring-blue-400': locale === lang.code }"
      >
        <img
          class="w-full h-full object-cover"
          :src="`/flags/${lang.code}.svg`"
          :alt="lang.code"
        />
      </button>
    </div>

    <p class="text-sm text-gray-500 mt-2 text-center">
      © 2025 Glimmy World
    </p>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const langs = [
  { code: 'it' },
  { code: 'en' },
  { code: 'es' }
]

function switchLang(code: string) {
  locale.value = code
  localStorage.setItem('lang', code)
}
</script>
