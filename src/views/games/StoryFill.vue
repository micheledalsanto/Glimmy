<template>
  <AnimatedBackground theme="yellow-pink" :particles="true">
    <div class="container mx-auto p-6 max-w-4xl">
      <!-- Header -->
      <div class="mb-8 text-center mt-16">
        <h1 class="text-5xl font-bold text-white mb-4">
          {{ $t('games.storyFill.title') }}
        </h1>
        <p class="text-xl text-white/80">
          {{ $t('games.storyFill.instruction') }}
        </p>
      </div>

      <!-- Story Container -->
      <div v-if="!revealed" class="story-builder mb-8">
        <GlassCard depth="deep">
          <div class="p-8">
            <!-- Story Title -->
            <h2 class="text-3xl font-bold text-white text-center mb-8">
              {{ currentStory.title }}
            </h2>

            <!-- Story Segments -->
            <div class="story-text text-2xl text-white leading-relaxed mb-8">
              <span v-for="(segment, index) in currentStory.segments" :key="index">
                <span v-if="!segment.blank">{{ segment.text }}</span>
                <span v-else class="blank-container inline-flex items-center mx-1">
                  <GlassButton
                    v-if="!filledBlanks[index]"
                    @click="selectBlank(index)"
                    variant="warning"
                    size="md"
                    class="blank-button"
                  >
                    [ ____ ]
                  </GlassButton>
                  <span
                    v-else
                    class="filled-word px-4 py-2 bg-yellow-400/30 border-2 border-yellow-400 rounded-lg font-bold text-yellow-200 animate-pop"
                  >
                    {{ filledBlanks[index] }}
                  </span>
                </span>
              </span>
            </div>

            <!-- Progress -->
            <div class="progress-section mb-6">
              <div class="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  class="h-full bg-gradient-to-r from-yellow-400 to-pink-500 transition-all duration-500"
                  :style="{ width: progressPercent + '%' }"
                ></div>
              </div>
              <p class="text-sm text-white/70 text-center mt-2">
                {{ filledBlanksCount }} / {{ totalBlanks }} {{ $t('games.storyFill.wordsFilled') }}
              </p>
            </div>

            <!-- Reveal Button -->
            <GlassButton
              v-if="allBlanksFilled"
              @click="revealStory"
              variant="success"
              size="xl"
              icon="✨"
              class="w-full animate-bounce-soft"
            >
              {{ $t('games.storyFill.reveal') }}
            </GlassButton>
          </div>
        </GlassCard>
      </div>

      <!-- Word Selection Modal -->
      <transition name="fade">
        <div
          v-if="selectingBlankIndex !== null"
          class="word-modal fixed inset-0 flex items-center justify-center z-50 p-6"
          @click.self="cancelSelection"
        >
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <GlassCard depth="deep" class="relative z-10 max-w-2xl w-full">
            <div class="p-8">
              <!-- Close button -->
              <button
                @click="cancelSelection"
                class="absolute top-4 right-4 text-white/70 hover:text-white text-3xl"
              >
                ×
              </button>

              <!-- Instructions -->
              <h3 class="text-2xl font-bold text-white text-center mb-6">
                {{ $t('games.storyFill.selectWord') }}
              </h3>

              <!-- Word Options -->
              <div class="grid grid-cols-2 gap-4">
                <GlassButton
                  v-for="option in currentBlankOptions"
                  :key="option"
                  @click="fillBlank(option)"
                  variant="primary"
                  size="xl"
                  class="word-option"
                >
                  {{ option }}
                </GlassButton>
              </div>
            </div>
          </GlassCard>
        </div>
      </transition>

      <!-- Revealed Story -->
      <div v-if="revealed" class="revealed-story">
        <GlassCard depth="deep">
          <div class="p-8">
            <!-- Celebration -->
            <div class="celebration text-center mb-8">
              <div class="text-8xl mb-4 animate-bounce">🎉</div>
              <h2 class="text-4xl font-bold text-white mb-4">
                {{ $t('games.storyFill.yourStory') }}
              </h2>
              <h3 class="text-2xl font-semibold text-white/90 mb-6">
                {{ currentStory.title }}
              </h3>
            </div>

            <!-- Complete Story Text -->
            <div class="complete-story-text text-2xl text-white leading-relaxed mb-8 p-6 bg-white/10 rounded-xl">
              {{ completeStoryText }}
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-4">
              <GlassButton
                @click="playAgain"
                variant="primary"
                size="xl"
                icon="🔄"
                class="flex-1"
              >
                {{ $t('games.storyFill.playAgain') }}
              </GlassButton>
              <GlassButton
                @click="$router.push('/games')"
                variant="secondary"
                size="xl"
                icon="🎮"
                class="flex-1"
              >
                {{ $t('common.backToMenu') }}
              </GlassButton>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  </AnimatedBackground>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import AnimatedBackground from '../../components/AnimatedBackground.vue'
