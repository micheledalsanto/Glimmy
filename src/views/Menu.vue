<template>
  <AnimatedBackground>
    <div class="page">
      <!-- Header -->
      <div class="text-center mb-12 animate-rise-in">
        <h1 class="page-title">{{ t('menu.title') }}</h1>
        <p class="page-subtitle">{{ t('menu.hint') }}</p>
      </div>

      <!-- Menu Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 stagger">
        <RouterLink to="/games" class="block">
          <ActivityCard
            icon="gamepad"
            :label="t('menu.games')"
            :description="t('menu.gamesDesc')"
            variant="sun"
          />
        </RouterLink>

        <RouterLink to="/glossary" class="block">
          <ActivityCard
            icon="book"
            :label="t('menu.glossary')"
            :description="t('menu.glossaryDesc')"
            variant="sky"
          />
        </RouterLink>

        <RouterLink to="/stories" class="block">
          <ActivityCard
            icon="headphones"
            :label="t('menu.stories')"
            :description="t('menu.storiesDesc')"
            variant="mint"
          />
        </RouterLink>

        <RouterLink to="/rewards" class="block">
          <ActivityCard
            icon="trophy"
            :label="t('menu.rewards')"
            :description="t('menu.rewardsDesc')"
            variant="coral"
          />
        </RouterLink>
      </div>

      <!-- Riepilogo progressi rapido -->
      <div class="mt-10 flex justify-center animate-rise-in" style="animation-delay: 0.5s">
        <div class="card inline-flex items-center gap-6 px-6 py-3.5">
          <div class="flex items-center gap-2 text-sm font-semibold text-ink">
            <AppIcon name="star" :size="18" class="text-sun-400" />
            {{ t('menu.points', { points: progress.totalPoints }) }}
          </div>
          <div class="w-px h-5 bg-ink/10" />
          <div class="flex items-center gap-2 text-sm font-semibold text-ink">
            <AppIcon name="trophy" :size="18" class="text-coral-400" />
            {{ t('menu.badges', { count: progress.unlockedBadges.length }) }}
          </div>
          <div class="w-px h-5 bg-ink/10" />
          <div class="flex items-center gap-2 text-sm font-semibold text-ink">
            <AppIcon name="flame" :size="18" class="text-sky2-400" />
            {{ t('menu.streak', { days: progress.streakDays }) }}
          </div>
        </div>
      </div>
    </div>
  </AnimatedBackground>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import AnimatedBackground from '../components/AnimatedBackground.vue'
import ActivityCard from '../components/ActivityCard.vue'
import AppIcon from '../components/AppIcon.vue'
import { useProgress } from '../composables/useProgress'

const { t } = useI18n()
const { progress } = useProgress()
</script>
