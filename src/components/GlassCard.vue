<template>
  <div
    class="card p-6"
    :class="{ 'card-hover cursor-pointer': clickable || hover3d, 'ring-sun': glow }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
/* Card "carta premium": props mantenute per compatibilità con le viste esistenti */
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
.ring-sun {
  box-shadow:
    0 1px 2px rgba(43, 45, 66, 0.04),
    0 8px 24px -8px rgba(43, 45, 66, 0.12),
    0 0 0 2px rgba(247, 179, 43, 0.35);
}
</style>
