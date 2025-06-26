<template>
  <div class="min-h-screen flex flex-col relative bg-white">
    <!-- Icona Torna Indietro -->
    <RouterLink
      v-if="backPath"
      :to="backPath"
      class="absolute top-4 left-4 z-50 text-3xl hover:scale-110 transition"
      aria-label="Torna indietro"
    >
      ←
    </RouterLink>

    <!-- Mascotte Glimmy (non in home) -->
    <img
      v-if="showGlimmy"
      :src="glimmy"
      alt="Glimmy"
      class="absolute top-4 right-4 w-14 h-14 md:w-20 md:h-20 z-40"
    />

    <!-- Contenuto principale -->
    <main class="flex-1 flex flex-col">
      <RouterView />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Footer from '../components/Footer.vue'

const route = useRoute()
const glimmy = new URL('../assets/images/glimmy.png', import.meta.url).href

// Mostra Glimmy in tutte le pagine tranne Home
const showGlimmy = computed(() => route.name !== 'Home')

// Mappa dei percorsi parent
const backPathMap: Record<string, string> = {
  Menu: '/',
  Games: '/menu',
  Memory: '/games',
  Guess: '/games',
  Quiz: '/games',
  CompletePhrase: '/games',
}

// Se siamo in una pagina figlia, mostriamo il backPath
const backPath = computed(() => {
  const name = route.name?.toString() || ''
  return backPathMap[name] || null
})
</script>

<style scoped>
@media (max-width: 640px) {
  .glimmy-icon {
    width: 48px;
    height: 48px;
  }
}
</style>
