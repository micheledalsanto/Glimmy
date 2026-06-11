<template>
  <AnimatedBackground>
    <div class="page max-w-2xl flex flex-col items-center">
      <div class="text-center mb-8 animate-rise-in">
        <h2 class="page-title text-3xl sm:text-4xl">{{ t('games.quiz.title') }}</h2>
      </div>

      <!-- Barra progresso -->
      <div v-if="!finished" class="w-full mb-6">
        <div class="flex justify-between text-sm font-semibold text-ink-soft mb-2">
          <span>{{ t('games.quiz.progress', { current: currentIndex + 1, total: questions.length }) }}</span>
          <span>{{ t('games.quiz.scoreLabel', { score }) }}</span>
        </div>
        <div class="h-2.5 rounded-full bg-ink/5 overflow-hidden">
          <div
            class="h-full rounded-full bg-sun-400 transition-all duration-500"
            :style="{ width: `${(currentIndex / questions.length) * 100}%` }"
          />
        </div>
      </div>

      <!-- Domanda corrente -->
      <div v-if="!finished" class="card w-full p-7 sm:p-8 animate-pop-in" :key="currentIndex">
        <div class="flex items-start justify-between gap-3 mb-6">
          <div class="flex items-center gap-4">
            <span class="text-4xl">{{ currentQuestion.emoji }}</span>
            <p class="text-xl font-semibold text-ink leading-snug">
              {{ currentQuestion.question }}
            </p>
          </div>
          <button
            v-if="ttsSupported"
            class="tts-btn shrink-0"
            :aria-label="t('common.readAloud')"
            @click="speak(currentQuestion.question, locale)"
          >
            <AppIcon name="speaker" :size="18" />
          </button>
        </div>

        <div class="flex flex-col gap-3">
          <button
            v-for="(option, i) in currentQuestion.options"
            :key="i"
            :disabled="answered"
            @click="selectAnswer(i)"
            class="answer-btn"
            :class="answerClass(i)"
          >
            <span>{{ option }}</span>
            <AppIcon v-if="answered && i === currentQuestion.correctIndex" name="check" :size="20" />
            <AppIcon v-else-if="answered && i === selected" name="x" :size="20" />
          </button>
        </div>

        <div v-if="answered" class="mt-6 flex justify-end">
          <GlassButton variant="primary" @click="nextQuestion">
            {{ currentIndex < questions.length - 1 ? t('games.quiz.next') : t('games.quiz.results') }}
          </GlassButton>
        </div>
      </div>

      <!-- Risultati -->
      <div v-else class="card w-full p-8 text-center animate-pop-in">
        <img :src="glimmy" alt="Glimmy" class="w-24 h-24 mx-auto mb-4 animate-float" />
        <h3 class="font-display text-3xl font-bold text-ink mb-2">
          {{ perfect ? t('games.quiz.perfect') : t('games.quiz.finished', { score }) }}
        </h3>
        <p class="text-ink-soft mb-6">
          {{ t('games.quiz.summary', { score, total: questions.length }) }}
        </p>
        <div class="flex gap-3 justify-center flex-wrap">
          <GlassButton variant="primary" @click="restart">
            {{ t('games.quiz.restart') }}
          </GlassButton>
          <RouterLink to="/games">
            <GlassButton variant="ghost">{{ t('common.backToGames') }}</GlassButton>
          </RouterLink>
        </div>
      </div>
    </div>
  </AnimatedBackground>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import AnimatedBackground from '../../components/AnimatedBackground.vue'
import AppIcon from '../../components/AppIcon.vue'
import GlassButton from '../../components/GlassButton.vue'
import { quizData, type QuizQuestion } from '../../data/quiz'
import { useProgress } from '../../composables/useProgress'
import { useSound } from '../../composables/useSound'
import { useSpeech } from '../../composables/useSpeech'
import { useGlimmy } from '../../composables/useGlimmy'

const { t, locale } = useI18n()
const { recordGameComplete } = useProgress()
const { playCorrect, playWrong, playFanfare } = useSound()
const { speak, supported: ttsSupported } = useSpeech()
const { react, say } = useGlimmy()

const glimmy = new URL('../../assets/images/glimmy.png', import.meta.url).href

const QUESTIONS_PER_ROUND = 5

function pickQuestions(): QuizQuestion[] {
  const pool = quizData[locale.value] || quizData.it
  return [...pool].sort(() => 0.5 - Math.random()).slice(0, QUESTIONS_PER_ROUND)
}

const questions = ref<QuizQuestion[]>(pickQuestions())
const currentIndex = ref(0)
const selected = ref<number | null>(null)
const score = ref(0)
const finished = ref(false)
const startTime = ref(Date.now())

const currentQuestion = computed(() => questions.value[currentIndex.value])
const answered = computed(() => selected.value !== null)
const perfect = computed(() => score.value === questions.value.length)

function selectAnswer(index: number) {
  selected.value = index
  if (index === currentQuestion.value.correctIndex) {
    score.value++
    playCorrect()
    react('happy', 1500)
  } else {
    playWrong()
    react('sad', 1500)
  }
}

function nextQuestion() {
  if (currentIndex.value < questions.value.length - 1) {
    selected.value = null
    currentIndex.value++
  } else {
    finish()
  }
}

function finish() {
  finished.value = true
  const durationSec = Math.round((Date.now() - startTime.value) / 1000)
  recordGameComplete('quiz', {
    score: score.value,
    maxScore: questions.value.length,
    durationSec
  })
  if (perfect.value) {
    playFanfare()
    react('celebrate', 3000)
    say(t('glimmy.perfectScore'), { durationMs: 3500 })
  }
}

function restart() {
  questions.value = pickQuestions()
  currentIndex.value = 0
  selected.value = null
  score.value = 0
  finished.value = false
  startTime.value = Date.now()
}

watch(locale, restart)

function answerClass(index: number) {
  if (!answered.value) return 'idle'
  if (index === currentQuestion.value.correctIndex) return 'correct'
  if (index === selected.value) return 'wrong'
  return 'faded'
}
</script>

<style scoped>
.answer-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
  text-align: left;
  padding: 0.9rem 1.25rem;
  border-radius: 1rem;
  font-weight: 600;
  font-size: 1.05rem;
  color: #2b2d42;
  background: #fbf8f2;
  border: 1.5px solid rgba(43, 45, 66, 0.08);
  cursor: pointer;
  transition: all 0.2s ease;
}

.answer-btn.idle:hover {
  border-color: rgba(247, 179, 43, 0.6);
  background: #fff8e6;
  transform: translateX(4px);
}

.answer-btn.correct {
  background: #eaf8f2;
  border-color: #3fbf8f;
  color: #23855f;
}

.answer-btn.wrong {
  background: #fdefed;
  border-color: #f0766b;
  color: #c03e33;
  animation: shake 0.4s ease;
}

.answer-btn.faded {
  opacity: 0.5;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
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
  border: none;
  cursor: pointer;
  transition: transform 0.18s ease, background 0.18s ease;
}

.tts-btn:hover {
  background: #d8ebf8;
  transform: scale(1.08);
}
</style>
