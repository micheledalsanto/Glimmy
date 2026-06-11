<template>
  <AnimatedBackground>
    <div class="page max-w-2xl flex flex-col items-center">
      <div class="text-center mb-8 animate-rise-in">
        <h1 class="page-title text-3xl sm:text-4xl">{{ t('games.trainRobot.title') }}</h1>
        <p class="page-subtitle">
          {{ phase === 'train' ? t('games.trainRobot.trainInstruction') : phase === 'test' ? t('games.trainRobot.testInstruction') : '' }}
        </p>
      </div>

      <!-- Robot allievo -->
      <div class="robot-stage mb-6" :class="{ thinking: robotThinking }">
        <AppIcon name="robot" :size="52" />
        <span v-if="robotThinking" class="thinking-dots" aria-hidden="true">
          <i /><i /><i />
        </span>
      </div>

      <!-- ===== FASE 1: ADDESTRAMENTO ===== -->
      <div v-if="phase === 'train'" class="card w-full p-7 sm:p-8 text-center animate-pop-in" :key="`train-${trainIndex}`">
        <p class="text-sm font-bold uppercase tracking-wider text-sun-500 mb-4">
          {{ t('games.trainRobot.example', { current: trainIndex + 1, total: trainItems.length }) }}
        </p>

        <div class="text-8xl mb-6 animate-pop-in">{{ currentTrainItem.emoji }}</div>
        <p class="text-lg text-ink-soft mb-6">{{ t('games.trainRobot.whichCategory') }}</p>

        <div class="grid grid-cols-2 gap-4 mb-6">
          <button
            v-for="cat in round.categories"
            :key="cat.id"
            class="category-btn"
            @click="labelItem(cat.id)"
          >
            <span class="text-4xl">{{ cat.emoji }}</span>
            <span class="font-display font-bold text-lg">{{ t(`games.trainRobot.categories.${cat.id}`) }}</span>
          </button>
        </div>

        <!-- Conoscenza del robot -->
        <div class="flex justify-center gap-6 mb-2">
          <div v-for="cat in round.categories" :key="cat.id" class="flex items-center gap-2">
            <span class="text-xl">{{ cat.emoji }}</span>
            <div class="flex gap-1">
              <span
                v-for="n in 3"
                :key="n"
                class="knowledge-dot"
                :class="{ filled: labeledCount(cat.id) >= n }"
              />
            </div>
          </div>
        </div>
        <p class="text-xs text-ink-faint">{{ t('games.trainRobot.knowledgeHint') }}</p>

        <GlassButton
          v-if="trainIndex >= 2"
          variant="secondary"
          size="sm"
          class="mt-5"
          @click="startTest"
        >
          {{ t('games.trainRobot.testEarly') }}
        </GlassButton>
      </div>

      <!-- ===== FASE 2: IL ROBOT PROVA DA SOLO ===== -->
      <div v-else-if="phase === 'test'" class="card w-full p-7 sm:p-8 text-center animate-pop-in" :key="`test-${testIndex}`">
        <p class="text-sm font-bold uppercase tracking-wider text-sky2-500 mb-4">
          {{ t('games.trainRobot.testItem', { current: testIndex + 1, total: testItems.length }) }}
        </p>

        <div class="text-8xl mb-6">{{ currentTestItem.emoji }}</div>

        <div v-if="!prediction" class="mb-2">
          <GlassButton variant="primary" size="lg" @click="predict">
            {{ t('games.trainRobot.askRobot') }}
          </GlassButton>
        </div>

        <Transition name="fade">
          <div v-if="prediction">
            <p class="text-lg text-ink mb-3">
              {{ t('games.trainRobot.robotSays') }}
              <span class="font-display font-bold">
                {{ predictionCategory ? `${predictionCategory.emoji} ${t(`games.trainRobot.categories.${predictionCategory.id}`)}` : '…' }}
              </span>
            </p>
            <p
              class="text-lg font-bold mb-6"
              :class="predictionCorrect ? 'text-mint-500' : 'text-coral-500'"
            >
              {{ predictionCorrect ? t('games.trainRobot.robotRight') : t('games.trainRobot.robotWrong') }}
            </p>
            <GlassButton variant="primary" @click="nextTest">
              {{ testIndex < testItems.length - 1 ? t('games.trainRobot.next') : t('games.trainRobot.results') }}
            </GlassButton>
          </div>
        </Transition>
      </div>

      <!-- ===== FASE 3: RISULTATI E LEZIONE ===== -->
      <div v-else class="card w-full p-8 text-center animate-pop-in">
        <img :src="glimmy" alt="Glimmy" class="w-24 h-24 mx-auto mb-4 animate-float" />
        <h3 class="font-display text-3xl font-bold text-ink mb-2">
          {{ t('games.trainRobot.finished', { score: testScore, total: testItems.length }) }}
        </h3>
        <p class="text-ink-soft mb-3 max-w-md mx-auto">
          {{ trainedAll ? t('games.trainRobot.lessonFull') : t('games.trainRobot.lessonPartial') }}
        </p>
        <p class="text-sm text-ink-faint mb-6 max-w-md mx-auto">
          💡 {{ t('games.trainRobot.lessonCore') }}
        </p>
        <div class="flex gap-3 justify-center flex-wrap">
          <GlassButton variant="primary" @click="restart">
            {{ t('games.trainRobot.playAgain') }}
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
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import AnimatedBackground from '../../components/AnimatedBackground.vue'
import AppIcon from '../../components/AppIcon.vue'
import GlassButton from '../../components/GlassButton.vue'
import { useProgress } from '../../composables/useProgress'
import { useSound } from '../../composables/useSound'
import { useGlimmy } from '../../composables/useGlimmy'

