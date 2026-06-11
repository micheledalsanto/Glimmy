<template>
  <AnimatedBackground>
    <div class="page max-w-2xl flex flex-col items-center">
      <div class="text-center mb-8 animate-rise-in">
        <h2 class="page-title text-3xl sm:text-4xl">{{ t('games.guess.title') }}</h2>
        <p class="page-subtitle">{{ t('games.guess.question') }}</p>
      </div>

      <div class="card w-full p-8 text-center animate-pop-in" :key="currentIndex">
        <!-- Emoji dell'oggetto da indovinare -->
        <div class="emoji-stage mb-8">
          <span class="text-8xl inline-block animate-float">{{ currentItem.emoji }}</span>
        </div>

        <!-- Opzioni -->
        <div class="flex flex-wrap justify-center gap-3 mb-6">
          <button
            v-for="option in currentItem.options"
            :key="option"
            @click="checkAnswer(option)"
            :disabled="answered"
            class="option-btn"
            :class="optionClass(option)"
          >
            {{ t(`games.guess.items.${option}`) }}
          </button>
        </div>

        <!-- Feedback -->
        <Transition name="fade">
          <div v-if="answered" class="mb-6">
            <p v-if="isCorrect" class="text-lg font-bold text-mint-500">
              {{ t('games.guess.correct') }}
            </p>
            <p v-else class="text-lg font-bold text-coral-500">
              {{ t('games.guess.wrong') }} {{ t(`games.guess.items.${currentItem.answer}`) }}
            </p>
          </div>
        </Transition>

        <!-- Navigazione -->
        <div v-if="answered">
          <GlassButton
            v-if="currentIndex < items.length - 1"
            variant="primary"
            @click="next"
          >
            {{ t('games.guess.next') }}
          </GlassButton>
          <div v-else>
            <h3 class="font-display text-2xl font-bold text-ink mb-1">
              {{ t('games.guess.congrats') }}
            </h3>
            <p class="text-ink-soft mb-5">{{ t('games.guess.score', { score }) }}</p>
            <div class="flex gap-3 justify-center flex-wrap">
              <GlassButton variant="primary" @click="restart">
                {{ t('games.guess.playAgain') }}
              </GlassButton>
              <RouterLink to="/games">
                <GlassButton variant="ghost">{{ t('games.guess.backMenu') }}</GlassButton>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AnimatedBackground>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import AnimatedBackground from '../../components/AnimatedBackground.vue'
import GlassButton from '../../components/GlassButton.vue'
import { useProgress } from '../../composables/useProgress'
import { useSound } from '../../composables/useSound'
import { useGlimmy } from '../../composables/useGlimmy'

const { t } = useI18n()
const { recordGameComplete, recordCollectionItem } = useProgress()
const { playCorrect, playWrong, playFanfare } = useSound()
const { react, say } = useGlimmy()

interface GuessItem {
  emoji: string
  options: string[]
  answer: string
}

