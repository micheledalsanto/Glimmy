<template>
  <AnimatedBackground>
    <div class="page max-w-3xl">
      <!-- Header -->
      <div class="mb-10 text-center animate-rise-in">
        <h1 class="page-title text-3xl sm:text-4xl">{{ $t('games.storyFill.title') }}</h1>
        <p class="page-subtitle">{{ $t('games.storyFill.instruction') }}</p>
      </div>

      <!-- Story Builder -->
      <div v-if="!revealed" class="card p-7 sm:p-9 animate-pop-in">
        <h2 class="font-display text-2xl font-bold text-ink text-center mb-8">
          {{ currentStory.title }}
        </h2>

        <!-- Story Segments -->
        <div class="text-xl text-ink leading-loose mb-8">
          <span v-for="(segment, index) in currentStory.segments" :key="index">
            <span v-if="!segment.blank">{{ segment.text }}&nbsp;</span>
            <span v-else class="inline-flex items-center align-middle mx-1 my-1">
              <button
                v-if="!filledBlanks[index]"
                @click="selectBlank(index)"
                class="blank-btn"
              >
                ____
              </button>
              <span v-else class="filled-word">
                {{ filledBlanks[index] }}
              </span>
            </span>
          </span>
        </div>

        <!-- Progress -->
        <div class="mb-6">
          <div class="w-full h-2.5 bg-ink/5 rounded-full overflow-hidden">
            <div
              class="h-full bg-sun-400 rounded-full transition-all duration-500"
              :style="{ width: progressPercent + '%' }"
            />
          </div>
          <p class="text-sm text-ink-soft text-center mt-2">
            {{ filledBlanksCount }} / {{ totalBlanks }} {{ $t('games.storyFill.wordsFilled') }}
          </p>
        </div>

        <!-- Reveal Button -->
        <GlassButton
          v-if="allBlanksFilled"
          @click="revealStory"
          variant="primary"
          size="lg"
          class="w-full"
        >
          ✨ {{ $t('games.storyFill.reveal') }}
        </GlassButton>
      </div>

      <!-- Word Selection Modal -->
      <Transition name="fade">
        <div
          v-if="selectingBlankIndex !== null"
          class="fixed inset-0 flex items-center justify-center z-50 p-6 bg-ink/30 backdrop-blur-sm"
          @click.self="cancelSelection"
        >
          <div class="card relative max-w-xl w-full p-7 animate-pop-in">
            <button
              @click="cancelSelection"
              class="absolute top-4 right-4 text-ink-faint hover:text-ink transition"
              :aria-label="$t('common.close')"
            >
              <AppIcon name="x" :size="22" />
            </button>

            <h3 class="font-display text-xl font-bold text-ink text-center mb-6">
              {{ $t('games.storyFill.selectWord') }}
            </h3>

            <div class="grid grid-cols-2 gap-3">
              <button
                v-for="option in currentBlankOptions"
                :key="option"
                @click="fillBlank(option)"
                class="word-option"
              >
                {{ option }}
              </button>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Revealed Story -->
      <div v-if="revealed" class="card p-7 sm:p-9 animate-pop-in">
        <div class="text-center mb-8">
          <div class="text-7xl mb-4 animate-wiggle inline-block">🎉</div>
          <h2 class="font-display text-3xl font-bold text-ink mb-1">
            {{ $t('games.storyFill.yourStory') }}
          </h2>
          <h3 class="text-lg font-semibold text-ink-soft">
            {{ currentStory.title }}
          </h3>
        </div>

        <div class="relative text-xl text-ink leading-loose mb-8 p-6 bg-cream rounded-2xl border border-ink/5">
          {{ completeStoryText }}
          <button
            v-if="ttsSupported"
            class="tts-btn absolute -top-3 -right-3"
            :aria-label="$t('common.readAloud')"
            @click="speak(completeStoryText, locale)"
          >
            <AppIcon name="speaker" :size="18" />
          </button>
        </div>

        <div class="flex gap-3 flex-wrap justify-center">
          <GlassButton @click="playAgain" variant="primary" size="lg">
            {{ $t('games.storyFill.playAgain') }}
          </GlassButton>
          <GlassButton @click="$router.push('/games')" variant="ghost" size="lg">
            {{ $t('common.backToMenu') }}
          </GlassButton>
        </div>
      </div>
    </div>
  </AnimatedBackground>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import AnimatedBackground from '../../components/AnimatedBackground.vue'