const { t } = useI18n()
const { recordGameComplete } = useProgress()
const { playClick, playCorrect, playWrong, playFanfare } = useSound()
const { react, say } = useGlimmy()

const glimmy = new URL('../../assets/images/glimmy.png', import.meta.url).href

/* Ogni round ha 2 categorie: 3 esempi di training e 2 di test ciascuna.
   Il robot impara SOLO dalle etichette del bambino: se insegni male, sbaglia. */
interface Category { id: string; emoji: string }
interface Item { emoji: string; category: string }
interface Round { categories: [Category, Category]; train: Item[]; test: Item[] }

const rounds: Round[] = [
  {
    categories: [
      { id: 'flies', emoji: '🌤️' },
      { id: 'swims', emoji: '🌊' }
    ],
    train: [
      { emoji: '🦅', category: 'flies' },
      { emoji: '🐟', category: 'swims' },
      { emoji: '✈️', category: 'flies' },
      { emoji: '🐳', category: 'swims' },
      { emoji: '🦋', category: 'flies' },
      { emoji: '🐙', category: 'swims' }
    ],
    test: [
      { emoji: '🦜', category: 'flies' },
      { emoji: '🦈', category: 'swims' },
      { emoji: '🚁', category: 'flies' },
      { emoji: '🐬', category: 'swims' }
    ]
  },
  {
    categories: [
      { id: 'fruit', emoji: '🧺' },
      { id: 'animals', emoji: '🏡' }
    ],
    train: [
      { emoji: '🍎', category: 'fruit' },
      { emoji: '🐶', category: 'animals' },
      { emoji: '🍌', category: 'fruit' },
      { emoji: '🐱', category: 'animals' },
      { emoji: '🍓', category: 'fruit' },
      { emoji: '🐭', category: 'animals' }
    ],
    test: [
      { emoji: '🍊', category: 'fruit' },
      { emoji: '🐰', category: 'animals' },
      { emoji: '🍇', category: 'fruit' },
      { emoji: '🦊', category: 'animals' }
    ]
  },
  {
    categories: [
      { id: 'hot', emoji: '🔥' },
      { id: 'cold', emoji: '🧊' }
    ],
    train: [
      { emoji: '☀️', category: 'hot' },
      { emoji: '❄️', category: 'cold' },
      { emoji: '🌶️', category: 'hot' },
      { emoji: '⛄', category: 'cold' },
      { emoji: '🌋', category: 'hot' },
      { emoji: '🍦', category: 'cold' }
    ],
    test: [
      { emoji: '🏜️', category: 'hot' },
      { emoji: '🧤', category: 'cold' },
      { emoji: '♨️', category: 'hot' },
      { emoji: '🏔️', category: 'cold' }
    ]
  }
]

const roundIndex = ref(Math.floor(Math.random() * rounds.length))
const round = computed(() => rounds[roundIndex.value])

type Phase = 'train' | 'test' | 'done'
const phase = ref<Phase>('train')

/* Addestramento */
const trainIndex = ref(0)
const trainItems = computed(() => round.value.train)
const currentTrainItem = computed(() => trainItems.value[trainIndex.value])
// Etichette date dal bambino: emoji dell'oggetto → categoria scelta
const labels = ref<Record<string, string>>({})

function labeledCount(categoryId: string): number {
  return Object.values(labels.value).filter(c => c === categoryId).length
}

const trainedAll = computed(() => Object.keys(labels.value).length >= trainItems.value.length)

