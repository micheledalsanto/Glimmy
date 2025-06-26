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
    },
    {
      id: 2,
      phrases: [
        {
          text: "Un robot non dorme, ma può ______.",
          options: ["russare", "caricarsi", "sognare"],
          answer: "caricarsi"
        },
        {
          text: "Quando vede una banana, Glimmy dice: è una ______!",
          options: ["frutta", "scarpa", "stella"],
          answer: "frutta"
        },
        {
          text: "L’AI aiuta a trovare le ______ giuste.",
          options: ["risposte", "scarpe", "faccine"],
          answer: "risposte"
        },
        {
          text: "Per funzionare, Glimmy ha bisogno di un ______.",
          options: ["cuscino", "computer", "frullatore"],
          answer: "computer"
        },
        {
          text: "Glimmy parla con noi come un piccolo ______.",
          options: ["orso", "amico", "cavallo"],
          answer: "amico"
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
    },
    {
      id: 2,
      phrases: [
        {
          text: "A robot doesn’t sleep, but it can ______.",
          options: ["snore", "charge", "dream"],
          answer: "charge"
        },
        {
          text: "When Glimmy sees a banana, it says: it’s a ______!",
          options: ["fruit", "shoe", "star"],
          answer: "fruit"
        },
        {
          text: "AI helps to find the right ______.",
          options: ["answers", "shoes", "faces"],
          answer: "answers"
        },
        {
          text: "To work, Glimmy needs a ______.",
          options: ["pillow", "computer", "blender"],
          answer: "computer"
        },
        {
          text: "Glimmy talks to us like a little ______.",
          options: ["bear", "friend", "horse"],
          answer: "friend"
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
    },
    {
      id: 2,
      phrases: [
        {
          text: "Un robot no duerme, pero puede ______.",
          options: ["roncar", "cargarse", "soñar"],
          answer: "cargarse"
        },
        {
          text: "Cuando ve una banana, Glimmy dice: ¡es una ______!",
          options: ["fruta", "zapata", "estrella"],
          answer: "fruta"
        },
        {
          text: "La IA ayuda a encontrar las ______ correctas.",
          options: ["respuestas", "zapatos", "caritas"],
          answer: "respuestas"
        },
        {
          text: "Para funcionar, Glimmy necesita una ______.",
          options: ["almohada", "computadora", "licuadora"],
          answer: "computadora"
        },
        {
          text: "Glimmy habla con nosotros como un pequeño ______.",
          options: ["oso", "amigo", "caballo"],
          answer: "amigo"
        }
      ]
    }
  ]
}
