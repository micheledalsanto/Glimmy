<template>
  <div class="animated-background" :class="`theme-${theme}`">
    <div class="gradient-mesh"></div>
    <div v-if="particles" class="particles-container">
      <div v-for="n in particleCount" :key="n" class="particle" :style="getParticleStyle(n)" />
    </div>
    <div class="content-wrapper">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  theme?: 'purple-blue' | 'yellow-pink' | 'green-cyan' | 'rainbow' | 'yellow-blue' | 'indigo-sky' | 'lime-emerald'
  particles?: boolean
  particleCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  theme: 'purple-blue',
  particles: true,
  particleCount: 15
})

const getParticleStyle = (n: number) => {
  const size = Math.random() * 20 + 10
  const delay = Math.random() * 5
  const duration = Math.random() * 10 + 15
  const startX = Math.random() * 100
  const startY = Math.random() * 100

  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${startX}%`,
    top: `${startY}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  }
}
</script>

<style scoped>
.animated-background {
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
}

.gradient-mesh {
  position: absolute;
  inset: 0;
  z-index: 0;
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end));
  animation: gradient-shift 15s ease infinite;
  background-size: 200% 200%;
}

/* Theme gradients */
.theme-purple-blue {
  --gradient-start: #c084fc;
  --gradient-mid: #7c3aed;
  --gradient-end: #3b82f6;
}

.theme-yellow-pink {
  --gradient-start: #fde047;
  --gradient-mid: #f472b6;
  --gradient-end: #ec4899;
}

.theme-green-cyan {
  --gradient-start: #34d399;
  --gradient-mid: #06b6d4;
  --gradient-end: #0891b2;
}

.theme-rainbow {
  --gradient-start: #fde047;
  --gradient-mid: #f472b6;
  --gradient-end: #818cf8;
}

.theme-yellow-blue {
  --gradient-start: #fef3c7;
  --gradient-mid: #fed7aa;
  --gradient-end: #bfdbfe;
}

.theme-indigo-sky {
  --gradient-start: #c7d2fe;
  --gradient-mid: #a5b4fc;
  --gradient-end: #e0f2fe;
}

.theme-lime-emerald {
  --gradient-start: #ecfccb;
  --gradient-mid: #d9f99d;
  --gradient-end: #d1fae5;
}

@keyframes gradient-shift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.particles-container {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.particle {
  position: absolute;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.6), transparent);
  border-radius: 50%;
  animation: float-particle linear infinite;
  opacity: 0.4;
}

@keyframes float-particle {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-100vh) rotate(360deg);
    opacity: 0;
  }
}

.content-wrapper {
  position: relative;
  z-index: 10;
  width: 100%;
  min-height: 100vh;
}
</style>
