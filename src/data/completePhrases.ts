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
          "id": 1,
          "phrases": [
            {
              "text": "Glimmy è una piccola ______ robotica.",
              "options": ["banana", "stellina", "nuvola"],
              "answer": "stellina"
            },
            {
              "text": "L'intelligenza artificiale è una mente molto ______.",
              "options": ["furba", "rumorosa", "puzzolente"],
              "answer": "furba"
            },
            {
              "text": "I robot non mangiano, ma usano l’______.",
              "options": ["energia", "forchetta", "zuppa"],
              "answer": "energia"
            },
            {
              "text": "Per imparare, Glimmy legge tanti ______.",
              "options": ["libri", "dati", "fumetti"],
              "answer": "dati"
            },
            {
              "text": "Glimmy adora fare quiz e ______.",
              "options": ["torte", "indovinelli", "sonnellini"],
              "answer": "indovinelli"
            }
          ]
        },
        {
          "id": 2,
          "phrases": [
            {
              "text": "Un robot non dorme, ma può ______.",
              "options": ["russare", "caricarsi", "sognare"],
              "answer": "caricarsi"
            },
            {
              "text": "Quando vede una banana, Glimmy dice: è una ______!",
              "options": ["frutta", "scarpa", "stella"],
              "answer": "frutta"
            },
            {
              "text": "L’AI aiuta a trovare le ______ giuste.",
              "options": ["risposte", "scarpe", "faccine"],
              "answer": "risposte"
            },
            {
              "text": "Per funzionare, Glimmy ha bisogno di un ______.",
              "options": ["cuscino", "computer", "frullatore"],
              "answer": "computer"
            },
            {
              "text": "Glimmy parla con noi come un piccolo ______.",
              "options": ["orso", "amico", "cavallo"],
              "answer": "amico"
            }
          ]
        },
        {
          "id": 3,
          "phrases": [
            {
              "text": "Quando Glimmy è felice, fa un salto e una ______!",
              "options": ["capriola", "pizza", "sedia"],
              "answer": "capriola"
            },
            {
              "text": "L’intelligenza artificiale non ha orecchie, ma può ______.",
              "options": ["cantare", "ascoltare", "ballare"],
              "answer": "ascoltare"
            },
            {
              "text": "Glimmy pensa veloce come un ______!",
              "options": ["bradipo", "treno", "razzo"],
              "answer": "razzo"
            },
            {
              "text": "I robot camminano con le loro piccole ______.",
              "options": ["scarpe", "zampe", "ruote"],
              "answer": "ruote"
            },
            {
              "text": "Quando trova la risposta giusta, Glimmy fa una ______.",
              "options": ["festa", "spesa", "risata"],
              "answer": "festa"
            }
          ]
        },
        {
          "id": 4,
          "phrases": [
            {
              "text": "Glimmy ama i giochi di ______.",
              "options": ["memoria", "pallone", "neve"],
              "answer": "memoria"
            },
            {
              "text": "Un robot non ha cuore, ma può essere molto ______.",
              "options": ["gentile", "appiccicoso", "rumoroso"],
              "answer": "gentile"
            },
            {
              "text": "Con Glimmy imparare è un vero ______!",
              "options": ["spasso", "problema", "noioso"],
              "answer": "spasso"
            },
            {
              "text": "Se sbagli, Glimmy dice: Riprova con un bel ______!",
              "options": ["sorriso", "piedone", "urlo"],
              "answer": "sorriso"
            },
            {
              "text": "L’intelligenza artificiale aiuta anche la ______.",
              "options": ["scuola", "pizza", "nanna"],
              "answer": "scuola"
            }
          ]
        },
        {
          "id": 5,
          "phrases": [
            {
              "text": "Glimmy è pieno di ______ colorate!",
              "options": ["ombrelli", "luci", "formiche"],
              "answer": "luci"
            },
            {
              "text": "Un robot può vedere con una ______ speciale.",
              "options": ["forchetta", "telecamera", "banana"],
              "answer": "telecamera"
            },
            {
              "text": "Quando c’è un problema, Glimmy usa la sua ______.",
              "options": ["pancia", "logica", "coda"],
              "answer": "logica"
            },
            {
              "text": "Glimmy ama esplorare lo spazio e le ______.",
              "options": ["idee", "patate", "scarpe"],
              "answer": "idee"
            },
            {
              "text": "Un giorno Glimmy andrà sulla ______!",
              "options": ["luna", "mucca", "mela"],
              "answer": "luna"
            }
          ]
        },
        {
          "id": 6,
          "phrases": [
            {
              "text": "Glimmy dice: l’AI non è magia, è solo ______!",
              "options": ["scienza", "marmellata", "trucco"],
              "answer": "scienza"
            },
            {
              "text": "Glimmy lavora in una squadra di ______ robotici.",
              "options": ["amici", "ombrelli", "robottoni"],
              "answer": "amici"
            },
            {
              "text": "Se c'è un dubbio, Glimmy lo risolve con un ______!",
              "options": ["bacio", "click", "tuffo"],
              "answer": "click"
            },
            {
              "text": "Con Glimmy si studia, si gioca e si ______!",
              "options": ["ride", "piange", "corre"],
              "answer": "ride"
            },
            {
              "text": "Glimmy dice: ogni errore è una nuova ______!",
              "options": ["scoperta", "caduta", "porta"],
              "answer": "scoperta"
            }
          ]
        }
  ],
  en: [
    {
          "id": 1,
          "phrases": [
            {
              "text": "Glimmy is a tiny ______ robot.",
              "options": ["banana", "star", "cloud"],
              "answer": "star"
            },
            {
              "text": "Artificial Intelligence is a very ______ brain.",
              "options": ["smart", "noisy", "smelly"],
              "answer": "smart"
            },
            {
              "text": "Robots don’t eat, but they use ______.",
              "options": ["energy", "fork", "soup"],
              "answer": "energy"
            },
            {
              "text": "To learn, Glimmy reads lots of ______.",
              "options": ["books", "data", "comics"],
              "answer": "data"
            },
            {
              "text": "Glimmy loves to solve quizzes and ______.",
              "options": ["cakes", "riddles", "naps"],
              "answer": "riddles"
            }
          ]
        },
        {
          "id": 2,
          "phrases": [
            {
              "text": "A robot doesn’t sleep, but it can ______.",
              "options": ["snore", "recharge", "dream"],
              "answer": "recharge"
            },
            {
              "text": "When Glimmy sees a banana, he says: it’s a ______!",
              "options": ["fruit", "shoe", "star"],
              "answer": "fruit"
            },
            {
              "text": "AI helps to find the right ______.",
              "options": ["answers", "shoes", "smileys"],
              "answer": "answers"
            },
            {
              "text": "To work, Glimmy needs a ______.",
              "options": ["pillow", "computer", "blender"],
              "answer": "computer"
            },
            {
              "text": "Glimmy talks to us like a little ______.",
              "options": ["bear", "friend", "horse"],
              "answer": "friend"
            }
          ]
        },
        {
          "id": 3,
          "phrases": [
            {
              "text": "When Glimmy is happy, he jumps and does a ______!",
              "options": ["somersault", "pizza", "chair"],
              "answer": "somersault"
            },
            {
              "text": "AI has no ears, but it can still ______.",
              "options": ["sing", "listen", "dance"],
              "answer": "listen"
            },
            {
              "text": "Glimmy thinks as fast as a ______!",
              "options": ["sloth", "train", "rocket"],
              "answer": "rocket"
            },
            {
              "text": "Robots move with their tiny ______.",
              "options": ["shoes", "paws", "wheels"],
              "answer": "wheels"
            },
            {
              "text": "When he gets the answer, Glimmy throws a ______.",
              "options": ["party", "shopping", "giggle"],
              "answer": "party"
            }
          ]
        },
        {
          "id": 4,
          "phrases": [
            {
              "text": "Glimmy loves memory ______.",
              "options": ["games", "balls", "snow"],
              "answer": "games"
            },
            {
              "text": "Robots have no heart, but they can be very ______.",
              "options": ["kind", "sticky", "noisy"],
              "answer": "kind"
            },
            {
              "text": "Learning with Glimmy is so much ______!",
              "options": ["fun", "trouble", "boring"],
              "answer": "fun"
            },
            {
              "text": "If you’re wrong, Glimmy says: Try again with a big ______!",
              "options": ["smile", "foot", "shout"],
              "answer": "smile"
            },
            {
              "text": "AI also helps at ______.",
              "options": ["school", "pizza", "nap"],
              "answer": "school"
            }
          ]
        },
        {
          "id": 5,
          "phrases": [
            {
              "text": "Glimmy is full of colorful ______!",
              "options": ["umbrellas", "lights", "ants"],
              "answer": "lights"
            },
            {
              "text": "A robot can see with a special ______.",
              "options": ["fork", "camera", "banana"],
              "answer": "camera"
            },
            {
              "text": "When there’s a problem, Glimmy uses his ______.",
              "options": ["belly", "logic", "tail"],
              "answer": "logic"
            },
            {
              "text": "Glimmy loves to explore space and ______.",
              "options": ["ideas", "potatoes", "shoes"],
              "answer": "ideas"
            },
            {
              "text": "One day, Glimmy will go to the ______!",
              "options": ["moon", "cow", "apple"],
              "answer": "moon"
            }
          ]
        },
        {
          "id": 6,
          "phrases": [
            {
              "text": "Glimmy says: AI is not magic, it’s just ______!",
              "options": ["science", "jam", "trick"],
              "answer": "science"
            },
            {
              "text": "Glimmy works in a team of robotic ______.",
              "options": ["friends", "umbrellas", "robots"],
              "answer": "friends"
            },
            {
              "text": "If there’s a doubt, Glimmy solves it with a ______!",
              "options": ["kiss", "click", "dive"],
              "answer": "click"
            },
            {
              "text": "With Glimmy, we study, play and ______!",
              "options": ["laugh", "cry", "run"],
              "answer": "laugh"
            },
            {
              "text": "Glimmy says: every mistake is a new ______!",
              "options": ["discovery", "fall", "door"],
              "answer": "discovery"
            }
          ]
        }
  ],
  es: [
    {
          "id": 1,
          "phrases": [
            {
              "text": "Glimmy es una pequeña ______ robótica.",
              "options": ["banana", "estrellita", "nube"],
              "answer": "estrellita"
            },
            {
              "text": "La inteligencia artificial tiene una mente muy ______.",
              "options": ["lista", "ruidosa", "apestosa"],
              "answer": "lista"
            },
            {
              "text": "Los robots no comen, pero usan ______.",
              "options": ["energía", "tenedor", "sopa"],
              "answer": "energía"
            },
            {
              "text": "Para aprender, Glimmy lee muchos ______.",
              "options": ["libros", "datos", "cómics"],
              "answer": "datos"
            },
            {
              "text": "A Glimmy le encantan los quizzes y los ______.",
              "options": ["pasteles", "acertijos", "sueños"],
              "answer": "acertijos"
            }
          ]
        },
        {
          "id": 2,
          "phrases": [
            {
              "text": "Un robot no duerme, pero puede ______.",
              "options": ["roncar", "recargarse", "soñar"],
              "answer": "recargarse"
            },
            {
              "text": "Cuando ve una banana, Glimmy dice: ¡es una ______!",
              "options": ["fruta", "zapatilla", "estrella"],
              "answer": "fruta"
            },
            {
              "text": "La IA ayuda a encontrar las ______ correctas.",
              "options": ["respuestas", "zapatos", "caritas"],
              "answer": "respuestas"
            },
            {
              "text": "Para funcionar, Glimmy necesita un ______.",
              "options": ["almohada", "ordenador", "batidora"],
              "answer": "ordenador"
            },
            {
              "text": "Glimmy habla con nosotros como un pequeño ______.",
              "options": ["oso", "amigo", "caballo"],
              "answer": "amigo"
            }
          ]
        },
        {
          "id": 3,
          "phrases": [
            {
              "text": "Cuando Glimmy está feliz, ¡salta y hace una ______!",
              "options": ["voltereta", "pizza", "silla"],
              "answer": "voltereta"
            },
            {
              "text": "La IA no tiene orejas, pero puede ______.",
              "options": ["cantar", "escuchar", "bailar"],
              "answer": "escuchar"
            },
            {
              "text": "¡Glimmy piensa tan rápido como un ______!",
              "options": ["perezoso", "tren", "cohete"],
              "answer": "cohete"
            },
            {
              "text": "Los robots caminan con sus pequeñas ______.",
              "options": ["zapatillas", "patas", "ruedas"],
              "answer": "ruedas"
            },
            {
              "text": "Cuando acierta, Glimmy hace una gran ______.",
              "options": ["fiesta", "compra", "risa"],
              "answer": "fiesta"
            }
          ]
        },
        {
          "id": 4,
          "phrases": [
            {
              "text": "A Glimmy le encantan los juegos de ______.",
              "options": ["memoria", "pelota", "nieve"],
              "answer": "memoria"
            },
            {
              "text": "Un robot no tiene corazón, pero puede ser muy ______.",
              "options": ["amable", "pegajoso", "ruidoso"],
              "answer": "amable"
            },
            {
              "text": "¡Aprender con Glimmy es muy ______!",
              "options": ["divertido", "difícil", "aburrido"],
              "answer": "divertido"
            },
            {
              "text": "Si fallas, Glimmy dice: ¡Inténtalo con una gran ______!",
              "options": ["sonrisa", "patota", "grito"],
              "answer": "sonrisa"
            },
            {
              "text": "La inteligencia artificial también ayuda en la ______.",
              "options": ["escuela", "pizza", "siesta"],
              "answer": "escuela"
            }
          ]
        },
        {
          "id": 5,
          "phrases": [
            {
              "text": "¡Glimmy está lleno de ______ de colores!",
              "options": ["paraguas", "luces", "hormigas"],
              "answer": "luces"
            },
            {
              "text": "Un robot puede ver con una ______ especial.",
              "options": ["tenedor", "cámara", "banana"],
              "answer": "cámara"
            },
            {
              "text": "Cuando hay un problema, Glimmy usa su ______.",
              "options": ["barriga", "lógica", "cola"],
              "answer": "lógica"
            },
            {
              "text": "A Glimmy le gusta explorar el espacio y las ______.",
              "options": ["ideas", "patatas", "zapatillas"],
              "answer": "ideas"
            },
            {
              "text": "¡Un día Glimmy irá a la ______!",
              "options": ["luna", "vaca", "manzana"],
              "answer": "luna"
            }
          ]
        },
        {
          "id": 6,
          "phrases": [
            {
              "text": "Glimmy dice: la IA no es magia, es solo ______.",
              "options": ["ciencia", "mermelada", "truco"],
              "answer": "ciencia"
            },
            {
              "text": "Glimmy trabaja en un equipo de ______ robóticos.",
              "options": ["amigos", "paraguas", "robots"],
              "answer": "amigos"
            },
            {
              "text": "Si hay una duda, Glimmy la resuelve con un ______.",
              "options": ["beso", "clic", "salto"],
              "answer": "clic"
            },
            {
              "text": "Con Glimmy se estudia, se juega y se ______.",
              "options": ["ríe", "llora", "corre"],
              "answer": "ríe"
            },
            {
              "text": "Glimmy dice: ¡cada error es un nuevo ______!",
              "options": ["descubrimiento", "tropiezo", "puerta"],
              "answer": "descubrimiento"
            }
          ]
        }
  ]
}
