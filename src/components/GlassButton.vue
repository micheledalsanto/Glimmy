<template>
  <button
    class="glass-button-component"
    :class="[
      `variant-${variant}`,
      `size-${size}`,
      { disabled: disabled }
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <span v-if="icon" class="button-icon">{{ icon }}</span>
    <span class="button-label">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  icon?: string
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  icon: undefined,
  disabled: false
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<style scoped>
.glass-button-component {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  border-radius: 0.75rem;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

/* Sizes */
.size-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.size-md {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.size-lg {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

.size-xl {
  padding: 1.25rem 2.5rem;
  font-size: 1.25rem;
}

/* Variants */
.variant-primary {
  background: rgba(59, 130, 246, 0.3);
  color: white;
  border-color: rgba(59, 130, 246, 0.5);
}

.variant-primary:hover:not(.disabled) {
  background: rgba(59, 130, 246, 0.4);
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
}

.variant-secondary {
  background: rgba(168, 85, 247, 0.3);
  color: white;
  border-color: rgba(168, 85, 247, 0.5);
}

.variant-secondary:hover:not(.disabled) {
  background: rgba(168, 85, 247, 0.4);
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 24px rgba(168, 85, 247, 0.4);
}

.variant-success {
  background: rgba(34, 197, 94, 0.3);
  color: white;
  border-color: rgba(34, 197, 94, 0.5);
}

.variant-success:hover:not(.disabled) {
  background: rgba(34, 197, 94, 0.4);
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 24px rgba(34, 197, 94, 0.4);
}

.variant-warning {
  background: rgba(251, 191, 36, 0.3);
  color: white;
  border-color: rgba(251, 191, 36, 0.5);
}

.variant-warning:hover:not(.disabled) {
  background: rgba(251, 191, 36, 0.4);
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 24px rgba(251, 191, 36, 0.4);
}

.variant-danger {
  background: rgba(239, 68, 68, 0.3);
  color: white;
  border-color: rgba(239, 68, 68, 0.5);
}

.variant-danger:hover:not(.disabled) {
  background: rgba(239, 68, 68, 0.4);
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 24px rgba(239, 68, 68, 0.4);
}

/* Active state */
.glass-button-component:active:not(.disabled) {
  transform: translateY(0) scale(0.98);
}

/* Disabled state */
.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Icon */
.button-icon {
  font-size: 1.2em;
  line-height: 1;
}

/* Label */
.button-label {
  white-space: nowrap;
}
</style>
