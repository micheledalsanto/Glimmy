<template>
  <div
    class="badge-card-container"
    :class="{ 'locked': !unlocked }"
  >
    <GlassCard
      :hover3d="unlocked"
      :clickable="unlocked"
      :depth="unlocked ? 'medium' : 'shallow'"
      @click="unlocked && $emit('click')"
    >
      <div class="badge-content p-6 flex flex-col items-center gap-4">
        <!-- Badge Emoji -->
        <div
          class="badge-emoji relative"
          :class="{ 'grayscale opacity-40': !unlocked }"
        >
          <span class="text-6xl">{{ badge.emoji }}</span>

          <!-- Rarity glow -->
          <div
            v-if="unlocked"
            class="absolute inset-0 -z-10 blur-2xl opacity-60"
            :class="rarityGlowClass"
          ></div>

          <!-- Lock icon for locked badges -->
          <div v-if="!unlocked" class="absolute inset-0 flex items-center justify-center">
            <span class="text-3xl">🔒</span>
          </div>
        </div>

        <!-- Badge Name -->
        <h3
          class="text-lg font-bold text-center"
          :class="unlocked ? 'text-white' : 'text-white/50'"
        >
          {{ badge.name }}
        </h3>

        <!-- Badge Description -->
        <p
          class="text-sm text-center min-h-[3rem]"
          :class="unlocked ? 'text-white/80' : 'text-white/40'"
        >
          {{ badge.description }}
        </p>

        <!-- Rarity Badge -->
        <div
          class="rarity-badge px-4 py-1 rounded-full text-xs font-semibold"
          :class="rarityClass"
        >
          {{ $t(`rewards.badges.${badge.rarity}`) }}
        </div>

        <!-- Progress Bar (if in progress) -->
        <div v-if="!unlocked && progress !== undefined && progress > 0" class="w-full">
          <div class="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-2">
            <div
              class="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
              :style="{ width: Math.min(progress, 100) + '%' }"
            ></div>
          </div>
          <p class="text-xs text-white/60 text-center">
            {{ $t('rewards.progress', { current: progressCurrent, total: progressTotal }) }}
          </p>
        </div>

        <!-- Unlocked Date (if unlocked) -->
        <div v-if="unlocked && unlockedDate" class="text-xs text-white/60">
          {{ $t('rewards.unlockedOn', { date: formatDate(unlockedDate) }) }}
        </div>

        <!-- How to Unlock (if locked and no progress) -->
        <div v-if="!unlocked && (!progress || progress === 0)" class="text-xs text-white/50 text-center italic">
          {{ $t('rewards.howToUnlock') }}
        </div>
      </div>

      <!-- Shimmer effect for legendary badges -->
      <div
        v-if="unlocked && badge.rarity === 'legendary'"
        class="shimmer-overlay absolute inset-0 pointer-events-none"
      ></div>
    </GlassCard>

    <!-- Status indicator -->
    <div
      v-if="unlocked"
      class="status-indicator absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
      :class="rarityBgClass"
    >
      <span class="text-lg">✓</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import GlassCard from './GlassCard.vue'
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

// Rarity styling
const rarityClass = computed(() => {
  const classes: Record<string, string> = {
    common: 'bg-gray-500/30 text-gray-200 border border-gray-400/50',
    rare: 'bg-blue-500/30 text-blue-200 border border-blue-400/50',
    epic: 'bg-purple-500/30 text-purple-200 border border-purple-400/50',
    legendary: 'bg-yellow-500/30 text-yellow-200 border border-yellow-400/50'
  }
  return classes[props.badge.rarity] || classes.common
})

const rarityGlowClass = computed(() => {
  const classes: Record<string, string> = {
    common: 'bg-gray-400',
    rare: 'bg-blue-500',
    epic: 'bg-purple-500',
    legendary: 'bg-yellow-400'
  }
  return classes[props.badge.rarity] || classes.common
})

const rarityBgClass = computed(() => {
  const classes: Record<string, string> = {
    common: 'bg-gradient-to-br from-gray-400 to-gray-600',
    rare: 'bg-gradient-to-br from-blue-400 to-blue-600',
    epic: 'bg-gradient-to-br from-purple-400 to-purple-600',
    legendary: 'bg-gradient-to-br from-yellow-400 to-yellow-600'
  }
  return classes[props.badge.rarity] || classes.common
})

// Date formatting
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  } catch {
    return dateString
  }
}
</script>

<style scoped>
.badge-card-container {
  position: relative;
  width: 100%;
  min-height: 320px;
}

.badge-emoji {
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;
}

.badge-card-container:not(.locked):hover .badge-emoji {
  transform: scale(1.1) rotate(5deg);
  animation: bounce 0.6s ease;
}

.grayscale {
  filter: grayscale(100%);
}

@keyframes bounce {
  0%, 100% {
    transform: scale(1.1) translateY(0) rotate(5deg);
  }
  50% {
    transform: scale(1.15) translateY(-10px) rotate(5deg);
  }
}

.shimmer-overlay {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.2) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: shimmer 3s linear infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.status-indicator {
  animation: pop 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes pop {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
