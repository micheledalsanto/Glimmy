<template>
  <button
    class="activity-card glass-card card-3d relative overflow-hidden"
    :class="[
      `variant-${variant}`,
      { 'animate-pulse-soft': glow }
    ]"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <!-- Glow layer -->
    <div
      class="glow-layer absolute inset-0 opacity-0 transition-opacity duration-500"
      :class="{ 'opacity-60': hover }"
    ></div>

    <!-- Content -->
    <div class="relative z-10 flex flex-col items-center justify-center gap-4">
      <span
        class="icon text-7xl sm:text-8xl transition-transform duration-300"
        :class="{ 'scale-110': hover }"
      >
        {{ icon }}
      </span>
      <span class="label text-2xl sm:text-3xl font-semibold text-white drop-shadow-lg">
        {{ label }}
      </span>
    </div>

    <!-- Shimmer effect on hover -->
    <div v-if="hover" class="shimmer-overlay"></div>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  icon: string
  label: string
  variant?: 'primary' | 'secondary' | 'accent' | 'success'
  glow?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  glow: false
})

const hover = ref(false)
</script>

<style scoped>
.activity-card {
  width: 100%;
  height: 16rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.activity-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.activity-card:active {
  transform: translateY(-4px) scale(0.98);
}

.glow-layer {
  background: radial-gradient(circle at center, var(--glow-color) 0%, transparent 70%);
  pointer-events: none;
}

/* Variant colors */
.variant-primary {
  --glow-color: rgba(59, 130, 246, 0.6);
  border-color: rgba(59, 130, 246, 0.3);
}

.variant-secondary {
  --glow-color: rgba(168, 85, 247, 0.6);
  border-color: rgba(168, 85, 247, 0.3);
}

.variant-accent {
  --glow-color: rgba(236, 72, 153, 0.6);
  border-color: rgba(236, 72, 153, 0.3);
}

.variant-success {
  --glow-color: rgba(34, 197, 94, 0.6);
  border-color: rgba(34, 197, 94, 0.3);
}

.shimmer-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  animation: shimmer 2s ease-in-out;
  pointer-events: none;
}

@keyframes shimmer {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
}

@keyframes pulse-soft {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.9;
  }
}

.animate-pulse-soft {
  animation: pulse-soft 2s ease-in-out infinite;
}
</style>
