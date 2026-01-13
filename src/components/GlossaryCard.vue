<template>
  <div
    class="glossary-card-container perspective-1000"
    @click="toggleFlip"
  >
    <div
      class="glossary-card-inner"
      :class="{ 'is-flipped': isFlipped }"
    >
      <!-- Front -->
      <div class="glossary-card-face glossary-card-front glass-card">
        <div class="flex flex-col items-center justify-center h-full gap-4 p-6">
          <span class="text-6xl">{{ term.emoji }}</span>
          <h3 class="text-xl font-bold text-white text-center">
            {{ term.term }}
          </h3>
          <p class="text-sm text-white/60 text-center">
            {{ $t('glossary.flipCard') }}
          </p>
        </div>
        <div
          v-if="!viewed"
          class="absolute top-2 right-2 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"
        ></div>
      </div>

      <!-- Back -->
      <div class="glossary-card-face glossary-card-back glass-card">
        <div class="flex flex-col h-full p-6 gap-4">
          <div class="flex items-center justify-between">
            <span class="text-4xl">{{ term.emoji }}</span>
            <span
              class="text-xs px-2 py-1 rounded-full bg-white/20 text-white/80"
            >
              {{ $t(`glossary.categories.${term.category}`) }}
            </span>
          </div>

          <h3 class="text-lg font-bold text-white">
            {{ term.term }}
          </h3>

          <p class="text-sm text-white/90 leading-relaxed flex-1">
            {{ term.definition }}
          </p>

          <div v-if="term.example" class="text-xs text-white/70 italic border-l-2 border-white/30 pl-3">
            <span class="font-semibold">{{ $t('glossary.example') }}:</span> {{ term.example }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { GlossaryTerm } from '../data/glossary'

interface Props {
  term: GlossaryTerm
  viewed?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  viewed: [id: string]
}>()

const isFlipped = ref(false)

const toggleFlip = () => {
  isFlipped.value = !isFlipped.value
  if (!props.viewed && isFlipped.value) {
    emit('viewed', props.term.id)
  }
}
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}

.glossary-card-container {
  width: 100%;
  height: 300px;
  cursor: pointer;
}

.glossary-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.glossary-card-inner.is-flipped {
  transform: rotateY(180deg);
}

.glossary-card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 1rem;
}

.glossary-card-front {
  background: rgba(255, 255, 255, 0.15);
}

.glossary-card-back {
  background: rgba(255, 255, 255, 0.2);
  transform: rotateY(180deg);
}

.glossary-card-container:hover .glossary-card-face {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}
</style>
