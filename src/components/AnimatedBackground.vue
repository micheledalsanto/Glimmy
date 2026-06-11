<template>
  <div class="ambient-bg min-h-screen w-full">
    <div v-if="particles" class="sparkles" aria-hidden="true">
      <span
        v-for="n in particleCount"
        :key="n"
        class="sparkle"
        :style="sparkleStyle()"
      />
    </div>
    <div class="relative z-10 min-h-screen w-full">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  /* `theme` è mantenuta per compatibilità: lo sfondo è ora unico e arioso */
  theme?: string
  particles?: boolean
  particleCount?: number
}

withDefaults(defineProps<Props>(), {
  theme: 'default',
  particles: true,
  particleCount: 10
})

const sparkleStyle = () => {
  const size = Math.random() * 5 + 3
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 4}s`,
    animationDuration: `${Math.random() * 2 + 2}s`
  }
}
</script>

<style scoped>
.sparkles {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
</style>