import GlassButton from '../../components/GlassButton.vue'
import GlassCard from '../../components/GlassCard.vue'
import { storyFillData, type StoryFillTemplate } from '../../data/storyFill'

const { locale } = useI18n()

// Get stories for current locale
const stories = computed(() => storyFillData[locale.value] || storyFillData.it)

// Current story
const currentStoryIndex = ref<number>(0)
const currentStory = computed(() => stories.value[currentStoryIndex.value])

// Blank filling state
const filledBlanks = ref<Record<number, string>>({})
const selectingBlankIndex = ref<number | null>(null)
const revealed = ref<boolean>(false)

// Get current blank options
const currentBlankOptions = computed(() => {
  if (selectingBlankIndex.value === null) return []

  const segment = currentStory.value.segments[selectingBlankIndex.value]
  if (!segment.blank) return []

  return segment.blank.options
})

// Progress tracking
const totalBlanks = computed(() =>
  currentStory.value.segments.filter(s => s.blank).length
)

const filledBlanksCount = computed(() =>
  Object.keys(filledBlanks.value).length
)

const progressPercent = computed(() =>
  totalBlanks.value > 0 ? (filledBlanksCount.value / totalBlanks.value) * 100 : 0
)

const allBlanksFilled = computed(() =>
  filledBlanksCount.value === totalBlanks.value
)

// Complete story text
const completeStoryText = computed(() => {
  let text = ''
  currentStory.value.segments.forEach((segment, index) => {
    if (segment.blank) {
      text += filledBlanks.value[index] || '[___]'
    } else {
      text += segment.text
    }
  })
  return text
})

// Select blank to fill
const selectBlank = (index: number) => {
  selectingBlankIndex.value = index
}

// Cancel selection
const cancelSelection = () => {
  selectingBlankIndex.value = null
}

// Fill blank with selected word
const fillBlank = (word: string) => {
  if (selectingBlankIndex.value === null) return

  filledBlanks.value[selectingBlankIndex.value] = word
  selectingBlankIndex.value = null
}

// Reveal story
const revealStory = () => {
  revealed.value = true
}

// Play again
const playAgain = () => {
  // Pick a random story (different from current)
  let newIndex = currentStoryIndex.value
  if (stories.value.length > 1) {
    do {
      newIndex = Math.floor(Math.random() * stories.value.length)
    } while (newIndex === currentStoryIndex.value)
  }

  currentStoryIndex.value = newIndex
  filledBlanks.value = {}
  revealed.value = false
}

// Initialize
onMounted(() => {
  // Start with a random story
  currentStoryIndex.value = Math.floor(Math.random() * stories.value.length)
})
</script>

<style scoped>
.blank-container {
  display: inline-flex;
  vertical-align: middle;
}

.blank-button {
  animation: pulse-slow 2s ease-in-out infinite;
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.filled-word {
  display: inline-block;
  animation: pop 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes pop {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.animate-pop {
  animation: pop 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.animate-bounce-soft {
  animation: bounce-soft 2s ease-in-out infinite;
}

@keyframes bounce-soft {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.word-option {
  transition: all 0.3s ease;
}

.word-option:hover {
  transform: scale(1.05);
}

.word-modal {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.celebration {
  animation: fadeIn 0.6s ease;
}

.complete-story-text {
  animation: slideUp 0.6s ease;
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
</style>
