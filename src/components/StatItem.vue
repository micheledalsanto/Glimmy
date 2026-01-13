<template>
  <div class="stat-item glass-card p-6 flex flex-col items-center gap-4">
    <!-- Icon -->
    <div class="stat-icon text-5xl">
      {{ icon }}
    </div>

    <!-- Value -->
    <div class="stat-value text-4xl font-bold text-white">
      {{ animatedValue }}
    </div>

    <!-- Label -->
    <div class="stat-label text-sm text-white/70 text-center">
      {{ label }}
    </div>

    <!-- Optional sublabel -->
    <div v-if="sublabel" class="stat-sublabel text-xs text-white/50 text-center">
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

// Animate value count-up
const animateValue = () => {
  const start = animatedValue.value
  const end = props.value
  const duration = props.animationDuration
  const startTime = Date.now()

  const animate = () => {
    const currentTime = Date.now()
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // Easing function (ease-out)
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

// Watch for value changes
watch(() => props.value, () => {
  animateValue()
})

// Animate on mount
onMounted(() => {
  animateValue()
})
</script>

<style scoped>
.stat-item {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.stat-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

.stat-icon {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.stat-value {
  background: linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.7) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
