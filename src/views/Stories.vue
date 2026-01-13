<template>
  <AnimatedBackground theme="yellow-pink" :particles="true">
    <div class="container mx-auto p-6 max-w-7xl">
      <!-- Library Mode -->
      <div v-if="!currentStory" class="story-library">
        <!-- Header -->
        <div class="mb-8 mt-16">
          <h1 class="text-5xl font-bold text-white mb-4">
            {{ $t('stories.title') }}
          </h1>
          <p class="text-xl text-white/80">
            {{ $t('stories.subtitle') }}
          </p>
        </div>

        <!-- Stories Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <div v-else class="story-reader">
        <!-- Back Button -->
        <GlassButton
          variant="secondary"
          size="md"
          icon="←"
          @click="closeStory"
          class="mb-6"
        >
          {{ $t('stories.backToLibrary') }}
        </GlassButton>

        <!-- Story Header -->
        <div class="mb-6 text-center">
          <span class="text-6xl mb-4 block animate-float">{{ currentStory.cover }}</span>
          <h2 class="text-4xl font-bold text-white mb-2">
            {{ currentStory.title }}
          </h2>
          <p class="text-lg text-white/80 mb-4">
            {{ currentStory.description }}
          </p>
          <p class="text-sm text-white/60">
            {{ $t('stories.page', { current: currentPage + 1, total: currentStory.pages.length }) }}
          </p>
        </div>

        <!-- Story Page -->
        <transition :name="transitionName" mode="out-in">
          <GlassCard
            :key="currentPage"
            depth="deep"
            class="story-page mb-8"
          >
            <div class="p-8 md:p-12 min-h-[400px] flex flex-col items-center justify-center">
              <div
                class="page-image text-8xl mb-8"
                :class="currentPageData.animation || 'animate-fadeIn'"
              >
                {{ currentPageData.image }}
              </div>
              <p class="text-2xl text-white leading-relaxed text-center">
                {{ currentPageData.text }}
              </p>
            </div>
          </GlassCard>
        </transition>

        <!-- Navigation Controls -->
        <div class="controls flex items-center justify-between mb-8">
          <GlassButton
            @click="prevPage"
            :disabled="isFirstPage"
            variant="secondary"
            size="lg"
            icon="←"
          >
            {{ $t('stories.prevPage') }}
          </GlassButton>

          <div class="page-indicator glass-card px-6 py-3">
            <span class="text-xl text-white font-semibold">
              {{ currentPage + 1 }} / {{ currentStory.pages.length }}
            </span>
          </div>

          <GlassButton
            @click="nextPage"
            :disabled="isLastPage"
            :variant="isLastPage ? 'success' : 'primary'"
            size="lg"
            :icon="isLastPage ? '✓' : '→'"
          >
            {{ isLastPage ? $t('common.finish') : $t('stories.nextPage') }}
          </GlassButton>
        </div>

        <!-- Progress Bar -->
        <div class="progress-bar-container">
          <div class="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-yellow-400 to-pink-500 transition-all duration-500"
              :style="{ width: progressPercent + '%' }"
            ></div>
          </div>
          <p class="text-sm text-white/70 text-center mt-2">
            {{ $t('stories.progress', { percent: Math.round(progressPercent) }) }}
          </p>
        </div>

        <!-- Completion Celebration -->
        <transition name="fade">
          <div v-if="showCompletionModal" class="completion-modal fixed inset-0 flex items-center justify-center z-50 p-6">
            <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="closeCompletionModal"></div>
            <GlassCard depth="deep" class="relative z-10 max-w-md w-full">
              <div class="p-8 text-center">
                <div class="text-8xl mb-4 animate-bounce">🎉</div>
                <h3 class="text-3xl font-bold text-white mb-4">
                  {{ $t('stories.completed') }}
                </h3>
                <p class="text-xl text-white/80 mb-6">
                  {{ $t('common.wellDone') }}
                </p>
                <div class="flex gap-4">
                  <GlassButton
                    variant="secondary"
                    size="lg"
                    @click="closeStory"
                    class="flex-1"
                  >
                    {{ $t('stories.backToLibrary') }}
                  </GlassButton>
                  <GlassButton
                    variant="primary"
                    size="lg"
                    @click="restartStory"
                    class="flex-1"
                  >
                    {{ $t('common.playAgain') }}
                  </GlassButton>
                </div>
              </div>
            </GlassCard>
          </div>
        </transition>
      </div>
    </div>
  </AnimatedBackground>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import AnimatedBackground from '../components/AnimatedBackground.vue'
import GlassButton from '../components/GlassButton.vue'
import GlassCard from '../components/GlassCard.vue'
import StoryCard from '../components/StoryCard.vue'
import { storiesData, type Story, type StoryPage } from '../data/stories'

const { locale } = useI18n()

// Get stories for current locale
const stories = computed(() => storiesData[locale.value] || storiesData.it)

// Current story and page
const currentStoryId = ref<string | null>(null)
const currentPage = ref<number>(0)
const transitionName = ref<string>('slide-left')
const showCompletionModal = ref<boolean>(false)

// Get current story object
const currentStory = computed(() =>
  currentStoryId.value ? stories.value.find(s => s.id === currentStoryId.value) : null
)

// Get current page data
const currentPageData = computed((): StoryPage => {
  if (!currentStory.value) return { text: '', image: '' }
  return currentStory.value.pages[currentPage.value] || { text: '', image: '' }
})

// Page navigation helpers
const isFirstPage = computed(() => currentPage.value === 0)
const isLastPage = computed(() =>
  currentStory.value ? currentPage.value === currentStory.value.pages.length - 1 : false
)

// Progress calculation
const progressPercent = computed(() => {
  if (!currentStory.value) return 0
  return ((currentPage.value + 1) / currentStory.value.pages.length) * 100
})

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

// Get story progress
const getStoryProgress = (storyId: string): number => {
  const progress = storyProgress.value[storyId]
  if (!progress) return 0

  const story = stories.value.find(s => s.id === storyId)
  if (!story) return 0

  return ((progress.currentPage + 1) / story.pages.length) * 100
}

// Open story
const openStory = (storyId: string) => {
  currentStoryId.value = storyId

  // Load saved progress
  const progress = storyProgress.value[storyId]
  if (progress && !progress.completed) {
    currentPage.value = progress.currentPage
  } else {
    currentPage.value = 0
  }
}

// Close story
const closeStory = () => {
  saveProgress()
  currentStoryId.value = null
  currentPage.value = 0
  showCompletionModal.value = false
}

// Page navigation
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

// Complete story
const completeStory = () => {
  if (!currentStoryId.value) return

  storyProgress.value[currentStoryId.value] = {
    currentPage: currentPage.value,
    completed: true,
    lastRead: new Date().toISOString()
  }

  saveProgress()
  showCompletionModal.value = true
}

// Restart story
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

// Watch for page changes to autosave
watch(currentPage, () => {
  if (currentStoryId.value) {
    saveProgress()
  }
})

// Load progress on mount
onMounted(() => {
  loadProgress()
})
</script>

<style scoped>
.story-page {
  min-height: 400px;
}

.page-image {
  animation-duration: 0.6s;
  animation-fill-mode: both;
}

.animate-fadeIn {
  animation-name: fadeIn;
}

.animate-slideUp {
  animation-name: slideUp;
}

.animate-bounce {
  animation: bounce 1s ease infinite;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Page transitions */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-100px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

/* Fade transition for modal */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.completion-modal {
  animation: fadeIn 0.3s ease;
}
</style>
