<template>
  <div
    class="relative h-[90vh] overflow-hidden bg-gradient-to-b from-sky-200 via-indigo-100 to-fuchsia-100 flex flex-col items-center justify-center p-8 text-center"
  >
    <!-- Stelline animate -->
    <div v-for="n in 20" :key="n" class="star" :class="randomStyle()" />

    <!-- Mascotte -->
    <img
      :src="glimmy"
      alt="Glimmy"
      class="w-48 h-48 mb-6 animate-bounce-slow z-10"
    />

    <!-- Titolo -->
    <h1 class="text-5xl font-semibold text-blue-800 leading-snug drop-shadow-md z-10">
      {{ t('home.title') }}
    </h1>

    <!-- Sottotitolo -->
    <p class="mt-4 text-xl text-gray-800 max-w-md z-10">
      {{ t('home.subtitle') }}
    </p>

    <!-- Bottone Start -->
    <RouterLink to="/menu">
      <button
        class="mt-10 px-10 py-5 bg-yellow-400 hover:bg-yellow-300 text-black text-2xl font-semibold rounded-full shadow-xl transition-all duration-200 z-10"
      >
        {{ t('home.start') }}
      </button>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

const { t } = useI18n()
const glimmy = new URL('../assets/images/glimmy.png', import.meta.url).href

// Funzione per generare posizione e animazione random
function randomStyle() {
  const styles = ['bg-red-200', 'bg-yellow-100', 'bg-lime-100']
  return styles[Math.floor(Math.random() * styles.length)]
}

</script>

<style scoped>
/* Stelline animate */
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

/* Animazione bounce lenta per la mascotte */
@keyframes bounce-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
.animate-bounce-slow {
  animation: bounce-slow 2.5s infinite;
}
</style>
