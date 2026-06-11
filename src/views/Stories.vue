<template>
  <AnimatedBackground>
    <div class="page max-w-6xl">
      <!-- Library Mode -->
      <div v-if="!currentStory">
        <!-- Header -->
        <div class="mb-10 text-center animate-rise-in">
          <h1 class="page-title">{{ $t('stories.title') }}</h1>
          <p class="page-subtitle">{{ $t('stories.subtitle') }}</p>
        </div>

        <!-- Stories Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
          <StoryCard
            v-for="story in stories"
            :key="story.id"
            :story="story"
            :progress="getStoryProgress(story.id)"
            @select="openStory(story.id)"
          />
        </div>
      </div>

      <!-- Reader Mode -->
      <div v-else class="max-w-3xl mx-auto">
        <!-- Back Button -->
        <GlassButton variant="ghost" size="sm" @click="closeStory" class="mb-6">
          ← {{ $t('stories.backToLibrary') }}
        </GlassButton>

        <!-- Story Header -->
        <div class="mb-6 text-center">
          <span class="text-6xl mb-3 block animate-float">{{ currentStory.cover }}</span>
          <h2 class="font-display text-3xl font-bold text-ink mb-1">
            {{ currentStory.title }}
          </h2>
          <p class="text-ink-soft">
            {{ $t('stories.page', { current: currentPage + 1, total: currentStory.pages.length }) }}
          </p>
        </div>

        <!-- Story Page -->
        <Transition :name="transitionName" mode="out-in">
          <div :key="currentPage" class="card relative mb-6 p-8 md:p-12 min-h-[380px] flex flex-col items-center justify-center">
            <!-- Narrazione vocale -->
            <button
              v-if="ttsSupported"
              class="tts-btn absolute top-4 right-4"
              :class="{ speaking: isSpeaking }"
              :aria-label="$t('common.readAloud')"
              @click="readPage"
            >
              <AppIcon :name="isSpeaking ? 'speaker-off' : 'speaker'" :size="20" />
            </button>

            <div class="text-8xl mb-8 animate-float">
              {{ currentPageData.image }}
            </div>
            <p class="text-xl sm:text-2xl text-ink leading-relaxed text-center">
              {{ currentPageData.text }}
            </p>
          </div>
        </Transition>

        <!-- Navigation Controls -->
        <div class="flex items-center justify-between gap-3 mb-6">
          <GlassButton @click="prevPage" :disabled="isFirstPage" variant="ghost" size="md">
            ← {{ $t('stories.prevPage') }}
          </GlassButton>

          <span class="font-display font-bold text-ink-soft">
            {{ currentPage + 1 }} / {{ currentStory.pages.length }}
          </span>

          <GlassButton
            @click="nextPage"
            :variant="isLastPage ? 'success' : 'primary'"
            size="md"
          >
            {{ isLastPage ? $t('common.finish') : $t('stories.nextPage') }} →
          </GlassButton>
        </div>

        <!-- Progress Bar -->
        <div>
          <div class="w-full h-2.5 bg-ink/5 rounded-full overflow-hidden">
            <div
              class="h-full bg-sun-400 rounded-full transition-all duration-500"
              :style="{ width: progressPercent + '%' }"
            />
          </div>
          <p class="text-sm text-ink-faint text-center mt-2">
            {{ $t('stories.progress', { percent: Math.round(progressPercent) }) }}
          </p>
        </div>

        <!-- Completion Celebration -->
        <Transition name="fade">
          <div v-if="showCompletionModal" class="fixed inset-0 flex items-center justify-center z-50 p-6">
            <div class="absolute inset-0 bg-ink/30 backdrop-blur-sm" @click="closeCompletionModal" />
            <div class="card relative z-10 max-w-md w-full p-8 text-center animate-pop-in">
              <div class="text-7xl mb-4 animate-wiggle inline-block">🎉</div>
              <h3 class="font-display text-3xl font-bold text-ink mb-2">
                {{ $t('stories.completed') }}
              </h3>
              <p class="text-lg text-ink-soft mb-6">
                {{ $t('common.wellDone') }}
              </p>
              <div class="flex gap-3 justify-center flex-wrap">
                <GlassButton variant="primary" size="md" @click="restartStory">
                  {{ $t('common.playAgain') }}
                </GlassButton>
                <GlassButton variant="ghost" size="md" @click="closeStory">
                  {{ $t('stories.backToLibrary') }}
                </GlassButton>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </AnimatedBackground>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import AnimatedBackground from '../components/AnimatedBackground.vue'
import AppIcon from '../components/AppIcon.vue'
import GlassButton from '../components/GlassButton.vue'
import StoryCard from '../components/StoryCard.vue'
import { storiesData, type StoryPage } from '../data/stories'
import { useProgress } from '../composables/useProgress'
import { useSpeech } from '../composables/useSpeech'
import { useSound } from '../composables/useSound'
import { useGlimmy } from '../composables/useGlimmy'

const { locale, t } = useI18n()
const { recordCollectionItem, recordGameComplete } = useProgress()
const { speak, stop, isSpeaking, supported: ttsSupported } = useSpeech()
const { playFanfare } = useSound()
const { react, say } = useGlimmy()

