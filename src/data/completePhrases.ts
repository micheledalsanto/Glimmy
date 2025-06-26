export interface Phrase {
  text: string
  options: string[]
  answer: string
}

export interface PhraseSet {
  id: number
  phrases: Phrase[]
}

export const completePhraseSets: Record<string, PhraseSet[]> = {
  it: [
    {
      id: 1,
      phrases: [
        {
          text: "Glimmy è una piccola ______ robotica.",
          options: ["banana", "stellina", "nuvola"],
          answer: "stellina"
        },
        {
          text: "L'intelligenza artificiale è una mente molto ______.",
          options: ["furba", "rumorosa", "puzzolente"],
          answer: "furba"
        },
        {
          text: "I robot non mangiano, ma usano l’______.",
          options: ["energia", "forchetta", "zuppa"],
          answer: "energia"
        },
        {
          text: "Per imparare, Glimmy legge tanti ______.",
          options: ["libri", "dati", "fumetti"],
          answer: "dati"
        },
        {
          text: "Glimmy adora fare quiz e ______.",
          options: ["torte", "indovinelli", "sonnellini"],
          answer: "indovinelli"
        }
      ]
    }
  ],
  en: [
    {
      id: 1,
      phrases: [
        {
          text: "Glimmy is a little ______ robot.",
          options: ["banana", "star", "cloud"],
          answer: "star"
        },
        {
          text: "Artificial intelligence is a very ______ mind.",
          options: ["smart", "noisy", "smelly"],
          answer: "smart"
        },
        {
          text: "Robots don’t eat, but use ______.",
          options: ["energy", "forks", "soup"],
          answer: "energy"
        },
        {
          text: "To learn, Glimmy reads lots of ______.",
          options: ["books", "data", "comics"],
          answer: "data"
        },
        {
          text: "Glimmy loves doing quizzes and ______.",
          options: ["cakes", "riddles", "naps"],
          answer: "riddles"
        }
      ]
    }
  ],
  es: [
    {
      id: 1,
      phrases: [
        {
          text: "Glimmy es una pequeña ______ robótica.",
          options: ["banana", "estrella", "nube"],
          answer: "estrella"
        },
        {
          text: "La inteligencia artificial es una mente muy ______.",
          options: ["lista", "ruidosa", "apestosa"],
          answer: "lista"
        },
        {
          text: "Los robots no comen, pero usan ______.",
          options: ["energía", "tenedores", "sopa"],
          answer: "energía"
        },
        {
          text: "Para aprender, Glimmy lee muchos ______.",
          options: ["libros", "datos", "cómics"],
          answer: "datos"
        },
        {
          text: "¡A Glimmy le encantan los juegos y los ______!",
          options: ["pasteles", "acertijos", "siestas"],
          answer: "acertijos"
        }
      ]
    }
  ]
}
