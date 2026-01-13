<template>
  <AnimatedBackground theme="rainbow" :particles="true">
    <div class="menu-container min-h-[90vh] flex flex-col items-center justify-center p-6 sm:p-8">
      <!-- Header -->
      <div class="text-center mb-12 mt-16">
        <h1 class="text-5xl sm:text-6xl font-bold text-white mb-4 animate-float">
          {{ t('menu.title') }}
        </h1>
        <div class="glimmy-mascot text-8xl mb-4">
          ✨
        </div>
      </div>

      <!-- Menu Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
        <!-- Games -->
        <RouterLink to="/games" class="menu-item">
          <ActivityCard
            icon="🎮"
            :label="t('menu.games')"
            variant="primary"
            :glow="true"
          />
        </RouterLink>

        <!-- Glossary -->
        <RouterLink to="/glossary" class="menu-item">
          <ActivityCard
            icon="📖"
            :label="t('menu.glossary')"
            variant="secondary"
            :glow="true"
          />
        </RouterLink>

        <!-- Stories -->
        <RouterLink to="/stories" class="menu-item">
          <ActivityCard
            icon="🎧"
            :label="t('menu.stories')"
            variant="accent"
            :glow="true"
          />
        </RouterLink>

        <!-- Rewards -->
        <RouterLink to="/rewards" class="menu-item">
          <ActivityCard
            icon="🏆"
            :label="t('menu.rewards')"
            variant="success"
            :glow="true"
          />
        </RouterLink>
      </div>

      <!-- Footer Hint -->
      <div class="mt-12 text-center">
        <GlassCard depth="shallow" class="inline-block">
          <p class="px-6 py-3 text-white/80 text-sm">
            💡 {{ t('menu.hint') }}
          </p>
        </GlassCard>
      </div>
    </div>
  </AnimatedBackground>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import AnimatedBackground from '../components/AnimatedBackground.vue'
import ActivityCard from '../components/ActivityCard.vue'
import GlassCard from '../components/GlassCard.vue'

const { t } = useI18n()
</script>

<style scoped>
.menu-container {
  animation: fadeIn 0.6s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.glimmy-mascot {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.menu-item {
  display: block;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.menu-item:hover {
  transform: translateY(-4px);
}

.menu-item:active {
  transform: translateY(-2px);
}
</style>
