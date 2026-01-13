<template>
  <div
    class="glass-card-component"
    :class="[
      `variant-${variant}`,
      `depth-${depth}`,
      { 'card-3d': hover3d, 'animate-glow': glow, clickable: clickable }
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'light' | 'dark' | 'colored'
  depth?: 'shallow' | 'medium' | 'deep'
  hover3d?: boolean
  glow?: boolean
  clickable?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'light',
  depth: 'medium',
  hover3d: false,
  glow: false,
  clickable: false
})
</script>

<style scoped>
.glass-card-component {
  position: relative;
  border-radius: 1.5rem;
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Variants */
.variant-light {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

.variant-dark {
  background: rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(12px) saturate(150%);
  -webkit-backdrop-filter: blur(12px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5);
}

.variant-colored {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.1)
  );
  backdrop-filter: blur(16px) saturate(200%);
  -webkit-backdrop-filter: blur(16px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

/* Depth levels */
.depth-shallow {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.depth-medium {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.depth-deep {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

/* 3D hover effect */
.card-3d {
  transform-style: preserve-3d;
  perspective: 1000px;
}

.card-3d:hover {
  transform: rotateY(3deg) rotateX(3deg) translateZ(8px);
}

/* Clickable state */
.clickable {
  cursor: pointer;
}

.clickable:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.45);
}

.clickable:active {
  transform: translateY(-2px) scale(0.99);
}
</style>
