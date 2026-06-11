<template>
  <AnimatedBackground>
    <div class="page max-w-2xl flex flex-col items-center">
      <div class="text-center mb-8 animate-rise-in">
        <h1 class="page-title text-3xl sm:text-4xl">{{ t('games.story.title') }}</h1>
      </div>

      <div v-if="currentPhrase && !gameEnded" class="card w-full p-7 sm:p-8 animate-pop-in" :key="currentIndex">
        <div class="flex items-start justify-between gap-3 mb-6">
          <p class="text-xl font-semibold text-ink leading-snug">
            {{ currentPhrase.text }}
          </p>
          <button
            v-if="ttsSupported"
            class="tts-btn shrink-0"
            :aria-label="t('common.readAloud')"
            @click="speak(currentPhrase.text, locale)"
          >
            <AppIcon name="speaker" :size="18" />
          </button>
        </div>

        <div class="grid gap-3 mb-4">
          <button
            v-for="(option, index) in currentPhrase.options"
            :key="index"
            :disabled="answered"
            @click="checkAnswer(option)"
            class="option-btn"
            :class="{
              correct: answered && option === currentPhrase.answer,
              wrong: answered && option === selected && option !== currentPhrase.answer,
              faded: answered && option !== currentPhrase.answer && option !== selected
            }"
          >
            {{ option }}
          </button>
        </div>

        <div v-if="answered && currentIndex < currentSet.length - 1" class="flex justify-end">
          <GlassButton variant="primary" @click="nextPhrase">
            {{ t('games.story.next') }}
          </GlassButton>
        </div>
      </div>

      <div v-else-if="gameEnded" class="card w-full p-8 text-center animate-pop-in">
        <img :src="glimmy" alt="Glimmy" class="w-24 h-24 mx-auto mb-4 animate-float" />
        <h3 class="font-display text-2xl font-bold text-ink mb-2">
          🎉 {{ t('games.story.score', { score: correctCount }) }}
        </h3>
        <div class="flex gap-3 justify-center flex-wrap mt-6">
          <GlassButton variant="primary" @click="restartGame">
            {{ t('games.story.playAgain') }}
          </GlassButton>
          <RouterLink to="/games">
            <GlassButton variant="ghost">{{ t('games.story.backMenu') }}</GlassButton>
          </RouterLink>
        </div>
      </div>
    </div>
  </AnimatedBackground>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import AnimatedBackground from '../../components/AnimatedBackground.vue'
import AppIcon from '../../components/AppIcon.vue'
import GlassButton from '../../components/GlassButton.vue'
import { completePhraseSets, type Phrase } from '../../data/completePhrases'
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

const currentSet = ref<Phrase[]>([])
const currentIndex = ref(0)
const selected = ref<string | null>(null)
const answered = ref(false)
const correctCount = ref(0)
const startTime = ref(Date.now())

const currentPhrase = computed(() => currentSet.value[currentIndex.value])
const gameEnded = computed(() => currentIndex.value === currentSet.value.length - 1 && answered.value)

const checkAnswer = (option: string) => {
  if (answered.value) return
  selected.value = option
  answered.value = true

  const correct = option === currentPhrase.value.answer
  if (correct) {
    correctCount.value++
    playCorrect()
    react('happy', 1500)
  } else {
    playWrong()
    react('sad', 1500)
  }

  if (currentIndex.value === currentSet.value.length - 1) {
    const durationSec = Math.round((Date.now() - startTime.value) / 1000)
    recordGameComplete('complete-phrase', {
      score: correctCount.value,
      maxScore: currentSet.value.length,
      durationSec
    })
    playFanfare()
    react('celebrate', 3000)
    say(t('glimmy.gameWin'), { durationMs: 3500 })
  }
}

const nextPhrase = () => {
  if (currentIndex.value < currentSet.value.length - 1) {
    currentIndex.value++
    selected.value = null
    answered.value = false
  }
}

const setupPhrases = () => {
  const shortLang = locale.value.split('-')[0] as keyof typeof completePhraseSets
  const sets = completePhraseSets[shortLang] || completePhraseSets.it
  const randomSet = sets[Math.floor(Math.random() * sets.length)]

  currentSet.value = randomSet.phrases
  currentIndex.value = 0
  selected.value = null
  answered.value = false
  correctCount.value = 0
  startTime.value = Date.now()
}

const restartGame = () => {
  setupPhrases()
}

onMounted(setupPhrases)

watch(locale, () => {
  setupPhrases()
})
</script>

<style scoped>
.option-btn {
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

.option-btn:hover:not(:disabled) {
  border-color: rgba(247, 179, 43, 0.6);
  background: #fff8e6;
  transform: translateX(4px);
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
