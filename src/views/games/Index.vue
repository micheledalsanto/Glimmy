<template>
  <main class="h-[90vh] bg-gradient-to-br from-yellow-100 to-blue-100 p-8 text-center flex flex-col items-center justify-center">
    <h2 class="text-4xl font-semibold text-blue-700 mb-10 sm:mt-0 mt-[56px]">
  {{ t('games.select') }}
</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl">
      <RouterLink
        to="/games/memory"
        class="bg-white shadow-md p-6 rounded-xl hover:scale-105 transition text-2xl"
      >
        🧠 {{ t('games.memory.title') }}
      </RouterLink>
      <RouterLink
        to="/games/guess"
        class="bg-white shadow-md p-6 rounded-xl hover:scale-105 transition text-2xl"
      >
        🎯 {{ t('games.guess.question') }}
      </RouterLink>
      <div class="bg-gray-100 text-gray-400 shadow-inner p-6 rounded-xl text-2xl">
        📖 {{ t('games.story.title') }}<br />
        <small>{{ t('games.comingSoon') }}</small>
      </div>
    </div>
  </main>
</template>


<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
