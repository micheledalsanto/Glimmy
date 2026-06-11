// StoryFill (Mad Libs) data structure
export interface StoryFillBlank {
  type: 'noun' | 'verb' | 'adjective' | 'name' | 'place' | 'color' | 'emotion'
  options: string[]
}

export interface StoryFillSegment {
  text?: string
  blank?: StoryFillBlank
}

export interface StoryFillTemplate {
  id: string
  title: string
  segments: StoryFillSegment[]
}

export interface StoryFillData {
  [locale: string]: StoryFillTemplate[]
}

// Italian stories
const italianStories: StoryFillTemplate[] = [
  {
    id: 'glimmy-day',
    title: 'La Giornata di Glimmy',
    segments: [
      { text: 'Un giorno Glimmy si svegliò in un computer' },
      { blank: { type: 'color', options: ['rosa', 'blu brillante', 'dorato', 'arcobaleno'] } },
      { text: '. Si sentiva molto' },
      { blank: { type: 'emotion', options: ['felice', 'curioso', 'emozionato', 'sorpreso'] } },
      { text: 'perché doveva' },
      { blank: { type: 'verb', options: ['organizzare', 'contare', 'aiutare', 'esplorare'] } },
      { text: 'tutti i' },
      { blank: { type: 'noun', options: ['dati', 'algoritmi', 'robot', 'file'] } },
      { text: '. È stata un\'avventura' },
      { blank: { type: 'adjective', options: ['fantastica', 'divertente', 'magica', 'speciale'] } },
      { text: '!' }
    ]
  },
  {
    id: 'ai-adventure',
    title: 'L\'Avventura dell\'IA',
    segments: [
      { text: 'C\'era una volta un\'intelligenza artificiale di nome' },
      { blank: { type: 'name', options: ['Sparkly', 'Buddy', 'Nova', 'Echo'] } },
      { text: 'che viveva in un' },
      { blank: { type: 'place', options: ['nuvola digitale', 'server luminoso', 'chip magico', 'mondo virtuale'] } },
      { text: '. Ogni giorno imparava cose' },
      { blank: { type: 'adjective', options: ['nuove', 'incredibili', 'strane', 'affascinanti'] } },
      { text: 'guardando migliaia di' },
      { blank: { type: 'noun', options: ['immagini', 'video', 'testi', 'suoni'] } },
      { text: '. Il suo superpotere era' },
      { blank: { type: 'verb', options: ['riconoscere', 'prevedere', 'creare', 'tradurre'] } },
      { text: 'pattern nascosti!' }
    ]
  },
  {
    id: 'robot-friend',
    title: 'Il Mio Amico Robot',
    segments: [
      { text: 'Ho un amico robot che si chiama' },
      { blank: { type: 'name', options: ['Bit', 'Chip', 'Bolt', 'Zip'] } },
      { text: '. È di colore' },
      { blank: { type: 'color', options: ['argento', 'blu metallico', 'bianco lucido', 'verde neon'] } },
      { text: 'e ha occhi' },
      { blank: { type: 'adjective', options: ['brillanti', 'gentili', 'intelligenti', 'luminosi'] } },
      { text: '. Gli piace' },
      { blank: { type: 'verb', options: ['giocare', 'ballare', 'cantare', 'disegnare'] } },
      { text: 'con me ogni giorno. Il suo snack preferito è l\'' },
      { blank: { type: 'noun', options: ['elettricità', 'energia solare', 'wifi', 'olio per robot'] } },
      { text: '!' }
    ]
  },
  {
    id: 'data-world',
    title: 'Nel Mondo dei Dati',
    segments: [
      { text: 'Glimmy viaggiò verso un posto' },
      { blank: { type: 'adjective', options: ['misterioso', 'colorato', 'gigante', 'scintillante'] } },
      { text: 'chiamato' },
      { blank: { type: 'place', options: ['Database City', 'Algoritmo Land', 'Data Valley', 'Neural Network'] } },
      { text: '. Lì incontrò tanti' },
      { blank: { type: 'noun', options: ['numeri', 'codici', 'bit', 'pixel'] } },
      { text: 'che si sentivano' },
      { blank: { type: 'emotion', options: ['confusi', 'soli', 'persi', 'stanchi'] } },
      { text: '. Glimmy decise di' },
      { blank: { type: 'verb', options: ['organizzarli', 'ordinarli', 'raggrupparli', 'collegarli'] } },
      { text: 'tutti insieme in modo' },
      { blank: { type: 'adjective', options: ['ordinato', 'logico', 'perfetto', 'intelligente'] } },
      { text: '!' }
    ]
  },
  {
    id: 'learning-machine',
    title: 'La Macchina che Impara',
    segments: [
      { text: 'C\'era una macchina' },
      { blank: { type: 'adjective', options: ['curiosa', 'intelligente', 'speciale', 'unica'] } },
      { text: 'che voleva imparare a' },
      { blank: { type: 'verb', options: ['riconoscere', 'capire', 'classificare', 'identificare'] } },
      { text: 'le' },
      { blank: { type: 'noun', options: ['foto', 'voci', 'forme', 'emozioni'] } },
      { text: '. Studiò per' },
      { blank: { type: 'adjective', options: ['lunghi', 'intensi', 'pazzi', 'infiniti'] } },
      { text: 'giorni guardando esempi' },
      { blank: { type: 'adjective', options: ['diversi', 'colorati', 'complicati', 'strani'] } },
      { text: '. Alla fine divenne' },
      { blank: { type: 'adjective', options: ['bravissima', 'esperta', 'fantastica', 'incredibile'] } },
      { text: '!' }
    ]
  }
]

