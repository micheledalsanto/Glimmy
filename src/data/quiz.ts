// Quiz data structure
export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctIndex: number
  emoji: string
}

export interface QuizData {
  [locale: string]: QuizQuestion[]
}

// Italian questions - Simplified for kids 5-10 years
const italianQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Glimmy è un...',
    options: ['Robot amico', 'Dinosauro', 'Alieno verde'],
    correctIndex: 0,
    emoji: '🤖'
  },
  {
    id: 2,
    question: 'Cosa mangiano i robot come Glimmy?',
    options: ['Pizza', 'Energia elettrica', 'Gelato'],
    correctIndex: 1,
    emoji: '⚡'
  },
  {
    id: 3,
    question: 'Glimmy può imparare cose nuove?',
    options: ['Sì, sempre!', 'No, mai', 'Solo il lunedì'],
    correctIndex: 0,
    emoji: '📚'
  },
  {
    id: 4,
    question: 'Come si chiama il cervello di un robot?',
    options: ['Pancia', 'Computer', 'Cuore'],
    correctIndex: 1,
    emoji: '🧠'
  },
  {
    id: 5,
    question: 'I robot possono essere nostri amici?',
    options: ['Sì!', 'No', 'Solo se piove'],
    correctIndex: 0,
    emoji: '❤️'
  },
  {
    id: 6,
    question: 'Cosa usano i robot per vedere?',
    options: ['Occhiali da sole', 'Telecamere', 'Binocolo'],
    correctIndex: 1,
    emoji: '👀'
  },
  {
    id: 7,
    question: 'Glimmy può aiutarci a...',
    options: ['Imparare giocando', 'Volare', 'Diventare giganti'],
    correctIndex: 0,
    emoji: '🎮'
  },
  {
    id: 8,
    question: 'Dove vive Glimmy?',
    options: ['In una casa', 'Nel computer', 'Sulla luna'],
    correctIndex: 1,
    emoji: '💻'
  },
  {
    id: 9,
    question: 'Cosa fa Glimmy quando è felice?',
    options: ['Dorme', 'Brilla e sorride', 'Piange'],
    correctIndex: 1,
    emoji: '✨'
  },
  {
    id: 10,
    question: 'I robot possono giocare con noi?',
    options: ['Sì, adorano giocare!', 'No', 'Solo di notte'],
    correctIndex: 0,
    emoji: '🎲'
  },
  {
    id: 11,
    question: 'Cosa piace fare a Glimmy?',
    options: ['Risolvere enigmi', 'Dormire tutto il giorno', 'Mangiare caramelle'],
    correctIndex: 0,
    emoji: '🧩'
  },
  {
    id: 12,
    question: 'Glimmy può parlare con noi?',
    options: ['Sì, come un amico!', 'No, è muto', 'Solo in inglese'],
    correctIndex: 0,
    emoji: '💬'
  }
]

// English questions - Simplified for kids 5-10 years
const englishQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Glimmy is a...',
    options: ['Friendly robot', 'Dinosaur', 'Green alien'],
    correctIndex: 0,
    emoji: '🤖'
  },
  {
    id: 2,
    question: 'What do robots like Glimmy eat?',
    options: ['Pizza', 'Electric energy', 'Ice cream'],
    correctIndex: 1,
    emoji: '⚡'
  },
  {
    id: 3,
    question: 'Can Glimmy learn new things?',
    options: ['Yes, always!', 'No, never', 'Only on Mondays'],
    correctIndex: 0,
    emoji: '📚'
  },
  {
    id: 4,
    question: "What's a robot's brain called?",
    options: ['Belly', 'Computer', 'Heart'],
    correctIndex: 1,
    emoji: '🧠'
  },
  {
    id: 5,
    question: 'Can robots be our friends?',
    options: ['Yes!', 'No', 'Only when it rains'],
    correctIndex: 0,
    emoji: '❤️'
  },
  {
    id: 6,
    question: 'What do robots use to see?',
    options: ['Sunglasses', 'Cameras', 'Binoculars'],
    correctIndex: 1,
    emoji: '👀'
  },
  {
    id: 7,
    question: 'Glimmy can help us...',
    options: ['Learn by playing', 'Fly', 'Become giants'],
    correctIndex: 0,
    emoji: '🎮'
  },
  {
    id: 8,
    question: 'Where does Glimmy live?',
    options: ['In a house', 'Inside the computer', 'On the moon'],
    correctIndex: 1,
    emoji: '💻'
  },
  {
    id: 9,
    question: 'What does Glimmy do when happy?',
    options: ['Sleeps', 'Shines and smiles', 'Cries'],
    correctIndex: 1,
    emoji: '✨'
  },
  {
    id: 10,
    question: 'Can robots play with us?',
    options: ['Yes, they love playing!', 'No', 'Only at night'],
    correctIndex: 0,
    emoji: '🎲'
  },
  {
    id: 11,
    question: 'What does Glimmy like to do?',
    options: ['Solve puzzles', 'Sleep all day', 'Eat candy'],
    correctIndex: 0,
    emoji: '🧩'
  },
  {
    id: 12,
    question: 'Can Glimmy talk to us?',
    options: ['Yes, like a friend!', "No, he's mute", 'Only in English'],
    correctIndex: 0,
    emoji: '💬'
  }
]

