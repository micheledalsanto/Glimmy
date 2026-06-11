<template>
  <div class="badge-card-container" :class="{ locked: !unlocked }">
    <div
      class="card h-full flex flex-col items-center gap-3 p-6 text-center"
      :class="{ 'card-hover cursor-pointer': true, [`rarity-${badge.rarity}`]: unlocked }"
      @click="$emit('click')"
    >
      <!-- Badge Emoji -->
      <div class="relative">
        <span class="text-6xl inline-block" :class="{ 'grayscale opacity-30': !unlocked }">
          {{ badge.emoji }}
        </span>
        <span v-if="!unlocked" class="absolute inset-0 flex items-center justify-center text-2xl">
          🔒
        </span>
      </div>

      <!-- Badge Name -->
      <h3 class="font-display text-lg font-bold leading-tight" :class="unlocked ? 'text-ink' : 'text-ink-faint'">
        {{ badge.name }}
      </h3>

      <!-- Badge Description -->
      <p class="text-sm flex-1" :class="unlocked ? 'text-ink-soft' : 'text-ink-faint'">
        {{ badge.description }}
      </p>

      <!-- Rarity Badge -->
      <span class="chip text-xs" :class="rarityChipClass">
        {{ $t(`rewards.badges.${badge.rarity}`) }}
      </span>

      <!-- Progress Bar (if in progress) -->
      <div v-if="!unlocked && progress !== undefined && progress > 0" class="w-full">
        <div class="w-full h-2 bg-ink/5 rounded-full overflow-hidden mb-1.5">
          <div
            class="h-full bg-sky2-400 rounded-full transition-all duration-500"
            :style="{ width: Math.min(progress, 100) + '%' }"
          />
        </div>
        <p class="text-xs text-ink-faint">
          {{ $t('rewards.progress', { current: progressCurrent, total: progressTotal }) }}
        </p>
      </div>
    </div>

    <!-- Status indicator -->
    <div
      v-if="unlocked"
      class="status-indicator absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md text-white"
      :class="rarityBgClass"
    >
      <AppIcon name="check" :size="16" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'
import type { Badge } from '../data/rewards'

interface Props {
  badge: Badge
  unlocked?: boolean
  progress?: number
  progressCurrent?: number
  progressTotal?: number
  unlockedDate?: string
}

const props = withDefaults(defineProps<Props>(), {
  unlocked: false,
  progress: 0
})

defineEmits<{
  click: []
}>()

const rarityChipClass = computed(() => {
  const classes: Record<string, string> = {
    common: 'bg-ink/5 text-ink-soft',
    rare: 'bg-sky2-50 text-sky2-600',
    epic: 'bg-coral-50 text-coral-600',
    legendary: 'bg-sun-50 text-sun-600'
  }
  return classes[props.badge.rarity] || classes.common
})

const rarityBgClass = computed(() => {
  const classes: Record<string, string> = {
    common: 'bg-ink-soft',
    rare: 'bg-sky2-400',
    epic: 'bg-coral-400',
    legendary: 'bg-sun-400'
  }
  return classes[props.badge.rarity] || classes.common
})
</script>

<style scoped>
.badge-card-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.grayscale {
  filter: grayscale(100%);
}

/* Bordo tinto per i badge sbloccati in base alla rarità */
.rarity-rare { border-color: rgba(78, 157, 224, 0.35); }
.rarity-epic { border-color: rgba(240, 118, 107, 0.35); }
.rarity-legendary {
  border-color: rgba(247, 179, 43, 0.5);
  background: linear-gradient(160deg, #fffdf8, #fff8e6);
}

.badge-card-container:not(.locked):hover .text-6xl {
  animation: badge-bounce 0.6s ease;
}

@keyframes badge-bounce {
  0%, 100% { transform: scale(1) rotate(0); }
  50% { transform: scale(1.15) rotate(6deg) translateY(-6px); }
}

.status-indicator {
  animation: pop 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  z-index: 1;
}

@keyframes pop {
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
</style>
