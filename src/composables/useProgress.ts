import { reactive, readonly, ref } from 'vue'
import { rewardsData, calculatePoints, type Badge, type UserProgress } from '../data/rewards'

const STORAGE_KEY = 'glimmy-user-progress'

/* Stato esteso rispetto a UserProgress: collezioni per-target (storie lette,
   termini visti, oggetti indovinati, prompt provati) come insiemi di id unici. */
export interface ProgressState extends UserProgress {
  collections: Record<string, string[]>
}

const defaultState = (): ProgressState => ({
  unlockedBadges: [],
  gameStats: {},
  streakDays: 0,
  lastVisit: today(),
  totalPoints: 0,
  sectionsVisited: [],
  totalGamesPlayed: 0,
  collections: {}
})

function today(): string {
  return new Date().toISOString().split('T')[0]
}

function load(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return { ...defaultState(), ...parsed, collections: parsed.collections || {} }
    }
  } catch (e) {
    console.error('Failed to load progress:', e)
  }
  return defaultState()
}

const state = reactive<ProgressState>(load())

/* Coda dei badge appena sbloccati, consumata dal toast globale */
const newlyUnlocked = ref<Badge[]>([])

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (e) {
    console.error('Failed to save progress:', e)
  }
}

function updateStreak() {
  const now = today()
  if (state.lastVisit === now) return
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  state.streakDays = state.lastVisit === yesterday ? state.streakDays + 1 : 1
  state.lastVisit = now
}

function checkBadges(context: { game?: string; score?: number; maxScore?: number; durationSec?: number }) {
  // I badge sono definiti per locale ma id e condizioni coincidono: usiamo 'it' come riferimento
  const badges = rewardsData.it
  const hour = new Date().getHours()

  for (const badge of badges) {
    if (state.unlockedBadges.includes(badge.id)) continue

    const c = badge.condition
    let unlocked = false

    switch (c.type) {
      case 'count':
        if (c.target === 'prompts') {
          unlocked = (state.collections['prompts']?.length || 0) >= (c.count || 1)
        } else {
          unlocked = state.totalGamesPlayed >= (c.count || 1)
        }
        break
      case 'game_complete':
        unlocked = (state.gameStats[c.target || '']?.completions || 0) >= (c.count || 1)
        break
      case 'perfect_score':
        unlocked =
          context.game === c.target &&
          context.score !== undefined &&
          context.maxScore !== undefined &&
          context.maxScore > 0 &&
          context.score === context.maxScore
        break
      case 'explore':
        unlocked = state.sectionsVisited.length >= (c.count || 1)
        break
      case 'collection':
        if (c.target === 'badges') {
          unlocked = state.unlockedBadges.length >= (c.count || 1)
        } else {
          unlocked = (state.collections[c.target || '']?.length || 0) >= (c.count || 1)
        }
        break
      case 'streak':
        unlocked = state.streakDays >= (c.count || 1)
        break
      case 'time':
        if (c.target === 'morning') {
          unlocked = context.game !== undefined && hour < 9
        } else if (c.target === 'night') {
          unlocked = context.game !== undefined && hour >= 20
        } else if (c.count) {
          unlocked = context.durationSec !== undefined && context.durationSec < c.count
        }
        break
    }

    if (unlocked) {
      state.unlockedBadges.push(badge.id)
      state.totalPoints += calculatePoints(badge.rarity)
      newlyUnlocked.value.push(badge)
    }
  }
}

/** Registra il completamento di un gioco e sblocca i badge maturati. */
function recordGameComplete(
  game: string,
  opts: { score?: number; maxScore?: number; durationSec?: number } = {}
) {
  updateStreak()
  const stats = state.gameStats[game] || { completions: 0, bestScore: 0, lastPlayed: today() }
  stats.completions += 1
  stats.lastPlayed = today()
  if (opts.score !== undefined && opts.score > stats.bestScore) stats.bestScore = opts.score
  state.gameStats[game] = stats
  state.totalGamesPlayed += 1
  state.totalPoints += 10 + (opts.score || 0)
  checkBadges({ game, ...opts })
  save()
}

/** Registra la visita a una sezione (menu, giochi, glossario, storie, premi, prompt). */
function recordSectionVisit(section: string) {
  updateStreak()
  if (!state.sectionsVisited.includes(section)) {
    state.sectionsVisited.push(section)
  }
  checkBadges({})
  save()
}

/** Aggiunge un elemento unico a una collezione (es. storia letta, termine visto). */
function recordCollectionItem(target: string, itemId: string) {
  const list = state.collections[target] || []
  if (!list.includes(itemId)) {
    list.push(itemId)
    state.collections[target] = list
    checkBadges({})
    save()
  }
}

/** Estrae e svuota la coda dei badge appena sbloccati. */
function consumeNewBadges(): Badge[] {
  const out = newlyUnlocked.value
  newlyUnlocked.value = []
  return out
}

export function useProgress() {
  return {
    progress: readonly(state),
    newlyUnlocked,
    recordGameComplete,
    recordSectionVisit,
    recordCollectionItem,
    consumeNewBadges
  }
}
