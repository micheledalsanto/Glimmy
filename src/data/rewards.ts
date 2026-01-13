// Rewards data structure
export interface Badge {
  id: string
  name: string
  description: string
  emoji: string
  condition: {
    type: 'game_complete' | 'streak' | 'perfect_score' | 'explore' | 'collection' | 'time' | 'count'
    target?: string // game name or section
    count?: number
  }
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

export interface RewardData {
  [locale: string]: Badge[]
}

export interface UserProgress {
  unlockedBadges: string[]
  gameStats: Record<string, {
    completions: number
    bestScore: number
    lastPlayed: string
    startTime?: number
  }>
  streakDays: number
  lastVisit: string
  totalPoints: number
  sectionsVisited: string[]
  totalGamesPlayed: number
}

// Italian badges
const italianBadges: Badge[] = [
  {
    id: 'first-steps',
    name: 'Primi Passi',
    description: 'Completa il tuo primo gioco',
    emoji: '🐣',
    condition: { type: 'count', count: 1 },
    rarity: 'common'
  },
  {
    id: 'memory-master',
    name: 'Maestro della Memoria',
    description: 'Completa il gioco Memory 5 volte',
    emoji: '🧩',
    condition: { type: 'game_complete', target: 'memory', count: 5 },
    rarity: 'rare'
  },
  {
    id: 'quiz-champion',
    name: 'Campione del Quiz',
    description: 'Ottieni un punteggio perfetto nel Quiz',
    emoji: '🧠',
    condition: { type: 'perfect_score', target: 'quiz' },
    rarity: 'rare'
  },
  {
    id: 'word-wizard',
    name: 'Mago delle Parole',
    description: 'Completa 3 set di frasi',
    emoji: '✨',
    condition: { type: 'game_complete', target: 'complete-phrase', count: 3 },
    rarity: 'common'
  },
  {
    id: 'ai-explorer',
    name: 'Esploratore AI',
    description: 'Visita tutte le sezioni',
    emoji: '🔍',
    condition: { type: 'explore', count: 6 },
    rarity: 'common'
  },
  {
    id: 'guess-guru',
    name: 'Guru dell\'Indovina',
    description: 'Indovina correttamente 20 oggetti',
    emoji: '🎯',
    condition: { type: 'collection', target: 'guess', count: 20 },
    rarity: 'rare'
  },
  {
    id: 'avid-reader',
    name: 'Lettore Appassionato',
    description: 'Leggi tutte le 5 storie',
    emoji: '📚',
    condition: { type: 'collection', target: 'stories', count: 5 },
    rarity: 'rare'
  },
  {
    id: 'glossary-graduate',
    name: 'Diplomato del Glossario',
    description: 'Visualizza tutti i 20 termini',
    emoji: '🎓',
    condition: { type: 'collection', target: 'glossary', count: 20 },
    rarity: 'common'
  },
  {
    id: 'perfect-week',
    name: 'Settimana Perfetta',
    description: 'Gioca per 7 giorni consecutivi',
    emoji: '🌟',
    condition: { type: 'streak', count: 7 },
    rarity: 'epic'
  },
  {
    id: 'speed-runner',
    name: 'Velocista',
    description: 'Completa un gioco in meno di 2 minuti',
    emoji: '⚡',
    condition: { type: 'time', count: 120 },
    rarity: 'epic'
  },
  {
    id: 'completionist',
    name: 'Completista',
    description: 'Sblocca tutti gli altri 14 badge',
    emoji: '🏆',
    condition: { type: 'collection', target: 'badges', count: 14 },
    rarity: 'legendary'
  },
  {
    id: 'early-bird',
    name: 'Mattiniero',
    description: 'Gioca prima delle 9:00',
    emoji: '🌅',
    condition: { type: 'time', target: 'morning' },
    rarity: 'common'
  },
  {
    id: 'night-owl',
    name: 'Gufo Notturno',
    description: 'Gioca dopo le 20:00',
    emoji: '🦉',
    condition: { type: 'time', target: 'night' },
    rarity: 'common'
  },
  {
    id: 'prompt-pro',
    name: 'Pro dei Prompt',
    description: 'Prova 10 prompt AI diversi',
    emoji: '💬',
    condition: { type: 'count', target: 'prompts', count: 10 },
    rarity: 'rare'
  },
  {
    id: 'glimmy-friend',
    name: 'Amico di Glimmy',
    description: 'Gioca 20 volte in totale',
    emoji: '💙',
    condition: { type: 'count', count: 20 },
    rarity: 'epic'
  }
]

// English badges
const englishBadges: Badge[] = [
  {
    id: 'first-steps',
    name: 'First Steps',
    description: 'Complete your first game',
    emoji: '🐣',
    condition: { type: 'count', count: 1 },
    rarity: 'common'
  },
  {
    id: 'memory-master',
    name: 'Memory Master',
    description: 'Complete Memory game 5 times',
    emoji: '🧩',
    condition: { type: 'game_complete', target: 'memory', count: 5 },
    rarity: 'rare'
  },
  {
    id: 'quiz-champion',
    name: 'Quiz Champion',
    description: 'Get a perfect score in Quiz',
    emoji: '🧠',
    condition: { type: 'perfect_score', target: 'quiz' },
    rarity: 'rare'
  },
  {
    id: 'word-wizard',
    name: 'Word Wizard',
    description: 'Complete 3 phrase sets',
    emoji: '✨',
    condition: { type: 'game_complete', target: 'complete-phrase', count: 3 },
    rarity: 'common'
  },
  {
    id: 'ai-explorer',
    name: 'AI Explorer',
    description: 'Visit all sections',
    emoji: '🔍',
    condition: { type: 'explore', count: 6 },
    rarity: 'common'
  },
  {
    id: 'guess-guru',
    name: 'Guess Guru',
    description: 'Correctly guess 20 objects',
    emoji: '🎯',
    condition: { type: 'collection', target: 'guess', count: 20 },
    rarity: 'rare'
  },
  {
    id: 'avid-reader',
    name: 'Avid Reader',
    description: 'Read all 5 stories',
    emoji: '📚',
    condition: { type: 'collection', target: 'stories', count: 5 },
    rarity: 'rare'
  },
  {
    id: 'glossary-graduate',
    name: 'Glossary Graduate',
    description: 'View all 20 terms',
    emoji: '🎓',
    condition: { type: 'collection', target: 'glossary', count: 20 },
    rarity: 'common'
  },
  {
    id: 'perfect-week',
    name: 'Perfect Week',
    description: 'Play for 7 consecutive days',
    emoji: '🌟',
    condition: { type: 'streak', count: 7 },
    rarity: 'epic'
  },
  {
    id: 'speed-runner',
    name: 'Speed Runner',
    description: 'Complete a game in under 2 minutes',
    emoji: '⚡',
    condition: { type: 'time', count: 120 },
    rarity: 'epic'
  },
  {
    id: 'completionist',
    name: 'Completionist',
    description: 'Unlock all other 14 badges',
    emoji: '🏆',
    condition: { type: 'collection', target: 'badges', count: 14 },
    rarity: 'legendary'
  },
  {
    id: 'early-bird',
    name: 'Early Bird',
    description: 'Play before 9:00 AM',
    emoji: '🌅',
    condition: { type: 'time', target: 'morning' },
    rarity: 'common'
  },
  {
    id: 'night-owl',
    name: 'Night Owl',
    description: 'Play after 8:00 PM',
    emoji: '🦉',
    condition: { type: 'time', target: 'night' },
    rarity: 'common'
  },
  {
    id: 'prompt-pro',
    name: 'Prompt Pro',
    description: 'Try 10 different AI prompts',
    emoji: '💬',
    condition: { type: 'count', target: 'prompts', count: 10 },
    rarity: 'rare'
  },
  {
    id: 'glimmy-friend',
    name: 'Glimmy\'s Friend',
    description: 'Play 20 times total',
    emoji: '💙',
    condition: { type: 'count', count: 20 },
    rarity: 'epic'
  }
]

// Spanish badges
const spanishBadges: Badge[] = [
  {
    id: 'first-steps',
    name: 'Primeros Pasos',
    description: 'Completa tu primer juego',
    emoji: '🐣',
    condition: { type: 'count', count: 1 },
    rarity: 'common'
  },
  {
    id: 'memory-master',
    name: 'Maestro de la Memoria',
    description: 'Completa el juego Memory 5 veces',
    emoji: '🧩',
    condition: { type: 'game_complete', target: 'memory', count: 5 },
    rarity: 'rare'
  },
  {
    id: 'quiz-champion',
    name: 'Campeón del Quiz',
    description: 'Obtén puntaje perfecto en el Quiz',
    emoji: '🧠',
    condition: { type: 'perfect_score', target: 'quiz' },
    rarity: 'rare'
  },
  {
    id: 'word-wizard',
    name: 'Mago de las Palabras',
    description: 'Completa 3 sets de frases',
    emoji: '✨',
    condition: { type: 'game_complete', target: 'complete-phrase', count: 3 },
    rarity: 'common'
  },
  {
    id: 'ai-explorer',
    name: 'Explorador de IA',
    description: 'Visita todas las secciones',
    emoji: '🔍',
    condition: { type: 'explore', count: 6 },
    rarity: 'common'
  },
  {
    id: 'guess-guru',
    name: 'Gurú de Adivinar',
    description: 'Adivina correctamente 20 objetos',
    emoji: '🎯',
    condition: { type: 'collection', target: 'guess', count: 20 },
    rarity: 'rare'
  },
  {
    id: 'avid-reader',
    name: 'Lector Apasionado',
    description: 'Lee todas las 5 historias',
    emoji: '📚',
    condition: { type: 'collection', target: 'stories', count: 5 },
    rarity: 'rare'
  },
  {
    id: 'glossary-graduate',
    name: 'Graduado del Glosario',
    description: 'Visualiza todos los 20 términos',
    emoji: '🎓',
    condition: { type: 'collection', target: 'glossary', count: 20 },
    rarity: 'common'
  },
  {
    id: 'perfect-week',
    name: 'Semana Perfecta',
    description: 'Juega durante 7 días consecutivos',
    emoji: '🌟',
    condition: { type: 'streak', count: 7 },
    rarity: 'epic'
  },
  {
    id: 'speed-runner',
    name: 'Velocista',
    description: 'Completa un juego en menos de 2 minutos',
    emoji: '⚡',
    condition: { type: 'time', count: 120 },
    rarity: 'epic'
  },
  {
    id: 'completionist',
    name: 'Completista',
    description: 'Desbloquea los otros 14 badges',
    emoji: '🏆',
    condition: { type: 'collection', target: 'badges', count: 14 },
    rarity: 'legendary'
  },
  {
    id: 'early-bird',
    name: 'Madrugador',
    description: 'Juega antes de las 9:00',
    emoji: '🌅',
    condition: { type: 'time', target: 'morning' },
    rarity: 'common'
  },
  {
    id: 'night-owl',
    name: 'Búho Nocturno',
    description: 'Juega después de las 20:00',
    emoji: '🦉',
    condition: { type: 'time', target: 'night' },
    rarity: 'common'
  },
  {
    id: 'prompt-pro',
    name: 'Pro de los Prompts',
    description: 'Prueba 10 prompts de IA diferentes',
    emoji: '💬',
    condition: { type: 'count', target: 'prompts', count: 10 },
    rarity: 'rare'
  },
  {
    id: 'glimmy-friend',
    name: 'Amigo de Glimmy',
    description: 'Juega 20 veces en total',
    emoji: '💙',
    condition: { type: 'count', count: 20 },
    rarity: 'epic'
  }
]

export const rewardsData: RewardData = {
  it: italianBadges,
  en: englishBadges,
  es: spanishBadges
}

// Helper functions for progress tracking
export const initializeUserProgress = (): UserProgress => ({
  unlockedBadges: [],
  gameStats: {},
  streakDays: 0,
  lastVisit: new Date().toISOString().split('T')[0],
  totalPoints: 0,
  sectionsVisited: [],
  totalGamesPlayed: 0
})

export const calculatePoints = (rarity: string): number => {
  switch (rarity) {
    case 'common': return 20
    case 'rare': return 50
    case 'epic': return 100
    case 'legendary': return 500
    default: return 10
  }
}
