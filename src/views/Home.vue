<template>
  <AnimatedBackground :particle-count="14">
    <div class="min-h-[88vh] flex flex-col items-center justify-center px-6 text-center">
      <div class="stagger flex flex-col items-center">
        <!-- Mascotte -->
        <div class="relative mb-8">
          <div class="halo" aria-hidden="true" />
          <img
            :src="glimmy"
            alt="Glimmy"
            class="relative w-44 h-44 sm:w-52 sm:h-52 animate-float drop-shadow-xl"
          />
        </div>

        <!-- Titolo -->
        <h1 class="font-display text-5xl sm:text-6xl font-extrabold text-ink tracking-tight max-w-2xl">
          {{ t('home.title') }}
        </h1>

        <!-- Sottotitolo -->
        <p class="mt-5 text-lg sm:text-xl text-ink-soft max-w-md leading-relaxed">
          {{ t('home.subtitle') }}
        </p>

        <!-- CTA -->
        <RouterLink to="/menu" class="mt-10">
          <GlassButton size="xl" variant="primary" @click="playClick">
            {{ t('home.start') }}
          </GlassButton>
        </RouterLink>

        <!-- Riga di fiducia per i genitori -->
        <p class="mt-8 text-sm text-ink-faint">
          {{ t('home.tagline') }}
        </p>
      </div>
    </div>
  </AnimatedBackground>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import AnimatedBackground from '../components/AnimatedBackground.vue'
import GlassButton from '../components/GlassButton.vue'
import { useSound } from '../composables/useSound'

const { t } = useI18n()
const { playClick } = useSound()
const glimmy = new URL('../assets/images/glimmy.png', import.meta.url).href
</script>

<style scoped>
/* Alone solare dietro la mascotte */
.halo {
  position: absolute;
  inset: -2.5rem;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(247, 179, 43, 0.28), transparent 65%);
  animation: halo-pulse 4s ease-in-out infinite;
}

@keyframes halo-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.12); opacity: 0.75; }
}
</style>