const allItems: GuessItem[] = [
  { emoji: '🤖', options: ['robot', 'car', 'dice'], answer: 'robot' },
  { emoji: '🚗', options: ['car', 'robot', 'chip'], answer: 'car' },
  { emoji: '🎲', options: ['dice', 'block', 'graph'], answer: 'dice' },
  { emoji: '❤️', options: ['heart', 'brain', 'chip'], answer: 'heart' },
  { emoji: '🧠', options: ['brain', 'ai', 'chip'], answer: 'brain' },
  { emoji: '👁️', options: ['eye', 'camera', 'search'], answer: 'eye' },
  { emoji: '💡', options: ['lamp', 'idea', 'network'], answer: 'lamp' },
  { emoji: '💭', options: ['idea', 'brain', 'chip'], answer: 'idea' },
  { emoji: '🌐', options: ['network', 'saturn', 'chip'], answer: 'network' },
  { emoji: '📡', options: ['radar', 'antenna', 'signal'], answer: 'radar' },
  { emoji: '🪐', options: ['saturn', 'radar', 'chip'], answer: 'saturn' },
  { emoji: '📶', options: ['signal', 'network', 'antenna'], answer: 'signal' },
  { emoji: '🛰️', options: ['antenna', 'signal', 'radar'], answer: 'antenna' },
  { emoji: '🧬', options: ['dna', 'electrons', 'microscope'], answer: 'dna' },
  { emoji: '🪜', options: ['ladder', 'dna', 'graph'], answer: 'ladder' },
  { emoji: '⚛️', options: ['electrons', 'magnet', 'dna'], answer: 'electrons' },
  { emoji: '🎛️', options: ['controlpanel', 'gears', 'tool'], answer: 'controlpanel' },
  { emoji: '📷', options: ['camera', 'eye', 'monitor'], answer: 'camera' },
  { emoji: '⚙️', options: ['gears', 'joystick', 'tool'], answer: 'gears' },
  { emoji: '🎯', options: ['target', 'graph', 'block'], answer: 'target' },
  { emoji: '🔋', options: ['battery', 'magnet', 'tool'], answer: 'battery' },
  { emoji: '🔬', options: ['microscope', 'chip', 'dna'], answer: 'microscope' },
  { emoji: '💿', options: ['disk', 'chip', 'floppy'], answer: 'disk' },
  { emoji: '🕹️', options: ['joystick', 'gears', 'chip'], answer: 'joystick' },
  { emoji: '🔎', options: ['search', 'idea', 'camera'], answer: 'search' },
  { emoji: '💻', options: ['computer', 'robot', 'monitor'], answer: 'computer' },
  { emoji: '🧲', options: ['magnet', 'battery', 'gears'], answer: 'magnet' },
  { emoji: '📈', options: ['graph', 'chart', 'block'], answer: 'graph' },
  { emoji: '🧪', options: ['experiment', 'tool', 'dna'], answer: 'experiment' },
  { emoji: '🛠️', options: ['tool', 'chip', 'joystick'], answer: 'tool' },
  { emoji: '🧱', options: ['block', 'chip', 'gears'], answer: 'block' },
  { emoji: '📊', options: ['chart', 'graph', 'network'], answer: 'chart' },
  { emoji: '🌍', options: ['globe', 'network', 'map'], answer: 'globe' },
  { emoji: '🧭', options: ['compass', 'map', 'graph'], answer: 'compass' },
  { emoji: '🔌', options: ['plug', 'battery', 'chip'], answer: 'plug' },
  { emoji: '🗺️', options: ['map', 'globe', 'compass'], answer: 'map' },
  { emoji: '🧠', options: ['ai', 'brain', 'idea'], answer: 'ai' },
  { emoji: '💾', options: ['floppy', 'disk', 'experiment'], answer: 'floppy' }
]

function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = array.slice().sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

const items = ref<GuessItem[]>(getRandomItems(allItems, 5))
const currentIndex = ref(0)
const score = ref(0)
const answered = ref(false)
const isCorrect = ref(false)
const selected = ref<string | null>(null)
const startTime = ref(Date.now())

const currentItem = computed(() => items.value[currentIndex.value])

function checkAnswer(option: string) {
  answered.value = true
  selected.value = option
  isCorrect.value = option === currentItem.value.answer
  if (isCorrect.value) {
    score.value++
    playCorrect()
    react('happy', 1500)
    // Collezione di oggetti indovinati (badge "Guru dell'Indovina")
    recordCollectionItem('guess', currentItem.value.answer)
  } else {
    playWrong()
    react('sad', 1500)
  }

  if (currentIndex.value === items.value.length - 1) {
    const durationSec = Math.round((Date.now() - startTime.value) / 1000)
    recordGameComplete('guess', { score: score.value, maxScore: items.value.length, durationSec })
    if (score.value === items.value.length) {
      playFanfare()
      react('celebrate', 3000)
      say(t('glimmy.perfectScore'), { durationMs: 3500 })
    }
  }
}

function next() {
  currentIndex.value++
  answered.value = false
  isCorrect.value = false
  selected.value = null
}

function restart() {
  items.value = getRandomItems(allItems, 5)
  currentIndex.value = 0
  score.value = 0
  answered.value = false
  isCorrect.value = false
  selected.value = null
  startTime.value = Date.now()
}

function optionClass(option: string) {
  if (!answered.value) return 'idle'
  if (option === currentItem.value.answer) return 'correct'
  if (option === selected.value) return 'wrong'
  return 'faded'
}
</script>

<style scoped>
.emoji-stage {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 9rem;
  height: 9rem;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(247, 179, 43, 0.14), transparent 70%);
}

.option-btn {
  padding: 0.8rem 1.5rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 1.05rem;
  color: #2b2d42;
  background: #fbf8f2;
  border: 1.5px solid rgba(43, 45, 66, 0.08);
  cursor: pointer;
  transition: all 0.2s ease;
}

.option-btn.idle:hover {
  border-color: rgba(247, 179, 43, 0.6);
  background: #fff8e6;
  transform: translateY(-2px);
}

.option-btn.correct {
  background: #eaf8f2;
  border-color: #3fbf8f;
  color: #23855f;
}

.option-btn.wrong {
  background: #fdefed;
  border-color: #f0766b;
  color: #c03e33;
}

.option-btn.faded {
  opacity: 0.5;
}

.fade-enter-active { transition: opacity 0.3s ease; }
.fade-enter-from { opacity: 0; }
</style>