import AppIcon from '../../components/AppIcon.vue'
import GlassButton from '../../components/GlassButton.vue'
import { storyFillData } from '../../data/storyFill'
import { useProgress } from '../../composables/useProgress'
import { useSound } from '../../composables/useSound'
import { useSpeech } from '../../composables/useSpeech'
import { useGlimmy } from '../../composables/useGlimmy'

const { t, locale } = useI18n()
const { recordGameComplete } = useProgress()
const { playClick, playFanfare } = useSound()
const { speak, supported: ttsSupported } = useSpeech()
const { react, say } = useGlimmy()

// Get stories for current locale
const stories = computed(() => storyFillData[locale.value] || storyFillData.it)

// Current story
const currentStoryIndex = ref<number>(0)
const currentStory = computed(() => stories.value[currentStoryIndex.value])

// Blank filling state
const filledBlanks = ref<Record<number, string>>({})
const selectingBlankIndex = ref<number | null>(null)
const revealed = ref<boolean>(false)
const startTime = ref(Date.now())

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
      text += (filledBlanks.value[index] || '[___]') + ' '
    } else {
      text += (segment.text ?? '') + ' '
    }
  })
  return text.trim()
})

// Select blank to fill
const selectBlank = (index: number) => {
  playClick()
  selectingBlankIndex.value = index
}

const cancelSelection = () => {
  selectingBlankIndex.value = null
}

const fillBlank = (word: string) => {
  if (selectingBlankIndex.value === null) return
  playClick()
  filledBlanks.value[selectingBlankIndex.value] = word
  selectingBlankIndex.value = null
}

// Reveal story
const revealStory = () => {
  revealed.value = true
  const durationSec = Math.round((Date.now() - startTime.value) / 1000)
  recordGameComplete('story-fill', { durationSec })
  playFanfare()
  react('celebrate', 3000)
  say(t('glimmy.storyDone'), { durationMs: 3500 })
}

// Play again
const playAgain = () => {
  let newIndex = currentStoryIndex.value
  if (stories.value.length > 1) {
    do {
      newIndex = Math.floor(Math.random() * stories.value.length)
    } while (newIndex === currentStoryIndex.value)
  }

  currentStoryIndex.value = newIndex
  filledBlanks.value = {}
  revealed.value = false
  startTime.value = Date.now()
}

onMounted(() => {
  currentStoryIndex.value = Math.floor(Math.random() * stories.value.length)
})
</script>

<style scoped>
.blank-btn {
  padding: 0.25rem 1.1rem;
  border-radius: 9999px;
  font-weight: 700;
  font-family: 'Baloo 2', sans-serif;
  color: #c4830a;
  background: #fff8e6;
  border: 2px dashed rgba(247, 179, 43, 0.7);
  cursor: pointer;
  transition: all 0.2s ease;
  animation: blank-pulse 2s ease-in-out infinite;
}

.blank-btn:hover {
  background: #ffefc2;
  transform: scale(1.06);
  animation: none;
}

@keyframes blank-pulse {
  0%, 100% { border-color: rgba(247, 179, 43, 0.7); }
  50% { border-color: rgba(247, 179, 43, 0.3); }
}

.filled-word {
  display: inline-block;
  padding: 0.25rem 1rem;
  border-radius: 9999px;
  font-weight: 700;
  color: #23855f;
  background: #eaf8f2;
  border: 2px solid rgba(63, 191, 143, 0.5);
  animation: pop 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes pop {
  0% { transform: scale(0); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.word-option {
  padding: 0.9rem 1rem;
  border-radius: 1rem;
  font-weight: 600;
  font-size: 1.05rem;
  color: #2b2d42;
  background: #fbf8f2;
  border: 1.5px solid rgba(43, 45, 66, 0.08);
  cursor: pointer;
  transition: all 0.2s ease;
}

.word-option:hover {
  border-color: rgba(247, 179, 43, 0.6);
  background: #fff8e6;
  transform: translateY(-2px);
}

.tts-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 9999px;
  background: #eef6fc;
  color: #2a6ba5;
  border: 1px solid rgba(43, 45, 66, 0.06);
  box-shadow: 0 4px 12px -4px rgba(43, 45, 66, 0.2);
  cursor: pointer;
  transition: transform 0.18s ease, background 0.18s ease;
}

.tts-btn:hover {
  background: #d8ebf8;
  transform: scale(1.08);
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
