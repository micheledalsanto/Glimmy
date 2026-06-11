<template>
  <button
    class="btn"
    :class="[`variant-${variant}`, `size-${size}`, { disabled: disabled }]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <span v-if="icon" class="text-[1.2em] leading-none">{{ icon }}</span>
    <span class="whitespace-nowrap"><slot /></span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost'
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
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: 'Baloo 2', sans-serif;
  font-weight: 700;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  color: #2b2d42;
  transition: transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.18s ease, background 0.18s ease;
}

.btn:hover:not(.disabled) {
  transform: translateY(-2px);
}

.btn:active:not(.disabled) {
  transform: translateY(1px) scale(0.98);
}

.btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px rgba(247, 179, 43, 0.35);
}

/* Sizes */
.size-sm { padding: 0.45rem 1.1rem; font-size: 0.875rem; }
.size-md { padding: 0.65rem 1.5rem; font-size: 1rem; }
.size-lg { padding: 0.85rem 2rem; font-size: 1.125rem; }
.size-xl { padding: 1.05rem 2.6rem; font-size: 1.3rem; }

/* Variants — colore pieno con "spessore" in basso, stile giocattolo raffinato */
.variant-primary {
  background: #f7b32b;
  box-shadow: 0 3px 0 #c4830a, 0 10px 24px -8px rgba(229, 157, 19, 0.5);
}
.variant-primary:hover:not(.disabled) {
  background: #ffce4f;
  box-shadow: 0 4px 0 #c4830a, 0 14px 28px -8px rgba(229, 157, 19, 0.55);
}

.variant-secondary {
  background: #4e9de0;
  color: #ffffff;
  box-shadow: 0 3px 0 #2a6ba5, 0 10px 24px -8px rgba(55, 132, 199, 0.5);
}
.variant-secondary:hover:not(.disabled) {
  background: #6cb0e8;
  box-shadow: 0 4px 0 #2a6ba5, 0 14px 28px -8px rgba(55, 132, 199, 0.55);
}

.variant-success {
  background: #3fbf8f;
  color: #ffffff;
  box-shadow: 0 3px 0 #23855f, 0 10px 24px -8px rgba(46, 164, 120, 0.5);
}
.variant-success:hover:not(.disabled) {
  background: #5ccda2;
  box-shadow: 0 4px 0 #23855f, 0 14px 28px -8px rgba(46, 164, 120, 0.55);
}

.variant-warning {
  background: #ffe08a;
  box-shadow: 0 3px 0 #e59d13, 0 10px 24px -8px rgba(229, 157, 19, 0.4);
}
.variant-warning:hover:not(.disabled) {
  background: #ffefc2;
}

.variant-danger {
  background: #f0766b;
  color: #ffffff;
  box-shadow: 0 3px 0 #c03e33, 0 10px 24px -8px rgba(222, 88, 76, 0.5);
}
.variant-danger:hover:not(.disabled) {
  background: #f5938a;
}

.variant-ghost {
  background: transparent;
  color: #2b2d42;
  box-shadow: inset 0 0 0 2px rgba(43, 45, 66, 0.15);
}
.variant-ghost:hover:not(.disabled) {
  background: rgba(43, 45, 66, 0.05);
  box-shadow: inset 0 0 0 2px rgba(43, 45, 66, 0.25);
}

/* Disabled */
.disabled {
  opacity: 0.45;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