function labelItem(categoryId: string) {
  playClick()
  labels.value[currentTrainItem.value.emoji] = categoryId
  if (trainIndex.value < trainItems.value.length - 1) {
    trainIndex.value++
  } else {
    startTest()
  }
}

/* Test: il robot classifica da solo usando solo ciò che gli è stato insegnato */
const testIndex = ref(0)
const testItems = computed(() => round.value.test)
const currentTestItem = computed(() => testItems.value[testIndex.value])
const prediction = ref<string | null>(null)
const robotThinking = ref(false)
const testScore = ref(0)
const startTime = ref(Date.now())

const predictionCategory = computed(() =>
  round.value.categories.find(c => c.id === prediction.value) || null
)
const predictionCorrect = computed(() => prediction.value === currentTestItem.value.category)

function startTest() {
  playClick()
  phase.value = 'test'
  say(t('glimmy.robotTesting'), { mood: 'thinking', durationMs: 3000 })
}

/* Voto di maggioranza sulle etichette date agli esempi della vera categoria
   dell'oggetto: con poche o sbagliate etichette il robot sbaglia. */
function robotGuess(item: Item): string {
  const votes: Record<string, number> = {}
  for (const trainItem of trainItems.value) {
    if (trainItem.category !== item.category) continue
    const given = labels.value[trainItem.emoji]
    if (given) votes[given] = (votes[given] || 0) + 1
  }
  const entries = Object.entries(votes)
  if (entries.length === 0) {
    // Nessun esempio: il robot tira a indovinare
    const cats = round.value.categories
    return cats[Math.floor(Math.random() * cats.length)].id
  }
  entries.sort((a, b) => b[1] - a[1])
  return entries[0][0]
}

function predict() {
  robotThinking.value = true
  playClick()
  setTimeout(() => {
    robotThinking.value = false
    prediction.value = robotGuess(currentTestItem.value)
    if (predictionCorrect.value) {
      testScore.value++
      playCorrect()
      react('happy', 1500)
    } else {
      playWrong()
      react('sad', 1500)
    }
  }, 1100)
}

function nextTest() {
  if (testIndex.value < testItems.value.length - 1) {
    testIndex.value++
    prediction.value = null
  } else {
    finish()
  }
}

function finish() {
  phase.value = 'done'
  const durationSec = Math.round((Date.now() - startTime.value) / 1000)
  recordGameComplete('train-robot', {
    score: testScore.value,
    maxScore: testItems.value.length,
    durationSec
  })
  if (testScore.value === testItems.value.length) {
    playFanfare()
    react('celebrate', 3000)
  }
}

function restart() {
  roundIndex.value = (roundIndex.value + 1) % rounds.length
  phase.value = 'train'
  trainIndex.value = 0
  labels.value = {}
  testIndex.value = 0
  prediction.value = null
  testScore.value = 0
  startTime.value = Date.now()
}
</script>

<style scoped>
.robot-stage {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 6.5rem;
  height: 6.5rem;
  border-radius: 50%;
  background: #ffffff;
  color: #4e9de0;
  border: 1px solid rgba(43, 45, 66, 0.06);
  box-shadow: 0 1px 2px rgba(43, 45, 66, 0.04), 0 12px 32px -10px rgba(43, 45, 66, 0.18);
  animation: float 3.5s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.robot-stage.thinking {
  color: #f7b32b;
}

.thinking-dots {
  position: absolute;
  top: -0.6rem;
  right: -1.2rem;
  display: flex;
  gap: 0.25rem;
}

.thinking-dots i {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: #f7b32b;
  animation: dot-bounce 1s ease-in-out infinite;
}

.thinking-dots i:nth-child(2) { animation-delay: 0.15s; }
.thinking-dots i:nth-child(3) { animation-delay: 0.3s; }

@keyframes dot-bounce {
  0%, 100% { transform: translateY(0); opacity: 0.4; }
  50% { transform: translateY(-5px); opacity: 1; }
}

.category-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.25rem 1rem;
  border-radius: 1.25rem;
  color: #2b2d42;
  background: #fbf8f2;
  border: 1.5px solid rgba(43, 45, 66, 0.08);
  cursor: pointer;
  transition: all 0.2s ease;
}

.category-btn:hover {
  border-color: rgba(247, 179, 43, 0.6);
  background: #fff8e6;
  transform: translateY(-3px);
}

.knowledge-dot {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background: rgba(43, 45, 66, 0.1);
  transition: background 0.3s ease, transform 0.3s ease;
}

.knowledge-dot.filled {
  background: #3fbf8f;
  transform: scale(1.15);
}

.fade-enter-active { transition: opacity 0.35s ease; }
.fade-enter-from { opacity: 0; }
</style>