// English stories
const englishStories: StoryFillTemplate[] = [
  {
    id: 'glimmy-day',
    title: 'Glimmy\'s Day',
    segments: [
      { text: 'One day Glimmy woke up in a' },
      { blank: { type: 'color', options: ['pink', 'bright blue', 'golden', 'rainbow'] } },
      { text: 'computer. He felt very' },
      { blank: { type: 'emotion', options: ['happy', 'curious', 'excited', 'surprised'] } },
      { text: 'because he had to' },
      { blank: { type: 'verb', options: ['organize', 'count', 'help', 'explore'] } },
      { text: 'all the' },
      { blank: { type: 'noun', options: ['data', 'algorithms', 'robots', 'files'] } },
      { text: '. It was a' },
      { blank: { type: 'adjective', options: ['fantastic', 'fun', 'magical', 'special'] } },
      { text: 'adventure!' }
    ]
  },
  {
    id: 'ai-adventure',
    title: 'The AI Adventure',
    segments: [
      { text: 'Once upon a time there was an AI named' },
      { blank: { type: 'name', options: ['Sparkly', 'Buddy', 'Nova', 'Echo'] } },
      { text: 'who lived in a' },
      { blank: { type: 'place', options: ['digital cloud', 'bright server', 'magic chip', 'virtual world'] } },
      { text: '. Every day it learned' },
      { blank: { type: 'adjective', options: ['new', 'incredible', 'strange', 'fascinating'] } },
      { text: 'things by watching thousands of' },
      { blank: { type: 'noun', options: ['images', 'videos', 'texts', 'sounds'] } },
      { text: '. Its superpower was to' },
      { blank: { type: 'verb', options: ['recognize', 'predict', 'create', 'translate'] } },
      { text: 'hidden patterns!' }
    ]
  },
  {
    id: 'robot-friend',
    title: 'My Robot Friend',
    segments: [
      { text: 'I have a robot friend named' },
      { blank: { type: 'name', options: ['Bit', 'Chip', 'Bolt', 'Zip'] } },
      { text: '. It is' },
      { blank: { type: 'color', options: ['silver', 'metallic blue', 'shiny white', 'neon green'] } },
      { text: 'and has' },
      { blank: { type: 'adjective', options: ['bright', 'kind', 'smart', 'glowing'] } },
      { text: 'eyes. It likes to' },
      { blank: { type: 'verb', options: ['play', 'dance', 'sing', 'draw'] } },
      { text: 'with me every day. Its favorite snack is' },
      { blank: { type: 'noun', options: ['electricity', 'solar power', 'wifi', 'robot oil'] } },
      { text: '!' }
    ]
  },
  {
    id: 'data-world',
    title: 'In the World of Data',
    segments: [
      { text: 'Glimmy traveled to a' },
      { blank: { type: 'adjective', options: ['mysterious', 'colorful', 'giant', 'sparkling'] } },
      { text: 'place called' },
      { blank: { type: 'place', options: ['Database City', 'Algorithm Land', 'Data Valley', 'Neural Network'] } },
      { text: '. There he met many' },
      { blank: { type: 'noun', options: ['numbers', 'codes', 'bits', 'pixels'] } },
      { text: 'that felt' },
      { blank: { type: 'emotion', options: ['confused', 'lonely', 'lost', 'tired'] } },
      { text: '. Glimmy decided to' },
      { blank: { type: 'verb', options: ['organize', 'sort', 'group', 'connect'] } },
      { text: 'them all in a' },
      { blank: { type: 'adjective', options: ['tidy', 'logical', 'perfect', 'smart'] } },
      { text: 'way!' }
    ]
  },
  {
    id: 'learning-machine',
    title: 'The Learning Machine',
    segments: [
      { text: 'There was a' },
      { blank: { type: 'adjective', options: ['curious', 'smart', 'special', 'unique'] } },
      { text: 'machine that wanted to learn to' },
      { blank: { type: 'verb', options: ['recognize', 'understand', 'classify', 'identify'] } },
      { blank: { type: 'noun', options: ['photos', 'voices', 'shapes', 'emotions'] } },
      { text: '. It studied for' },
      { blank: { type: 'adjective', options: ['long', 'intense', 'crazy', 'endless'] } },
      { text: 'days looking at' },
      { blank: { type: 'adjective', options: ['different', 'colorful', 'complicated', 'strange'] } },
      { text: 'examples. In the end it became' },
      { blank: { type: 'adjective', options: ['excellent', 'expert', 'fantastic', 'incredible'] } },
      { text: '!' }
    ]
  }
]

