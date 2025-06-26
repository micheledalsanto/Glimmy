<template>
  <main class="min-h-[90vh] overflow-y-auto bg-gradient-to-br from-yellow-100 to-blue-100 p-6 sm:p-8 text-center flex flex-col items-center justify-start">
    <h2 class="text-4xl font-semibold text-blue-700 mb-10 sm:mt-0 mt-[56px]">
      {{ t('games.select') }}
    </h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 w-full max-w-4xl">
      <!-- MEMORY -->
      <RouterLink
        to="/games/memory"
        class="bg-white shadow-md rounded-xl hover:scale-105 transition text-2xl flex items-center justify-center text-center h-44 sm:h-64"
      >
        <div class="flex flex-col items-center gap-2">
          <span class="text-4xl sm:text-5xl">🧠</span>
          <span>{{ t('games.memory.title') }}</span>
        </div>
      </RouterLink>

      <!-- GUESS -->
      <RouterLink
        to="/games/guess"
        class="bg-white shadow-md rounded-xl hover:scale-105 transition text-2xl flex items-center justify-center text-center h-44 sm:h-64"
      >
        <div class="flex flex-col items-center gap-2">
          <span class="text-4xl sm:text-5xl">🎯</span>
          <span>{{ t('games.guess.question') }}</span>
        </div>
      </RouterLink>

      <!-- COMPLETE PHRASE -->
      <RouterLink
        to="/games/complete-phrase"
        class="bg-white shadow-md rounded-xl hover:scale-105 transition text-2xl flex items-center justify-center text-center h-44 sm:h-64"
      >
        <div class="flex flex-col items-center gap-2">
          <span class="text-4xl sm:text-5xl">📖</span>
          <span>{{ t('games.completePhrase.title') }}</span>
        </div>
      </RouterLink>

      <!-- COMING SOON -->
      <div class="bg-gray-100 text-gray-400 shadow-inner rounded-xl text-2xl flex items-center justify-center text-center h-44 sm:h-64">
        <div class="flex flex-col items-center gap-2">
          <span class="text-4xl sm:text-5xl">💬</span>
          <span>{{ t('games.tryPrompt.title') }}</span>
          <small class="text-sm">{{ t('games.comingSoon') }}</small>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
