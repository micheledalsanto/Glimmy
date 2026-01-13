// Glossary data structure
export interface GlossaryTerm {
  id: string
  term: string
  definition: string
  example: string
  emoji: string
  category: 'basics' | 'concepts' | 'applications'
  difficulty: 'beginner' | 'intermediate'
}

export interface GlossaryData {
  [locale: string]: GlossaryTerm[]
}

// Italian terms - Simplified for kids 5-10 years
const italianTerms: GlossaryTerm[] = [
  {
    id: 'glimmy',
    term: 'Glimmy',
    definition: 'Un robot amico che vive nel computer',
    example: 'Glimmy è una stellina robotica che adora giocare e imparare!',
    emoji: '✨',
    category: 'basics',
    difficulty: 'beginner'
  },
  {
    id: 'robot',
    term: 'Robot',
    definition: 'Una macchina speciale che può fare cose da sola',
    example: 'I robot possono muoversi, parlare e aiutarci!',
    emoji: '🤖',
    category: 'basics',
    difficulty: 'beginner'
  },
  {
    id: 'computer',
    term: 'Computer',
    definition: 'La casa magica dove vive Glimmy',
    example: 'I computer sono molto veloci e possono ricordare tantissime cose',
    emoji: '💻',
    category: 'basics',
    difficulty: 'beginner'
  },
  {
    id: 'data',
    term: 'Dati',
    definition: 'Le cose che i robot usano per imparare',
    example: 'I dati sono come i libri che Glimmy legge per diventare più furbo',
    emoji: '📚',
    category: 'basics',
    difficulty: 'beginner'
  },
  {
    id: 'learning',
    term: 'Imparare',
    definition: 'Quando diventi più bravo facendo pratica',
    example: 'Glimmy impara giocando, proprio come te!',
    emoji: '🎮',
    category: 'concepts',
    difficulty: 'beginner'
  },
  {
    id: 'energy',
    term: 'Energia',
    definition: 'Il cibo dei robot',
    example: 'I robot mangiano elettricità invece di pizza!',
    emoji: '⚡',
    category: 'basics',
    difficulty: 'beginner'
  },
  {
    id: 'camera',
    term: 'Telecamera',
    definition: 'Gli occhi dei robot',
    example: 'I robot usano telecamere per vedere il mondo',
    emoji: '📷',
    category: 'applications',
    difficulty: 'beginner'
  },
  {
    id: 'voice',
    term: 'Parlare',
    definition: 'Quando i robot capiscono la tua voce',
    example: 'Puoi parlare con Glimmy e lui ti capisce!',
    emoji: '🎤',
    category: 'applications',
    difficulty: 'beginner'
  },
  {
    id: 'game',
    term: 'Giochi',
    definition: 'Modi divertenti per imparare cose nuove',
    example: 'Glimmy adora giocare a memory e quiz!',
    emoji: '🎲',
    category: 'applications',
    difficulty: 'beginner'
  },
  {
    id: 'smart',
    term: 'Intelligente',
    definition: 'Quando sai rispondere a tante domande',
    example: 'Glimmy è intelligente perché ha imparato tanto!',
    emoji: '🧠',
    category: 'concepts',
    difficulty: 'beginner'
  }
]

