<template>
  <AnimatedBackground theme="purple-blue" :particles="true">
    <div class="games-container min-h-[90vh] p-6 sm:p-8 flex flex-col items-center justify-start">
      <!-- Header -->
      <div class="text-center mb-12 mt-16">
        <h1 class="text-5xl sm:text-6xl font-bold text-white mb-4">
          {{ t('games.select') }}
        </h1>
        <p class="text-xl text-white/80">
          {{ t('games.description') }}
        </p>
      </div>

      <!-- Games Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        <!-- Memory Game -->
        <RouterLink to="/games/memory" class="game-card-link">
          <GlassCard :hover3d="true" :clickable="true" depth="medium">
            <div class="game-card p-8 flex flex-col items-center gap-4 h-64">
              <div class="game-icon text-7xl animate-float">🧠</div>
              <h3 class="text-2xl font-bold text-white text-center">
                {{ t('games.memory.title') }}
              </h3>
              <p class="text-sm text-white/70 text-center">
                {{ t('games.memoryDesc') }}
              </p>
            </div>
          </GlassCard>
        </RouterLink>

        <!-- Guess Game -->
        <RouterLink to="/games/guess" class="game-card-link">
          <GlassCard :hover3d="true" :clickable="true" depth="medium">
            <div class="game-card p-8 flex flex-col items-center gap-4 h-64">
              <div class="game-icon text-7xl animate-float" style="animation-delay: 0.2s">🎯</div>
              <h3 class="text-2xl font-bold text-white text-center">
                {{ t('games.guess.title') }}
              </h3>
              <p class="text-sm text-white/70 text-center">
                {{ t('games.guessDesc') }}
              </p>
            </div>
          </GlassCard>
        </RouterLink>

        <!-- Complete Phrase Game -->
        <RouterLink to="/games/complete-phrase" class="game-card-link">
          <GlassCard :hover3d="true" :clickable="true" depth="medium">
            <div class="game-card p-8 flex flex-col items-center gap-4 h-64">
              <div class="game-icon text-7xl animate-float" style="animation-delay: 0.4s">📖</div>
              <h3 class="text-2xl font-bold text-white text-center">
                {{ t('games.completePhrase.title') }}
              </h3>
              <p class="text-sm text-white/70 text-center">
                {{ t('games.completePhraseDesc') }}
              </p>
            </div>
          </GlassCard>
        </RouterLink>

        <!-- Quiz Game -->
        <RouterLink to="/games/quiz" class="game-card-link">
          <GlassCard :hover3d="true" :clickable="true" depth="medium">
            <div class="game-card p-8 flex flex-col items-center gap-4 h-64">
              <div class="game-icon text-7xl animate-float" style="animation-delay: 0.6s">🧠</div>
              <h3 class="text-2xl font-bold text-white text-center">
                {{ t('games.quiz.title') }}
              </h3>
              <p class="text-sm text-white/70 text-center">
                {{ t('games.quizDesc') }}
              </p>
            </div>
          </GlassCard>
        </RouterLink>

        <!-- Story Fill Game -->
        <RouterLink to="/games/story-fill" class="game-card-link">
          <GlassCard :hover3d="true" :clickable="true" depth="medium">
            <div class="game-card p-8 flex flex-col items-center gap-4 h-64">
              <div class="game-icon text-7xl animate-float" style="animation-delay: 0.8s">✨</div>
              <h3 class="text-2xl font-bold text-white text-center">
                {{ t('games.storyFill.title') }}
              </h3>
              <p class="text-sm text-white/70 text-center">
                {{ t('games.storyFillDesc') }}
              </p>
            </div>
          </GlassCard>
        </RouterLink>

        <!-- Try Prompts -->
        <RouterLink to="/try-prompts" class="game-card-link">
          <GlassCard :hover3d="true" :clickable="true" depth="medium">
            <div class="game-card p-8 flex flex-col items-center gap-4 h-64">
              <div class="game-icon text-7xl animate-float" style="animation-delay: 1s">💬</div>
              <h3 class="text-2xl font-bold text-white text-center">
                {{ t('games.tryPrompt.title') }}
              </h3>
              <p class="text-sm text-white/70 text-center">
                {{ t('games.tryPromptDesc') }}
              </p>
            </div>
          </GlassCard>
        </RouterLink>
      </div>
    </div>
  </AnimatedBackground>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AnimatedBackground from '../../components/AnimatedBackground.vue'
import GlassCard from '../../components/GlassCard.vue'

const { t } = useI18n()
</script>

<style scoped>
.games-container {
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

.game-card-link {
  display: block;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.game-card-link:hover {
  transform: translateY(-4px);
}

.game-card-link:active {
  transform: translateY(-2px);
}

.game-icon {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>
