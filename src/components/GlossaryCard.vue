<template>
  <div class="glossary-card-container" @click="toggleFlip">
    <div class="glossary-card-inner" :class="{ 'is-flipped': isFlipped }">
      <!-- Front -->
      <div class="glossary-card-face card">
        <div class="flex flex-col items-center justify-center h-full gap-4 p-6">
          <span class="text-6xl">{{ term.emoji }}</span>
          <h3 class="font-display text-xl font-bold text-ink text-center">
            {{ term.term }}
          </h3>
          <p class="text-sm text-ink-faint text-center">
            {{ $t('glossary.flipCard') }}
          </p>
        </div>
        <span
          v-if="!viewed"
          class="absolute top-3 right-3 w-3 h-3 bg-sun-400 rounded-full animate-pulse"
          aria-hidden="true"
        />
      </div>

      <!-- Back -->
      <div class="glossary-card-face glossary-card-back card">
        <div class="flex flex-col h-full p-6 gap-3">
          <div class="flex items-center justify-between">
            <span class="text-4xl">{{ term.emoji }}</span>
            <span class="chip bg-sky2-50 text-sky2-600 text-xs">
              {{ $t(`glossary.categories.${term.category}`) }}
            </span>
          </div>

          <h3 class="font-display text-lg font-bold text-ink">
            {{ term.term }}
          </h3>

          <p class="text-sm text-ink-soft leading-relaxed flex-1">
            {{ term.definition }}
          </p>

          <div v-if="term.example" class="text-xs text-ink-soft italic border-l-2 border-sun-300 pl-3">
            <span class="font-semibold not-italic">{{ $t('glossary.example') }}:</span> {{ term.example }}
          </div>

          <button
            v-if="ttsSupported"
            class="tts-btn self-end"
            :aria-label="$t('common.readAloud')"
            @click.stop="readAloud"
          >
            <AppIcon name="speaker" :size="16" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from './AppIcon.vue'
import { useSpeech } from '../composables/useSpeech'
import type { GlossaryTerm } from '../data/glossary'

interface Props {
  term: GlossaryTerm
  viewed?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  viewed: [id: string]
}>()

const { locale } = useI18n()
const { speak, supported: ttsSupported } = useSpeech()

const isFlipped = ref(false)

const toggleFlip = () => {
  isFlipped.value = !isFlipped.value
  if (!props.viewed && isFlipped.value) {
    emit('viewed', props.term.id)
  }
}

const readAloud = () => {
  speak(`${props.term.term}. ${props.term.definition}`, locale.value)
}
</script>

<style scoped>
.glossary-card-container {
  width: 100%;
  height: 300px;
  cursor: pointer;
  perspective: 1000px;
}

.glossary-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s cubic-bezier(0.34, 1.1, 0.64, 1);
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
  padding: 0;
}

.glossary-card-back {
  transform: rotateY(180deg);
  background: #fffdf8;
}

.glossary-card-container:hover .glossary-card-face {
  box-shadow: 0 2px 4px rgba(43, 45, 66, 0.05), 0 16px 40px -12px rgba(43, 45, 66, 0.18);
}

.tts-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  background: #eef6fc;
  color: #2a6ba5;
  border: none;
  cursor: pointer;
  transition: transform 0.18s ease, background 0.18s ease;
}

.tts-btn:hover {
  background: #d8ebf8;
  transform: scale(1.1);
}
</style>
