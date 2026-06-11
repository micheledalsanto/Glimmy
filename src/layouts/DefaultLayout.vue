<template>
  <div class="min-h-screen flex flex-col relative">
    <!-- Barra superiore flottante -->
    <header class="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 sm:px-6 py-3 pointer-events-none">
      <RouterLink
        v-if="backPath"
        :to="backPath"
        class="round-btn pointer-events-auto"
        :aria-label="t('common.back')"
      >
        <AppIcon name="arrow-left" :size="20" />
      </RouterLink>
      <span v-else />

      <div class="flex items-center gap-2">
        <!-- Indicatore download voce neurale -->
        <Transition name="fade">
          <span v-if="neuralStatus === 'loading'" class="voice-pill pointer-events-auto">
            {{ t('common.voiceLoading', { percent: neuralProgress }) }}
          </span>
        </Transition>

        <button
          class="round-btn pointer-events-auto"
          :class="{ muted: !soundEnabled }"
          :aria-label="t('common.toggleSound')"
          @click="toggleSound"
        >
          <AppIcon :name="soundEnabled ? 'speaker' : 'speaker-off'" :size="20" />
        </button>
      </div>
    </header>

    <!-- Contenuto principale -->
    <main class="flex-1 flex flex-col">
      <RouterView />
    </main>

    <Footer />

    <!-- Mascotte globale (non in home: lì è protagonista) -->
    <GlimmyMascot v-if="showGlimmy" />
    <BadgeUnlockToast />
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Footer from '../components/Footer.vue'
import AppIcon from '../components/AppIcon.vue'
import GlimmyMascot from '../components/GlimmyMascot.vue'
import BadgeUnlockToast from '../components/BadgeUnlockToast.vue'
import { useProgress } from '../composables/useProgress'
import { useSound } from '../composables/useSound'
import { useSpeech } from '../composables/useSpeech'
import { useGlimmy } from '../composables/useGlimmy'

const route = useRoute()
const { t } = useI18n()
const { recordSectionVisit } = useProgress()
const { soundEnabled, toggleSound } = useSound()
const { neuralStatus, neuralProgress } = useSpeech()
const { say } = useGlimmy()

// Quando la voce neurale è pronta, Glimmy lo annuncia
watch(neuralStatus, (status) => {
  if (status === 'ready') {
    say(t('glimmy.voiceReady'), { mood: 'celebrate', durationMs: 4000 })
  }
})

const showGlimmy = computed(() => route.name !== 'Home')

// Mappa dei percorsi parent per il tasto indietro
const backPathMap: Record<string, string> = {
  Menu: '/',
  Games: '/menu',
  Memory: '/games',
  Guess: '/games',
  Quiz: '/games',
  CompletePhrase: '/games',
  StoryFill: '/games',
  TrainRobot: '/games',
  Glossary: '/menu',
  Stories: '/menu',
  Rewards: '/menu',
  TryPrompts: '/games',
}

const backPath = computed(() => {
  const name = route.name?.toString() || ''
  return backPathMap[name] || null
})

// Tracciamento sezioni visitate per il badge "Esploratore AI"
const sectionMap: Record<string, string> = {
  Menu: 'menu',
  Games: 'games',
  Glossary: 'glossary',
  Stories: 'stories',
  Rewards: 'rewards',
  TryPrompts: 'try-prompts',
}

watch(
  () => route.name,
  (name) => {
    const section = sectionMap[name?.toString() || '']
    if (section) recordSectionVisit(section)
  },
  { immediate: true }
)
</script>

<style scoped>
.round-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 9999px;
  background: #ffffff;
  color: #2b2d42;
  border: 1px solid rgba(43, 45, 66, 0.08);
  box-shadow: 0 1px 2px rgba(43, 45, 66, 0.04), 0 8px 24px -8px rgba(43, 45, 66, 0.18);
  cursor: pointer;
  transition: transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.18s ease;
}

.round-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(43, 45, 66, 0.05), 0 12px 32px -10px rgba(43, 45, 66, 0.25);
}

.round-btn:active {
  transform: translateY(0) scale(0.95);
}

.round-btn.muted {
  color: #a0a3bd;
}

.voice-pill {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.9rem;
  border-radius: 9999px;
  background: #ffffff;
  color: #6e7191;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid rgba(43, 45, 66, 0.08);
  box-shadow: 0 1px 2px rgba(43, 45, 66, 0.04), 0 8px 24px -8px rgba(43, 45, 66, 0.18);
  white-space: nowrap;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
