<template>
  <GlassCard
    :hover3d="true"
    :clickable="true"
    depth="medium"
    @click="$emit('select')"
  >
    <div class="story-card-content p-6 flex flex-col h-full">
      <!-- Cover -->
      <div class="story-cover mb-4 flex items-center justify-center">
        <span class="text-7xl animate-float">{{ story.cover }}</span>
      </div>

      <!-- Title -->
      <h3 class="text-2xl font-bold text-white mb-2 text-center">
        {{ story.title }}
      </h3>

      <!-- Description -->
      <p class="text-sm text-white/80 text-center mb-4 flex-1">
        {{ story.description }}
      </p>

      <!-- Info badges -->
      <div class="flex items-center justify-between gap-2 text-xs text-white/70 mb-4">
        <div class="flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full">
          <span>⏱️</span>
          <span>{{ $t('stories.readTime', { minutes: story.duration }) }}</span>
        </div>
        <div class="flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full">
          <span>👶</span>
          <span>{{ story.ageGroup }}</span>
        </div>
      </div>

      <!-- Progress indicator -->
      <div v-if="progress > 0" class="mb-4">
        <div class="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300"
            :style="{ width: progress + '%' }"
          ></div>
        </div>
        <p class="text-xs text-white/70 text-center mt-1">
          {{ Math.round(progress) }}% {{ $t('common.completed') }}
        </p>
      </div>

      <!-- Completed badge -->
      <div
        v-if="isCompleted"
        class="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg animate-pulse-soft"
      >
        <span class="text-2xl">✓</span>
      </div>

      <!-- Button -->
      <GlassButton
        :variant="isCompleted ? 'success' : 'primary'"
        size="md"
        class="w-full"
      >
        {{ isCompleted ? $t('stories.readAgain') : (progress > 0 ? $t('stories.continue') : $t('stories.startReading')) }}
      </GlassButton>
    </div>
  </GlassCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import GlassCard from './GlassCard.vue'
import GlassButton from './GlassButton.vue'
import type { Story } from '../data/stories'

interface Props {
  story: Story
  progress?: number
}

const props = withDefaults(defineProps<Props>(), {
  progress: 0
})

defineEmits<{
  select: []
}>()

const isCompleted = computed(() => props.progress >= 100)
</script>

<style scoped>
.story-card-content {
  min-height: 400px;
}

.story-cover {
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

.animate-pulse-soft {
  animation: pulse-soft 2s ease-in-out infinite;
}

@keyframes pulse-soft {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.9;
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>
