<template>
  <div class="relative h-[90vh] bg-gradient-to-br from-lime-100 to-emerald-100 p-8 text-center flex flex-col items-center justify-center overflow-hidden">
    
    <!-- Stelline -->
    <div v-for="n in 20" :key="n" class="star" :class="randomStyle()" />

    <!-- Titolo -->
    <h2 class="text-4xl font-semibold text-green-800 mb-10 z-10">
      {{ t('games.title') }}
    </h2>

    <!-- Griglia giochi -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl z-10">
      <!-- Quiz sull'AI -->
      <RouterLink to="/games/quiz">
        <div class="bg-white p-6 rounded-2xl shadow-xl hover:scale-105 transition cursor-pointer">
          <span class="text-5xl">🧠</span>
          <p class="mt-4 text-xl font-medium">{{ t('games.quiz') }}</p>
        </div>
      </RouterLink>

      <!-- Memory AI -->
      <RouterLink to="/games/memory">
        <div class="bg-white p-6 rounded-2xl shadow-xl hover:scale-105 transition cursor-pointer">
          <span class="text-5xl">🧩</span>
          <p class="mt-4 text-xl font-medium">{{ t('games.memory') }}</p>
        </div>
      </RouterLink>

      <!-- Indovina l'oggetto AI -->
      <RouterLink to="/games/guess">
        <div class="bg-white p-6 rounded-2xl shadow-xl hover:scale-105 transition cursor-pointer">
          <span class="text-5xl">🔍</span>
          <p class="mt-4 text-xl font-medium">{{ t('games.guess') }}</p>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

const { t } = useI18n()

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
