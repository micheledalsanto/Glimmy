<template>
  <div class="card flex flex-col items-center gap-2 p-5 text-center card-hover">
    <!-- Icon -->
    <div class="text-3xl">{{ icon }}</div>

    <!-- Value -->
    <div class="font-display text-3xl font-extrabold text-ink">
      {{ animatedValue }}
    </div>

    <!-- Label -->
    <div class="text-sm text-ink-soft leading-tight">
      {{ label }}
    </div>

    <!-- Optional sublabel -->
    <div v-if="sublabel" class="text-xs text-ink-faint">
      {{ sublabel }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

interface Props {
  icon: string
  value: number
  label: string
  sublabel?: string
  animationDuration?: number
}

const props = withDefaults(defineProps<Props>(), {
  animationDuration: 1000
})

const animatedValue = ref(0)

// Animazione count-up del valore
const animateValue = () => {
  const start = animatedValue.value
  const end = props.value
  const duration = props.animationDuration
  const startTime = Date.now()

  const animate = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeOut = 1 - Math.pow(1 - progress, 3)

    animatedValue.value = Math.floor(start + (end - start) * easeOut)

    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      animatedValue.value = end
    }
  }

  requestAnimationFrame(animate)
}

watch(() => props.value, () => {
  animateValue()
})

onMounted(() => {
  animateValue()
})
</script>
