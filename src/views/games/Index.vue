<template>
  <AnimatedBackground>
    <div class="page max-w-6xl">
      <!-- Header -->
      <div class="text-center mb-12 animate-rise-in">
        <h1 class="page-title">{{ t('games.select') }}</h1>
        <p class="page-subtitle">{{ t('games.description') }}</p>
      </div>

      <!-- Games Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
        <RouterLink
          v-for="game in games"
          :key="game.to"
          :to="game.to"
          class="block"
        >
          <ActivityCard
            :icon="game.icon"
            :label="t(game.titleKey)"
            :description="t(game.descKey)"
            :variant="game.variant"
          />
        </RouterLink>
      </div>
    </div>
  </AnimatedBackground>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AnimatedBackground from '../../components/AnimatedBackground.vue'
import ActivityCard from '../../components/ActivityCard.vue'
import type { IconName } from '../../components/AppIcon.vue'

const { t } = useI18n()

interface GameEntry {
  to: string
  icon: IconName
  titleKey: string
  descKey: string
  variant: 'sun' | 'sky' | 'mint' | 'coral'
}

const games: GameEntry[] = [
  { to: '/games/memory', icon: 'brain', titleKey: 'games.memory.title', descKey: 'games.memoryDesc', variant: 'sky' },
  { to: '/games/guess', icon: 'target', titleKey: 'games.guess.title', descKey: 'games.guessDesc', variant: 'coral' },
  { to: '/games/train-robot', icon: 'robot', titleKey: 'games.trainRobot.title', descKey: 'games.trainRobotDesc', variant: 'sun' },
  { to: '/games/complete-phrase', icon: 'pencil', titleKey: 'games.completePhrase.title', descKey: 'games.completePhraseDesc', variant: 'mint' },
  { to: '/games/quiz', icon: 'sparkle', titleKey: 'games.quiz.title', descKey: 'games.quizDesc', variant: 'sun' },
  { to: '/games/story-fill', icon: 'book', titleKey: 'games.storyFill.title', descKey: 'games.storyFillDesc', variant: 'sky' },
  { to: '/try-prompts', icon: 'chat', titleKey: 'games.tryPrompt.title', descKey: 'games.tryPromptDesc', variant: 'mint' },
]
</script>