// English terms - Simplified for kids 5-10 years
const englishTerms: GlossaryTerm[] = [
  {
    id: 'glimmy',
    term: 'Glimmy',
    definition: 'A friendly robot that lives in the computer',
    example: 'Glimmy is a little star robot who loves to play and learn!',
    emoji: '✨',
    category: 'basics',
    difficulty: 'beginner'
  },
  {
    id: 'robot',
    term: 'Robot',
    definition: 'A special machine that can do things by itself',
    example: 'Robots can move, talk and help us!',
    emoji: '🤖',
    category: 'basics',
    difficulty: 'beginner'
  },
  {
    id: 'computer',
    term: 'Computer',
    definition: 'The magic house where Glimmy lives',
    example: 'Computers are very fast and can remember so many things',
    emoji: '💻',
    category: 'basics',
    difficulty: 'beginner'
  },
  {
    id: 'data',
    term: 'Data',
    definition: 'Things that robots use to learn',
    example: 'Data is like the books that Glimmy reads to get smarter',
    emoji: '📚',
    category: 'basics',
    difficulty: 'beginner'
  },
  {
    id: 'learning',
    term: 'Learning',
    definition: 'When you get better by practicing',
    example: 'Glimmy learns by playing, just like you!',
    emoji: '🎮',
    category: 'concepts',
    difficulty: 'beginner'
  },
  {
    id: 'energy',
    term: 'Energy',
    definition: 'The food that robots eat',
    example: 'Robots eat electricity instead of pizza!',
    emoji: '⚡',
    category: 'basics',
    difficulty: 'beginner'
  },
  {
    id: 'camera',
    term: 'Camera',
    definition: 'The eyes of robots',
    example: 'Robots use cameras to see the world',
    emoji: '📷',
    category: 'applications',
    difficulty: 'beginner'
  },
  {
    id: 'voice',
    term: 'Talking',
    definition: 'When robots understand your voice',
    example: 'You can talk to Glimmy and he understands you!',
    emoji: '🎤',
    category: 'applications',
    difficulty: 'beginner'
  },
  {
    id: 'game',
    term: 'Games',
    definition: 'Fun ways to learn new things',
    example: 'Glimmy loves to play memory and quiz!',
    emoji: '🎲',
    category: 'applications',
    difficulty: 'beginner'
  },
  {
    id: 'smart',
    term: 'Smart',
    definition: 'When you know answers to many questions',
    example: 'Glimmy is smart because he learned a lot!',
    emoji: '🧠',
    category: 'concepts',
    difficulty: 'beginner'
  }
]

// Spanish terms - Simplified for kids 5-10 years
const spanishTerms: GlossaryTerm[] = [
  {
    id: 'glimmy',
    term: 'Glimmy',
    definition: 'Un robot amigo que vive en la computadora',
    example: '¡Glimmy es una estrellita robot que adora jugar y aprender!',
    emoji: '✨',
    category: 'basics',
    difficulty: 'beginner'
  },
  {
    id: 'robot',
    term: 'Robot',
    definition: 'Una máquina especial que puede hacer cosas sola',
    example: '¡Los robots pueden moverse, hablar y ayudarnos!',
    emoji: '🤖',
    category: 'basics',
    difficulty: 'beginner'
  },
  {
    id: 'computer',
    term: 'Computadora',
    definition: 'La casa mágica donde vive Glimmy',
    example: 'Las computadoras son muy rápidas y pueden recordar muchísimas cosas',
    emoji: '💻',
    category: 'basics',
    difficulty: 'beginner'
  },
  {
    id: 'data',
    term: 'Datos',
    definition: 'Cosas que los robots usan para aprender',
    example: 'Los datos son como los libros que Glimmy lee para volverse más listo',
    emoji: '📚',
    category: 'basics',
    difficulty: 'beginner'
  },
  {
    id: 'learning',
    term: 'Aprender',
    definition: 'Cuando te vuelves mejor practicando',
    example: '¡Glimmy aprende jugando, igual que tú!',
    emoji: '🎮',
    category: 'concepts',
    difficulty: 'beginner'
  },
  {
    id: 'energy',
    term: 'Energía',
    definition: 'La comida de los robots',
    example: '¡Los robots comen electricidad en lugar de pizza!',
    emoji: '⚡',
    category: 'basics',
    difficulty: 'beginner'
  },
  {
    id: 'camera',
    term: 'Cámara',
    definition: 'Los ojos de los robots',
    example: 'Los robots usan cámaras para ver el mundo',
    emoji: '📷',
    category: 'applications',
    difficulty: 'beginner'
  },
  {
    id: 'voice',
    term: 'Hablar',
    definition: 'Cuando los robots entienden tu voz',
    example: '¡Puedes hablar con Glimmy y él te entiende!',
    emoji: '🎤',
    category: 'applications',
    difficulty: 'beginner'
  },
  {
    id: 'game',
    term: 'Juegos',
    definition: 'Formas divertidas de aprender cosas nuevas',
    example: '¡A Glimmy le encanta jugar memory y quiz!',
    emoji: '🎲',
    category: 'applications',
    difficulty: 'beginner'
  },
  {
    id: 'smart',
    term: 'Inteligente',
    definition: 'Cuando sabes respuestas a muchas preguntas',
    example: '¡Glimmy es inteligente porque aprendió mucho!',
    emoji: '🧠',
    category: 'concepts',
    difficulty: 'beginner'
  }
]

export const glossaryData: GlossaryData = {
  it: italianTerms,
  en: englishTerms,
  es: spanishTerms
}
