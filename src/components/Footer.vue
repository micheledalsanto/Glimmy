<template>
  <footer class="w-full flex flex-col items-center justify-center gap-3 py-6">
    <!-- Language switcher -->
    <div class="flex gap-3">
      <button
        v-for="lang in langs"
        :key="lang.code"
        @click="switchLang(lang.code)"
        class="lang-btn"
        :class="{ active: locale === lang.code }"
        :aria-label="lang.code"
      >
        <img
          class="w-full h-full object-cover"
          :src="`/flags/${lang.code}.svg`"
          :alt="lang.code"
        />
      </button>
    </div>

    <p class="text-sm text-ink-faint text-center">
      © {{ new Date().getFullYear() }} Glimmy AI
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

<style scoped>
.lang-btn {
  width: 2.5rem;
  height: 1.75rem;
  border-radius: 0.45rem;
  overflow: hidden;
  border: 2px solid rgba(43, 45, 66, 0.1);
  opacity: 0.55;
  transition: all 0.2s ease;
  cursor: pointer;
  padding: 0;
  background: none;
}

.lang-btn:hover {
  opacity: 1;
  transform: translateY(-2px);
}

.lang-btn.active {
  opacity: 1;
  border-color: #f7b32b;
  box-shadow: 0 0 0 3px rgba(247, 179, 43, 0.25);
}
</style>
