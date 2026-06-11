<template>
  <div class="card card-hover activity-card" :class="`tint-${variant}`">
    <div class="icon-pill">
      <AppIcon :name="icon" :size="30" />
    </div>
    <h3 class="font-display text-2xl font-bold text-ink">{{ label }}</h3>
    <p v-if="description" class="text-sm text-ink-soft leading-snug">{{ description }}</p>
    <span class="go-hint" aria-hidden="true">→</span>
  </div>
</template>

<script setup lang="ts">
import AppIcon, { type IconName } from './AppIcon.vue'

interface Props {
  icon: IconName
  label: string
  description?: string
  variant?: 'sun' | 'sky' | 'mint' | 'coral'
}

withDefaults(defineProps<Props>(), {
  variant: 'sun',
  description: undefined
})
</script>

<style scoped>
.activity-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1.75rem;
  height: 100%;
  overflow: hidden;
}

/* Alone tinto nell'angolo per distinguere le attività senza perdere arietà */
.activity-card::before {
  content: '';
  position: absolute;
  top: -3rem;
  right: -3rem;
  width: 9rem;
  height: 9rem;
  border-radius: 50%;
  opacity: 0.16;
  transition: transform 0.35s ease, opacity 0.35s ease;
}

.activity-card:hover::before {
  transform: scale(1.35);
  opacity: 0.24;
}

.icon-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 1.1rem;
}

.tint-sun::before { background: #f7b32b; }
.tint-sun .icon-pill { background: #fff8e6; color: #c4830a; }

.tint-sky::before { background: #4e9de0; }
.tint-sky .icon-pill { background: #eef6fc; color: #2a6ba5; }

.tint-mint::before { background: #3fbf8f; }
.tint-mint .icon-pill { background: #eaf8f2; color: #23855f; }

.tint-coral::before { background: #f0766b; }
.tint-coral .icon-pill { background: #fdefed; color: #c03e33; }

.go-hint {
  position: absolute;
  top: 1.25rem;
  right: 1.5rem;
  font-size: 1.25rem;
  color: #a0a3bd;
  transition: transform 0.25s ease, color 0.25s ease;
}

.activity-card:hover .go-hint {
  transform: translateX(4px);
  color: #2b2d42;
}
</style>
