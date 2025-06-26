<template>
  <main
    class="min-h-[90vh] bg-gradient-to-br from-yellow-100 to-blue-100 text-center flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden"
  >
    <!-- Stelline animate -->
    <div v-for="n in 20" :key="n" class="star" :style="randomStyle(n)" />

    <h2 class="text-4xl font-semibold text-blue-700 mb-10 sm:mt-0 mt-[56px]">
  {{ t('menu.title') }}
</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl z-10">
      <!-- Giochi attivi -->
      <RouterLink to="/games" class="w-full">
        <ActivityCard icon="🎮" :label="t('menu.games')" />
      </RouterLink>

      <!-- Glossario disabilitato -->
      <div
        class="w-full opacity-50 cursor-not-allowed relative"
        aria-disabled="true"
        title="In arrivo!"
      >
        <ActivityCard icon="📖" :label="t('menu.glossary')" />
      </div>

      <!-- Storie disabilitato -->
      <div
        class="w-full opacity-50 cursor-not-allowed relative"
        aria-disabled="true"
        title="In arrivo!"
      >
        <ActivityCard icon="🎧" :label="t('menu.stories')" />
      </div>

      <!-- Premi disabilitato -->
      <div
        class="w-full opacity-50 cursor-not-allowed relative"
        aria-disabled="true"
        title="In arrivo!"
      >
        <ActivityCard icon="🏆" :label="t('menu.rewards')" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import ActivityCard from '../components/ActivityCard.vue'

const { t } = useI18n()

function randomStyle(index: number) {
  const top = Math.random() * 90
  const left = Math.random() * 100
  const delay = Math.random() * 3
  const size = 3 + Math.random() * 4
  return {
    top: `${top}%`,
    left: `${left}%`,
    animationDelay: `${delay}s`,
    width: `${size}px`,
    height: `${size}px`
  }
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
  0%, 100% {
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.5);
  }
}
</style>
