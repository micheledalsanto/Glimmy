<template>
  <div class="card card-hover relative flex flex-col h-full p-6 cursor-pointer" @click="$emit('select')">
    <!-- Cover -->
    <div class="mb-4 flex items-center justify-center">
      <span class="text-7xl animate-float">{{ story.cover }}</span>
    </div>

    <!-- Title -->
    <h3 class="font-display text-xl font-bold text-ink mb-2 text-center">
      {{ story.title }}
    </h3>

    <!-- Description -->
    <p class="text-sm text-ink-soft text-center mb-4 flex-1 leading-relaxed">
      {{ story.description }}
    </p>

    <!-- Info badges -->
    <div class="flex items-center justify-center gap-2 text-xs mb-4">
      <span class="chip bg-cream text-ink-soft">
        ⏱️ {{ $t('stories.readTime', { minutes: story.duration }) }}
      </span>
      <span class="chip bg-cream text-ink-soft">
        👶 {{ story.ageGroup }}
      </span>
    </div>

    <!-- Progress indicator -->
    <div v-if="progress > 0 && !isCompleted" class="mb-4">
      <div class="w-full h-2 bg-ink/5 rounded-full overflow-hidden">
        <div
          class="h-full bg-mint-400 rounded-full transition-all duration-300"
          :style="{ width: progress + '%' }"
        />
      </div>
      <p class="text-xs text-ink-faint text-center mt-1.5">
        {{ Math.round(progress) }}% {{ $t('common.completed') }}
      </p>
    </div>

    <!-- Completed badge -->
    <div
      v-if="isCompleted"
      class="absolute top-4 right-4 w-9 h-9 bg-mint-400 text-white rounded-full flex items-center justify-center shadow-md"
      :title="$t('common.completed')"
    >
      <AppIcon name="check" :size="18" />
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
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'
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