// Get stories for current locale
const stories = computed(() => storiesData[locale.value] || storiesData.it)

// Current story and page
const currentStoryId = ref<string | null>(null)
const currentPage = ref<number>(0)
const transitionName = ref<string>('slide-left')
const showCompletionModal = ref<boolean>(false)

const currentStory = computed(() =>
  currentStoryId.value ? stories.value.find(s => s.id === currentStoryId.value) : null
)

const currentPageData = computed((): StoryPage => {
  if (!currentStory.value) return { text: '', image: '' }
  return currentStory.value.pages[currentPage.value] || { text: '', image: '' }
})

const isFirstPage = computed(() => currentPage.value === 0)
const isLastPage = computed(() =>
  currentStory.value ? currentPage.value === currentStory.value.pages.length - 1 : false
)

const progressPercent = computed(() => {
  if (!currentStory.value) return 0
  return ((currentPage.value + 1) / currentStory.value.pages.length) * 100
})

// Narrazione vocale della pagina
const readPage = () => {
  if (isSpeaking.value) {
    stop()
  } else {
    speak(currentPageData.value.text, locale.value)
  }
}

// Ferma la narrazione quando si cambia pagina o si esce
watch(currentPage, () => stop())
onUnmounted(() => stop())

// Story progress tracking
interface StoryProgress {
  [storyId: string]: {
    currentPage: number
    completed: boolean
    lastRead: string
  }
}

const storyProgress = ref<StoryProgress>({})
const STORAGE_KEY = 'glimmy-stories-progress'

const getStoryProgress = (storyId: string): number => {
  const progress = storyProgress.value[storyId]
  if (!progress) return 0

  if (progress.completed) return 100

  const story = stories.value.find(s => s.id === storyId)
  if (!story) return 0

  return ((progress.currentPage + 1) / story.pages.length) * 100
}

const openStory = (storyId: string) => {
  currentStoryId.value = storyId

  const progress = storyProgress.value[storyId]
  if (progress && !progress.completed) {
    currentPage.value = progress.currentPage
  } else {
    currentPage.value = 0
  }
}

const closeStory = () => {
  stop()
  saveProgress()
  currentStoryId.value = null
  currentPage.value = 0
  showCompletionModal.value = false
}

const nextPage = () => {
  if (isLastPage.value) {
    completeStory()
  } else {
    transitionName.value = 'slide-left'
    currentPage.value++
    saveProgress()
  }
}

const prevPage = () => {
  if (!isFirstPage.value) {
    transitionName.value = 'slide-right'
    currentPage.value--
    saveProgress()
  }
}

const completeStory = () => {
  if (!currentStoryId.value) return

  storyProgress.value[currentStoryId.value] = {
    currentPage: currentPage.value,
    completed: true,
    lastRead: new Date().toISOString()
  }

  saveProgress()
  showCompletionModal.value = true
  playFanfare()
  react('celebrate', 3000)
  say(t('glimmy.storyDone'), { durationMs: 3500 })

  // Badge "Lettore Appassionato" + statistiche
  recordCollectionItem('stories', currentStoryId.value)
  recordGameComplete('stories')
}

const restartStory = () => {
  currentPage.value = 0
  showCompletionModal.value = false

  if (currentStoryId.value) {
    storyProgress.value[currentStoryId.value].completed = false
    saveProgress()
  }
}

const closeCompletionModal = () => {
  showCompletionModal.value = false
}

// LocalStorage persistence
const loadProgress = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      storyProgress.value = JSON.parse(stored)
    }
  } catch (error) {
    console.error('Failed to load story progress:', error)
  }
}

const saveProgress = () => {
  if (!currentStoryId.value) return

  try {
    storyProgress.value[currentStoryId.value] = {
      currentPage: currentPage.value,
      completed: storyProgress.value[currentStoryId.value]?.completed || false,
      lastRead: new Date().toISOString()
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(storyProgress.value))
  } catch (error) {
    console.error('Failed to save story progress:', error)
  }
}

onMounted(() => {
  loadProgress()
})
</script>

<style scoped>
.tts-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 9999px;
  background: #eef6fc;
  color: #2a6ba5;
  border: none;
  cursor: pointer;
  transition: transform 0.18s ease, background 0.18s ease;
}

.tts-btn:hover {
  background: #d8ebf8;
  transform: scale(1.08);
}

.tts-btn.speaking {
  background: #fff8e6;
  color: #c4830a;
  animation: pulse-speak 1.2s ease-in-out infinite;
}

@keyframes pulse-speak {
  0%, 100% { box-shadow: 0 0 0 0 rgba(247, 179, 43, 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(247, 179, 43, 0); }
}

/* Transizioni pagina */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.slide-left-enter-from { opacity: 0; transform: translateX(40px); }
.slide-left-leave-to { opacity: 0; transform: translateX(-40px); }
.slide-right-enter-from { opacity: 0; transform: translateX(-40px); }
.slide-right-leave-to { opacity: 0; transform: translateX(40px); }

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