// Spanish questions - Simplified for kids 5-10 years
const spanishQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Glimmy es un...',
    options: ['Robot amigo', 'Dinosaurio', 'Alien verde'],
    correctIndex: 0,
    emoji: '🤖'
  },
  {
    id: 2,
    question: '¿Qué comen los robots como Glimmy?',
    options: ['Pizza', 'Energía eléctrica', 'Helado'],
    correctIndex: 1,
    emoji: '⚡'
  },
  {
    id: 3,
    question: '¿Puede Glimmy aprender cosas nuevas?',
    options: ['¡Sí, siempre!', 'No, nunca', 'Solo los lunes'],
    correctIndex: 0,
    emoji: '📚'
  },
  {
    id: 4,
    question: '¿Cómo se llama el cerebro de un robot?',
    options: ['Barriga', 'Computadora', 'Corazón'],
    correctIndex: 1,
    emoji: '🧠'
  },
  {
    id: 5,
    question: '¿Los robots pueden ser nuestros amigos?',
    options: ['¡Sí!', 'No', 'Solo si llueve'],
    correctIndex: 0,
    emoji: '❤️'
  },
  {
    id: 6,
    question: '¿Qué usan los robots para ver?',
    options: ['Gafas de sol', 'Cámaras', 'Binoculares'],
    correctIndex: 1,
    emoji: '👀'
  },
  {
    id: 7,
    question: 'Glimmy puede ayudarnos a...',
    options: ['Aprender jugando', 'Volar', 'Hacernos gigantes'],
    correctIndex: 0,
    emoji: '🎮'
  },
  {
    id: 8,
    question: '¿Dónde vive Glimmy?',
    options: ['En una casa', 'Dentro de la computadora', 'En la luna'],
    correctIndex: 1,
    emoji: '💻'
  },
  {
    id: 9,
    question: '¿Qué hace Glimmy cuando está feliz?',
    options: ['Duerme', 'Brilla y sonríe', 'Llora'],
    correctIndex: 1,
    emoji: '✨'
  },
  {
    id: 10,
    question: '¿Los robots pueden jugar con nosotros?',
    options: ['¡Sí, les encanta jugar!', 'No', 'Solo de noche'],
    correctIndex: 0,
    emoji: '🎲'
  },
  {
    id: 11,
    question: '¿Qué le gusta hacer a Glimmy?',
    options: ['Resolver acertijos', 'Dormir todo el día', 'Comer dulces'],
    correctIndex: 0,
    emoji: '🧩'
  },
  {
    id: 12,
    question: '¿Puede Glimmy hablar con nosotros?',
    options: ['¡Sí, como un amigo!', 'No, es mudo', 'Solo en inglés'],
    correctIndex: 0,
    emoji: '💬'
  }
]

export const quizData: QuizData = {
  it: italianQuestions,
  en: englishQuestions,
  es: spanishQuestions
}