// Spanish stories
const spanishStories: StoryFillTemplate[] = [
  {
    id: 'glimmy-day',
    title: 'El Día de Glimmy',
    segments: [
      { text: 'Un día Glimmy se despertó en una computadora' },
      { blank: { type: 'color', options: ['rosa', 'azul brillante', 'dorada', 'arcoíris'] } },
      { text: '. Se sentía muy' },
      { blank: { type: 'emotion', options: ['feliz', 'curioso', 'emocionado', 'sorprendido'] } },
      { text: 'porque tenía que' },
      { blank: { type: 'verb', options: ['organizar', 'contar', 'ayudar', 'explorar'] } },
      { text: 'todos los' },
      { blank: { type: 'noun', options: ['datos', 'algoritmos', 'robots', 'archivos'] } },
      { text: '. ¡Fue una aventura' },
      { blank: { type: 'adjective', options: ['fantástica', 'divertida', 'mágica', 'especial'] } },
      { text: '!' }
    ]
  },
  {
    id: 'ai-adventure',
    title: 'La Aventura de la IA',
    segments: [
      { text: 'Había una vez una IA llamada' },
      { blank: { type: 'name', options: ['Sparkly', 'Buddy', 'Nova', 'Echo'] } },
      { text: 'que vivía en una' },
      { blank: { type: 'place', options: ['nube digital', 'servidor brillante', 'chip mágico', 'mundo virtual'] } },
      { text: '. Cada día aprendía cosas' },
      { blank: { type: 'adjective', options: ['nuevas', 'increíbles', 'extrañas', 'fascinantes'] } },
      { text: 'mirando miles de' },
      { blank: { type: 'noun', options: ['imágenes', 'videos', 'textos', 'sonidos'] } },
      { text: '. Su superpoder era' },
      { blank: { type: 'verb', options: ['reconocer', 'predecir', 'crear', 'traducir'] } },
      { text: '¡patrones ocultos!' }
    ]
  },
  {
    id: 'robot-friend',
    title: 'Mi Amigo Robot',
    segments: [
      { text: 'Tengo un amigo robot llamado' },
      { blank: { type: 'name', options: ['Bit', 'Chip', 'Bolt', 'Zip'] } },
      { text: '. Es de color' },
      { blank: { type: 'color', options: ['plateado', 'azul metálico', 'blanco brillante', 'verde neón'] } },
      { text: 'y tiene ojos' },
      { blank: { type: 'adjective', options: ['brillantes', 'amables', 'inteligentes', 'luminosos'] } },
      { text: '. Le gusta' },
      { blank: { type: 'verb', options: ['jugar', 'bailar', 'cantar', 'dibujar'] } },
      { text: 'conmigo cada día. Su snack favorito es' },
      { blank: { type: 'noun', options: ['electricidad', 'energía solar', 'wifi', 'aceite para robots'] } },
      { text: '!' }
    ]
  },
  {
    id: 'data-world',
    title: 'En el Mundo de los Datos',
    segments: [
      { text: 'Glimmy viajó a un lugar' },
      { blank: { type: 'adjective', options: ['misterioso', 'colorido', 'gigante', 'brillante'] } },
      { text: 'llamado' },
      { blank: { type: 'place', options: ['Ciudad Base de Datos', 'Tierra de Algoritmos', 'Valle de Datos', 'Red Neuronal'] } },
      { text: '. Allí conoció muchos' },
      { blank: { type: 'noun', options: ['números', 'códigos', 'bits', 'píxeles'] } },
      { text: 'que se sentían' },
      { blank: { type: 'emotion', options: ['confundidos', 'solos', 'perdidos', 'cansados'] } },
      { text: '. Glimmy decidió' },
      { blank: { type: 'verb', options: ['organizarlos', 'ordenarlos', 'agruparlos', 'conectarlos'] } },
      { text: 'a todos de forma' },
      { blank: { type: 'adjective', options: ['ordenada', 'lógica', 'perfecta', 'inteligente'] } },
      { text: '!' }
    ]
  },
  {
    id: 'learning-machine',
    title: 'La Máquina que Aprende',
    segments: [
      { text: 'Había una máquina' },
      { blank: { type: 'adjective', options: ['curiosa', 'inteligente', 'especial', 'única'] } },
      { text: 'que quería aprender a' },
      { blank: { type: 'verb', options: ['reconocer', 'entender', 'clasificar', 'identificar'] } },
      { blank: { type: 'noun', options: ['fotos', 'voces', 'formas', 'emociones'] } },
      { text: '. Estudió durante' },
      { blank: { type: 'adjective', options: ['largos', 'intensos', 'locos', 'infinitos'] } },
      { text: 'días mirando ejemplos' },
      { blank: { type: 'adjective', options: ['diferentes', 'coloridos', 'complicados', 'extraños'] } },
      { text: '. ¡Al final se volvió' },
      { blank: { type: 'adjective', options: ['excelente', 'experta', 'fantástica', 'increíble'] } },
      { text: '!' }
    ]
  }
]

export const storyFillData: StoryFillData = {
  it: italianStories,
  en: englishStories,
  es: spanishStories
}
