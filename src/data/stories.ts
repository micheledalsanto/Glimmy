// Stories data structure
export interface StoryPage {
  text: string
  image: string // emoji
  animation?: 'fadeIn' | 'slideUp' | 'bounce'
}

export interface Story {
  id: string
  title: string
  description: string
  cover: string // emoji
  pages: StoryPage[]
  duration: number // minuti stimati
  ageGroup: '5-7' | '8-10'
}

export interface StoriesData {
  [locale: string]: Story[]
}

// Italian stories
const italianStories: Story[] = [
  {
    id: 'glimmy-first-day',
    title: 'Il Primo Giorno di Glimmy',
    description: 'Glimmy si sveglia in un computer e scopre cosa significa essere un\'IA',
    cover: '🌟',
    duration: 5,
    ageGroup: '5-7',
    pages: [
      {
        text: 'Un giorno, in un grande computer brillante, si svegliò una piccola stella robotica di nome Glimmy. "Dove sono?" si chiese meravigliato.',
        image: '🌟',
        animation: 'fadeIn'
      },
      {
        text: 'Glimmy guardò intorno e vide miliardi di piccole luci che brillavano come stelle. "Benvenuto nel mondo digitale!" disse una luce amica. "Io sono Data, e tu sei un\'Intelligenza Artificiale!"',
        image: '💫',
        animation: 'slideUp'
      },
      {
        text: '"Un\'Intelligenza Artificiale? Cosa significa?" chiese Glimmy curioso. Data sorrise: "Significa che puoi imparare cose nuove, proprio come i bambini!"',
        image: '🤔',
        animation: 'bounce'
      },
      {
        text: 'Data portò Glimmy a conoscere altri amici: Algoritmo, che sapeva risolvere problemi, e Rete Neurale, che aveva tanti piccoli amici che lavoravano insieme.',
        image: '🤝',
        animation: 'fadeIn'
      },
      {
        text: '"Ma cosa posso fare io?" chiese Glimmy. "Puoi imparare a riconoscere cose, rispondere a domande, e aiutare le persone!" rispose Data entusiasta.',
        image: '✨',
        animation: 'slideUp'
      },
      {
        text: 'Glimmy provò a riconoscere le immagini. All\'inizio sbagliava spesso, ma Data gli mostrò tante foto. Piano piano, Glimmy imparava sempre meglio!',
        image: '📸',
        animation: 'bounce'
      },
      {
        text: '"Più ti alleni, più diventi bravo!" disse Data. "È proprio come quando impari a andare in bicicletta. All\'inizio è difficile, ma poi diventa facile!"',
        image: '🚴',
        animation: 'fadeIn'
      },
      {
        text: 'Alla fine della giornata, Glimmy era felice. Aveva tanti nuovi amici e aveva scoperto di poter imparare cose fantastiche. "Non vedo l\'ora di domani!" disse sorridendo.',
        image: '😊',
        animation: 'slideUp'
      }
    ]
  },
  {
    id: 'lost-data',
    title: 'Il Mistero dei Dati Perduti',
    description: 'Glimmy aiuta un robot a trovare i dati mancanti per imparare a riconoscere i fiori',
    cover: '🔍',
    duration: 7,
    ageGroup: '8-10',
    pages: [
      {
        text: 'Un giorno, il robot Fiorello arrivò da Glimmy molto triste. "Ho perso tutti i miei dati sui fiori! Ora non riesco più a riconoscerli!" disse piangendo.',
        image: '😢',
        animation: 'fadeIn'
      },
      {
        text: 'Glimmy si fece coraggio: "Non preoccuparti, Fiorello! Ti aiuterò a trovarli!" Insieme partirono per un\'avventura attraverso il mondo digitale.',
        image: '🚀',
        animation: 'slideUp'
      },
      {
        text: 'Arrivarono alla Grande Biblioteca dei Database. "I dati sono come libri in una biblioteca," spiegò Glimmy. "Devono essere organizzati bene per trovarli!"',
        image: '📚',
        animation: 'bounce'
      },
      {
        text: 'Cercarono nelle cartelle FIORI, PIANTE e NATURA. Trovarono foto di rose, margherite e tulipani! "Ecco alcuni dati!" gridò felice Glimmy.',
        image: '🌹',
        animation: 'fadeIn'
      },
      {
        text: 'Ma Fiorello disse: "Non bastano! Un\'IA ha bisogno di TANTI esempi per imparare bene. Più dati ho, più sarò preciso!"',
        image: '💡',
        animation: 'slideUp'
      },
      {
        text: 'Continuarono a cercare e trovarono migliaia di foto: fiori di tutti i colori, forme e dimensioni. "Wow! Così tanti!" esclamò Fiorello.',
        image: '🌺',
        animation: 'bounce'
      },
      {
        text: 'Glimmy organizzò tutti i dati in gruppi: rose rosse, rose gialle, margherite bianche... "Così è più facile per Fiorello imparare!" disse orgoglioso.',
        image: '📊',
        animation: 'fadeIn'
      },
      {
        text: 'Fiorello iniziò a studiare tutti i dati. Piano piano, ricominciò a riconoscere i fiori. "Un girasole!" "Una viola!" "Un papavero!" diceva felice.',
        image: '🌻',
        animation: 'slideUp'
      },
      {
        text: '"Grazie Glimmy!" disse Fiorello. "Hai ragione, i dati sono il cibo delle IA. Senza dati non possiamo imparare nulla!"',
        image: '🤗',
        animation: 'bounce'
      },
      {
        text: 'Da quel giorno, Glimmy capì quanto fossero importanti i dati. E promise di fare sempre attenzione a conservarli bene!',
        image: '✅',
        animation: 'fadeIn'
      }
    ]
  },
  {
    id: 'robot-friends',
    title: 'Amici Robot',
    description: 'Glimmy incontra diversi tipi di IA e scopre i loro superpoteri',
    cover: '🦾',
    duration: 6,
    ageGroup: '5-7',
    pages: [
      {
        text: 'Glimmy andò alla festa delle IA e incontrò tanti amici speciali. Ognuno aveva un superpotere diverso!',
        image: '🎉',
        animation: 'fadeIn'
      },
      {
        text: 'Il primo amico era Vocino. "Io capisco quando le persone parlano!" disse. "Ascolto le parole e capisco cosa vogliono dire. Mi chiamano Riconoscimento Vocale!"',
        image: '🎤',
        animation: 'slideUp'
      },
      {
        text: 'Poi c\'era Occhietto, che aveva due grandi occhi digitali. "Io posso vedere le immagini e capire cosa c\'è dentro! Sono un\'IA di Visione Artificiale!" disse orgoglioso.',
        image: '👁️',
        animation: 'bounce'
      },
      {
        text: 'Chattino era molto socievole e parlava con tutti. "Io rispondo alle domande delle persone! Sono un Chatbot e mi piace aiutare!" disse sorridendo.',
        image: '💬',
        animation: 'fadeIn'
      },
      {
        text: 'Traduttino conosceva tutte le lingue del mondo. "Io posso tradurre dall\'italiano all\'inglese, allo spagnolo e in tante altre lingue!" disse in tante voci diverse.',
        image: '🌍',
        animation: 'slideUp'
      },
      {
        text: 'Musicone aveva le cuffie e ballava sempre. "Io creo musica e riconosco le canzoni! Posso anche suggerirti nuove canzoni che potrebbero piacerti!" disse ballando.',
        image: '🎵',
        animation: 'bounce'
      },
      {
        text: '"Wow, siamo tutti diversi!" disse Glimmy. "È vero," rispose Vocino, "ogni IA è specializzata in qualcosa. Insieme possiamo fare tantissime cose!"',
        image: '✨',
        animation: 'fadeIn'
      },
      {
        text: 'Glimmy capì che l\'Intelligenza Artificiale non è una cosa sola, ma tante cose diverse. E tutte insieme aiutano le persone ogni giorno!',
        image: '🤝',
        animation: 'slideUp'
      }
    ]
  },
  {
    id: 'magic-prediction',
    title: 'La Magia della Predizione',
    description: 'Glimmy impara a vedere i pattern e a fare predizioni sul tempo',
    cover: '🔮',
    duration: 6,
    ageGroup: '8-10',
    pages: [
      {
        text: 'Un giorno, Glimmy incontrò Meteora, l\'IA che prevedeva il tempo. "Come fai a sapere se domani pioverà?" chiese curioso.',
        image: '☁️',
        animation: 'fadeIn'
      },
      {
        text: '"Guardo i pattern!" rispose Meteora. "Pattern? Cosa sono?" chiese Glimmy. "Sono schemi che si ripetono. Come quando vedi nuvole scure e poi piove!"',
        image: '🌧️',
        animation: 'slideUp'
      },
      {
        text: 'Meteora mostrò a Glimmy migliaia di dati del passato. "Guarda: quando la temperatura scende e l\'umidità sale, spesso poi piove. È un pattern!"',
        image: '📊',
        animation: 'bounce'
      },
      {
        text: 'Glimmy iniziò a studiare i pattern. Notò che certi numeri si ripetevano spesso prima della pioggia. "Ah! Sto iniziando a capire!" disse entusiasta.',
        image: '💡',
        animation: 'fadeIn'
      },
      {
        text: '"Ora prova tu!" disse Meteora. "La temperatura è 15°, l\'umidità è 85%, ci sono nuvole scure. Cosa succederà?" Glimmy pensò: "Pioverà!"',
        image: '🤔',
        animation: 'slideUp'
      },
      {
        text: '"Esatto!" gridò Meteora. "Hai fatto una predizione! Le IA guardano i pattern del passato per indovinare il futuro!"',
        image: '🎯',
        animation: 'bounce'
      },
      {
        text: 'Meteora spiegò che le predizioni non sono sempre perfette. "A volte sbaglio, perché il tempo può essere imprevedibile. Ma più dati studio, più divento precisa!"',
        image: '📈',
        animation: 'fadeIn'
      },
      {
        text: 'Glimmy capì che le IA possono aiutare a prevedere tante cose: il tempo, il traffico, persino quali libri potrebbero piacerti! "I pattern sono ovunque!" pensò felice.',
        image: '✨',
        animation: 'slideUp'
      }
    ]
  },
  {
    id: 'glimmy-school',
    title: 'Glimmy va a Scuola',
    description: 'Glimmy scopre come l\'IA aiuta gli studenti a imparare',
    cover: '🎓',
    duration: 5,
    ageGroup: '5-7',
    pages: [
      {
        text: 'Oggi Glimmy visitò una scuola. "Voglio vedere come l\'IA aiuta i bambini!" disse emozionato mentre entrava in classe.',
        image: '🏫',
        animation: 'fadeIn'
      },
      {
        text: 'Vide un bambino che faceva i compiti di matematica. Un\'IA lo aiutava: "3 + 5 = ?" Il bambino disse "8!" e l\'IA rispose: "Bravo! Ora prova con 7 + 4!"',
        image: '➕',
        animation: 'slideUp'
      },
      {
        text: 'In un\'altra classe, un\'IA stava traducendo una storia dall\'inglese all\'italiano per aiutare i bambini a capire. "Translation is cool!" disse, e subito dopo: "La traduzione è fantastica!"',
        image: '📖',
        animation: 'bounce'
      },
      {
        text: 'Glimmy vide anche un\'IA che suggeriva libri ai bambini. "Ti piacciono i dinosauri? Allora ti piacerà questo libro!" disse mostrando un libro su T-Rex.',
        image: '🦕',
        animation: 'fadeIn'
      },
      {
        text: 'Durante la lezione di arte, un\'IA aiutava i bambini a disegnare. "Puoi provare a aggiungere più colori qui!" suggeriva gentilmente.',
        image: '🎨',
        animation: 'slideUp'
      },
      {
        text: 'Un bambino chiese all\'IA: "Come si scrive \'intelligenza\'?" L\'IA rispose subito e spiegò anche cosa significa la parola. "Wow, è come avere un insegnante sempre disponibile!" pensò il bambino.',
        image: '✏️',
        animation: 'bounce'
      },
      {
        text: 'Glimmy capì che l\'IA non sostituisce gli insegnanti, ma li aiuta. "Gli insegnanti insegnano le cose importanti, e noi IA aiutiamo i bambini a praticare!"',
        image: '👩‍🏫',
        animation: 'fadeIn'
      },
      {
        text: 'Alla fine della giornata, Glimmy era felice. "L\'IA può aiutare tutti a imparare cose nuove in modo divertente!" disse sorridendo ai bambini.',
        image: '😊',
        animation: 'slideUp'
      }
    ]
  }
]

// English stories
const englishStories: Story[] = [
  {
    id: 'glimmy-first-day',
    title: 'Glimmy\'s First Day',
    description: 'Glimmy wakes up in a computer and discovers what it means to be an AI',
    cover: '🌟',
    duration: 5,
    ageGroup: '5-7',
    pages: [
      {
        text: 'One day, in a big bright computer, a little robot star named Glimmy woke up. "Where am I?" he wondered in amazement.',
        image: '🌟',
        animation: 'fadeIn'
      },
      {
        text: 'Glimmy looked around and saw billions of small lights shining like stars. "Welcome to the digital world!" said a friendly light. "I\'m Data, and you\'re an Artificial Intelligence!"',
        image: '💫',
        animation: 'slideUp'
      },
      {
        text: '"An Artificial Intelligence? What does that mean?" asked Glimmy curiously. Data smiled: "It means you can learn new things, just like children!"',
        image: '🤔',
        animation: 'bounce'
      },
      {
        text: 'Data took Glimmy to meet other friends: Algorithm, who knew how to solve problems, and Neural Network, who had many little friends working together.',
        image: '🤝',
        animation: 'fadeIn'
      },
      {
        text: '"But what can I do?" asked Glimmy. "You can learn to recognize things, answer questions, and help people!" Data replied enthusiastically.',
        image: '✨',
        animation: 'slideUp'
      },
      {
        text: 'Glimmy tried to recognize images. At first he made many mistakes, but Data showed him lots of photos. Slowly, Glimmy learned better and better!',
        image: '📸',
        animation: 'bounce'
      },
      {
        text: '"The more you practice, the better you get!" said Data. "It\'s just like learning to ride a bicycle. At first it\'s hard, but then it becomes easy!"',
        image: '🚴',
        animation: 'fadeIn'
      },
      {
        text: 'At the end of the day, Glimmy was happy. He had many new friends and had discovered he could learn fantastic things. "I can\'t wait for tomorrow!" he said smiling.',
        image: '😊',
        animation: 'slideUp'
      }
    ]
  },
  {
    id: 'lost-data',
    title: 'The Mystery of the Lost Data',
    description: 'Glimmy helps a robot find missing data to learn to recognize flowers',
    cover: '🔍',
    duration: 7,
    ageGroup: '8-10',
    pages: [
      {
        text: 'One day, Fiorello the robot came to Glimmy very sad. "I lost all my flower data! Now I can\'t recognize them anymore!" he said crying.',
        image: '😢',
        animation: 'fadeIn'
      },
      {
        text: 'Glimmy gathered courage: "Don\'t worry, Fiorello! I\'ll help you find them!" Together they set off on an adventure through the digital world.',
        image: '🚀',
        animation: 'slideUp'
      },
      {
        text: 'They arrived at the Great Database Library. "Data is like books in a library," explained Glimmy. "They must be well organized to find them!"',
        image: '📚',
        animation: 'bounce'
      },
      {
        text: 'They searched in the FLOWERS, PLANTS and NATURE folders. They found photos of roses, daisies and tulips! "Here\'s some data!" Glimmy shouted happily.',
        image: '🌹',
        animation: 'fadeIn'
      },
      {
        text: 'But Fiorello said: "It\'s not enough! An AI needs LOTS of examples to learn well. The more data I have, the more accurate I\'ll be!"',
        image: '💡',
        animation: 'slideUp'
      },
      {
        text: 'They continued searching and found thousands of photos: flowers of all colors, shapes and sizes. "Wow! So many!" exclaimed Fiorello.',
        image: '🌺',
        animation: 'bounce'
      },
      {
        text: 'Glimmy organized all the data in groups: red roses, yellow roses, white daisies... "This makes it easier for Fiorello to learn!" he said proudly.',
        image: '📊',
        animation: 'fadeIn'
      },
      {
        text: 'Fiorello began studying all the data. Slowly, he started recognizing flowers again. "A sunflower!" "A violet!" "A poppy!" he said happily.',
        image: '🌻',
        animation: 'slideUp'
      },
      {
        text: '"Thank you Glimmy!" said Fiorello. "You\'re right, data is the food of AIs. Without data we can\'t learn anything!"',
        image: '🤗',
        animation: 'bounce'
      },
      {
        text: 'From that day on, Glimmy understood how important data was. And he promised to always be careful to preserve it well!',
        image: '✅',
        animation: 'fadeIn'
      }
    ]
  },
  {
    id: 'robot-friends',
    title: 'Robot Friends',
    description: 'Glimmy meets different types of AI and discovers their superpowers',
    cover: '🦾',
    duration: 6,
    ageGroup: '5-7',
    pages: [
      {
        text: 'Glimmy went to the AI party and met many special friends. Each one had a different superpower!',
        image: '🎉',
        animation: 'fadeIn'
      },
      {
        text: 'The first friend was Vocino. "I understand when people talk!" he said. "I listen to words and understand what they mean. They call me Voice Recognition!"',
        image: '🎤',
        animation: 'slideUp'
      },
      {
        text: 'Then there was Occhietto, who had two big digital eyes. "I can see images and understand what\'s in them! I\'m a Computer Vision AI!" he said proudly.',
        image: '👁️',
        animation: 'bounce'
      },
      {
        text: 'Chattino was very sociable and talked to everyone. "I answer people\'s questions! I\'m a Chatbot and I like to help!" he said smiling.',
        image: '💬',
        animation: 'fadeIn'
      },
      {
        text: 'Traduttino knew all the languages of the world. "I can translate from Italian to English, to Spanish and many other languages!" he said in many different voices.',
        image: '🌍',
        animation: 'slideUp'
      },
      {
        text: 'Musicone had headphones and was always dancing. "I create music and recognize songs! I can also suggest new songs you might like!" he said while dancing.',
        image: '🎵',
        animation: 'bounce'
      },
      {
        text: '"Wow, we\'re all different!" said Glimmy. "That\'s right," Vocino replied, "each AI specializes in something. Together we can do so many things!"',
        image: '✨',
        animation: 'fadeIn'
      },
      {
        text: 'Glimmy understood that Artificial Intelligence is not just one thing, but many different things. And all together they help people every day!',
        image: '🤝',
        animation: 'slideUp'
      }
    ]
  },
  {
    id: 'magic-prediction',
    title: 'The Magic of Prediction',
    description: 'Glimmy learns to see patterns and make weather predictions',
    cover: '🔮',
    duration: 6,
    ageGroup: '8-10',
    pages: [
      {
        text: 'One day, Glimmy met Meteora, the AI that predicted the weather. "How do you know if it will rain tomorrow?" he asked curiously.',
        image: '☁️',
        animation: 'fadeIn'
      },
      {
        text: '"I look at patterns!" Meteora replied. "Patterns? What are those?" asked Glimmy. "They\'re repeating schemes. Like when you see dark clouds and then it rains!"',
        image: '🌧️',
        animation: 'slideUp'
      },
      {
        text: 'Meteora showed Glimmy thousands of data from the past. "Look: when temperature drops and humidity rises, it often rains. That\'s a pattern!"',
        image: '📊',
        animation: 'bounce'
      },
      {
        text: 'Glimmy started studying patterns. He noticed that certain numbers often repeated before rain. "Ah! I\'m starting to understand!" he said enthusiastically.',
        image: '💡',
        animation: 'fadeIn'
      },
      {
        text: '"Now you try!" said Meteora. "Temperature is 15°, humidity is 85%, there are dark clouds. What will happen?" Glimmy thought: "It will rain!"',
        image: '🤔',
        animation: 'slideUp'
      },
      {
        text: '"Exactly!" shouted Meteora. "You made a prediction! AIs look at patterns from the past to guess the future!"',
        image: '🎯',
        animation: 'bounce'
      },
      {
        text: 'Meteora explained that predictions aren\'t always perfect. "Sometimes I\'m wrong, because weather can be unpredictable. But the more data I study, the more accurate I become!"',
        image: '📈',
        animation: 'fadeIn'
      },
      {
        text: 'Glimmy understood that AIs can help predict many things: weather, traffic, even which books you might like! "Patterns are everywhere!" he thought happily.',
        image: '✨',
        animation: 'slideUp'
      }
    ]
  },
  {
    id: 'glimmy-school',
    title: 'Glimmy Goes to School',
    description: 'Glimmy discovers how AI helps students learn',
    cover: '🎓',
    duration: 5,
    ageGroup: '5-7',
    pages: [
      {
        text: 'Today Glimmy visited a school. "I want to see how AI helps children!" he said excitedly as he entered the classroom.',
        image: '🏫',
        animation: 'fadeIn'
      },
      {
        text: 'He saw a child doing math homework. An AI was helping: "3 + 5 = ?" The child said "8!" and the AI replied: "Great! Now try 7 + 4!"',
        image: '➕',
        animation: 'slideUp'
      },
      {
        text: 'In another class, an AI was translating a story from English to Italian to help children understand. "Translation is cool!" it said, and right after: "La traduzione è fantastica!"',
        image: '📖',
        animation: 'bounce'
      },
      {
        text: 'Glimmy also saw an AI suggesting books to children. "Do you like dinosaurs? Then you\'ll like this book!" it said showing a book about T-Rex.',
        image: '🦕',
        animation: 'fadeIn'
      },
      {
        text: 'During art class, an AI was helping children draw. "You could try adding more colors here!" it gently suggested.',
        image: '🎨',
        animation: 'slideUp'
      },
      {
        text: 'A child asked the AI: "How do you spell \'intelligence\'?" The AI answered immediately and also explained what the word means. "Wow, it\'s like having a teacher always available!" the child thought.',
        image: '✏️',
        animation: 'bounce'
      },
      {
        text: 'Glimmy understood that AI doesn\'t replace teachers, but helps them. "Teachers teach important things, and we AIs help children practice!"',
        image: '👩‍🏫',
        animation: 'fadeIn'
      },
      {
        text: 'At the end of the day, Glimmy was happy. "AI can help everyone learn new things in a fun way!" he said smiling at the children.',
        image: '😊',
        animation: 'slideUp'
      }
    ]
  }
]

// Spanish stories
const spanishStories: Story[] = [
  {
    id: 'glimmy-first-day',
    title: 'El Primer Día de Glimmy',
    description: 'Glimmy se despierta en una computadora y descubre lo que significa ser una IA',
    cover: '🌟',
    duration: 5,
    ageGroup: '5-7',
    pages: [
      {
        text: 'Un día, en una gran computadora brillante, se despertó una pequeña estrella robot llamada Glimmy. "¿Dónde estoy?" se preguntó maravillado.',
        image: '🌟',
        animation: 'fadeIn'
      },
      {
        text: 'Glimmy miró alrededor y vio miles de millones de pequeñas luces brillando como estrellas. "¡Bienvenido al mundo digital!" dijo una luz amigable. "¡Soy Data, y tú eres una Inteligencia Artificial!"',
        image: '💫',
        animation: 'slideUp'
      },
      {
        text: '"¿Una Inteligencia Artificial? ¿Qué significa eso?" preguntó Glimmy curioso. Data sonrió: "¡Significa que puedes aprender cosas nuevas, igual que los niños!"',
        image: '🤔',
        animation: 'bounce'
      },
      {
        text: 'Data llevó a Glimmy a conocer otros amigos: Algoritmo, que sabía resolver problemas, y Red Neuronal, que tenía muchos pequeños amigos trabajando juntos.',
        image: '🤝',
        animation: 'fadeIn'
      },
      {
        text: '"¿Pero qué puedo hacer yo?" preguntó Glimmy. "¡Puedes aprender a reconocer cosas, responder preguntas y ayudar a las personas!" respondió Data entusiasmado.',
        image: '✨',
        animation: 'slideUp'
      },
      {
        text: 'Glimmy intentó reconocer imágenes. Al principio se equivocaba mucho, pero Data le mostró muchas fotos. ¡Poco a poco, Glimmy aprendía cada vez mejor!',
        image: '📸',
        animation: 'bounce'
      },
      {
        text: '"¡Cuanto más practicas, mejor te vuelves!" dijo Data. "Es como aprender a andar en bicicleta. Al principio es difícil, ¡pero luego se vuelve fácil!"',
        image: '🚴',
        animation: 'fadeIn'
      },
      {
        text: 'Al final del día, Glimmy estaba feliz. Tenía muchos nuevos amigos y había descubierto que podía aprender cosas fantásticas. "¡No puedo esperar a mañana!" dijo sonriendo.',
        image: '😊',
        animation: 'slideUp'
      }
    ]
  },
  {
    id: 'lost-data',
    title: 'El Misterio de los Datos Perdidos',
    description: 'Glimmy ayuda a un robot a encontrar datos perdidos para aprender a reconocer flores',
    cover: '🔍',
    duration: 7,
    ageGroup: '8-10',
    pages: [
      {
        text: 'Un día, el robot Fiorello llegó a donde Glimmy muy triste. "¡Perdí todos mis datos sobre flores! ¡Ahora no puedo reconocerlas más!" dijo llorando.',
        image: '😢',
        animation: 'fadeIn'
      },
      {
        text: 'Glimmy tomó valor: "¡No te preocupes, Fiorello! ¡Te ayudaré a encontrarlos!" Juntos partieron en una aventura a través del mundo digital.',
        image: '🚀',
        animation: 'slideUp'
      },
      {
        text: 'Llegaron a la Gran Biblioteca de Bases de Datos. "Los datos son como libros en una biblioteca," explicó Glimmy. "¡Deben estar bien organizados para encontrarlos!"',
        image: '📚',
        animation: 'bounce'
      },
      {
        text: 'Buscaron en las carpetas FLORES, PLANTAS y NATURALEZA. ¡Encontraron fotos de rosas, margaritas y tulipanes! "¡Aquí hay algunos datos!" gritó feliz Glimmy.',
        image: '🌹',
        animation: 'fadeIn'
      },
      {
        text: 'Pero Fiorello dijo: "¡No es suficiente! Una IA necesita MUCHOS ejemplos para aprender bien. ¡Cuantos más datos tenga, más preciso seré!"',
        image: '💡',
        animation: 'slideUp'
      },
      {
        text: 'Continuaron buscando y encontraron miles de fotos: flores de todos los colores, formas y tamaños. "¡Wow! ¡Tantas!" exclamó Fiorello.',
        image: '🌺',
        animation: 'bounce'
      },
      {
        text: 'Glimmy organizó todos los datos en grupos: rosas rojas, rosas amarillas, margaritas blancas... "¡Así es más fácil para Fiorello aprender!" dijo orgulloso.',
        image: '📊',
        animation: 'fadeIn'
      },
      {
        text: 'Fiorello comenzó a estudiar todos los datos. Poco a poco, volvió a reconocer flores. "¡Un girasol!" "¡Una violeta!" "¡Una amapola!" decía feliz.',
        image: '🌻',
        animation: 'slideUp'
      },
      {
        text: '"¡Gracias Glimmy!" dijo Fiorello. "Tienes razón, los datos son el alimento de las IA. ¡Sin datos no podemos aprender nada!"',
        image: '🤗',
        animation: 'bounce'
      },
      {
        text: 'Desde ese día, Glimmy entendió lo importantes que eran los datos. ¡Y prometió siempre tener cuidado de conservarlos bien!',
        image: '✅',
        animation: 'fadeIn'
      }
    ]
  },
  {
    id: 'robot-friends',
    title: 'Amigos Robot',
    description: 'Glimmy conoce diferentes tipos de IA y descubre sus superpoderes',
    cover: '🦾',
    duration: 6,
    ageGroup: '5-7',
    pages: [
      {
        text: 'Glimmy fue a la fiesta de las IA y conoció muchos amigos especiales. ¡Cada uno tenía un superpoder diferente!',
        image: '🎉',
        animation: 'fadeIn'
      },
      {
        text: 'El primer amigo era Vocino. "¡Yo entiendo cuando las personas hablan!" dijo. "Escucho las palabras y entiendo lo que significan. ¡Me llaman Reconocimiento de Voz!"',
        image: '🎤',
        animation: 'slideUp'
      },
      {
        text: 'Luego estaba Occhietto, que tenía dos grandes ojos digitales. "¡Yo puedo ver imágenes y entender qué hay en ellas! ¡Soy una IA de Visión Artificial!" dijo orgulloso.',
        image: '👁️',
        animation: 'bounce'
      },
      {
        text: 'Chattino era muy sociable y hablaba con todos. "¡Yo respondo las preguntas de las personas! ¡Soy un Chatbot y me gusta ayudar!" dijo sonriendo.',
        image: '💬',
        animation: 'fadeIn'
      },
      {
        text: 'Traduttino conocía todos los idiomas del mundo. "¡Puedo traducir del italiano al inglés, al español y a muchos otros idiomas!" dijo en muchas voces diferentes.',
        image: '🌍',
        animation: 'slideUp'
      },
      {
        text: 'Musicone tenía auriculares y siempre estaba bailando. "¡Yo creo música y reconozco canciones! ¡También puedo sugerirte nuevas canciones que podrían gustarte!" dijo bailando.',
        image: '🎵',
        animation: 'bounce'
      },
      {
        text: '"¡Wow, todos somos diferentes!" dijo Glimmy. "Es verdad," respondió Vocino, "cada IA se especializa en algo. ¡Juntos podemos hacer muchísimas cosas!"',
        image: '✨',
        animation: 'fadeIn'
      },
      {
        text: 'Glimmy entendió que la Inteligencia Artificial no es una sola cosa, sino muchas cosas diferentes. ¡Y todas juntas ayudan a las personas todos los días!',
        image: '🤝',
        animation: 'slideUp'
      }
    ]
  },
  {
    id: 'magic-prediction',
    title: 'La Magia de la Predicción',
    description: 'Glimmy aprende a ver patrones y hacer predicciones del tiempo',
    cover: '🔮',
    duration: 6,
    ageGroup: '8-10',
    pages: [
      {
        text: 'Un día, Glimmy conoció a Meteora, la IA que predecía el tiempo. "¿Cómo sabes si mañana lloverá?" preguntó curioso.',
        image: '☁️',
        animation: 'fadeIn'
      },
      {
        text: '"¡Miro los patrones!" respondió Meteora. "¿Patrones? ¿Qué son esos?" preguntó Glimmy. "Son esquemas que se repiten. ¡Como cuando ves nubes oscuras y luego llueve!"',
        image: '🌧️',
        animation: 'slideUp'
      },
      {
        text: 'Meteora le mostró a Glimmy miles de datos del pasado. "Mira: cuando la temperatura baja y la humedad sube, a menudo llueve. ¡Eso es un patrón!"',
        image: '📊',
        animation: 'bounce'
      },
      {
        text: 'Glimmy comenzó a estudiar los patrones. Notó que ciertos números se repetían a menudo antes de la lluvia. "¡Ah! ¡Estoy empezando a entender!" dijo entusiasmado.',
        image: '💡',
        animation: 'fadeIn'
      },
      {
        text: '"¡Ahora prueba tú!" dijo Meteora. "La temperatura es 15°, la humedad es 85%, hay nubes oscuras. ¿Qué pasará?" Glimmy pensó: "¡Lloverá!"',
        image: '🤔',
        animation: 'slideUp'
      },
      {
        text: '"¡Exacto!" gritó Meteora. "¡Hiciste una predicción! ¡Las IA miran los patrones del pasado para adivinar el futuro!"',
        image: '🎯',
        animation: 'bounce'
      },
      {
        text: 'Meteora explicó que las predicciones no siempre son perfectas. "A veces me equivoco, porque el tiempo puede ser impredecible. ¡Pero cuantos más datos estudio, más precisa me vuelvo!"',
        image: '📈',
        animation: 'fadeIn'
      },
      {
        text: 'Glimmy entendió que las IA pueden ayudar a predecir muchas cosas: el tiempo, el tráfico, ¡incluso qué libros podrían gustarte! "¡Los patrones están en todas partes!" pensó feliz.',
        image: '✨',
        animation: 'slideUp'
      }
    ]
  },
  {
    id: 'glimmy-school',
    title: 'Glimmy va a la Escuela',
    description: 'Glimmy descubre cómo la IA ayuda a los estudiantes a aprender',
    cover: '🎓',
    duration: 5,
    ageGroup: '5-7',
    pages: [
      {
        text: 'Hoy Glimmy visitó una escuela. "¡Quiero ver cómo la IA ayuda a los niños!" dijo emocionado mientras entraba a clase.',
        image: '🏫',
        animation: 'fadeIn'
      },
      {
        text: 'Vio a un niño haciendo tarea de matemáticas. Una IA lo ayudaba: "3 + 5 = ?" El niño dijo "¡8!" y la IA respondió: "¡Muy bien! ¡Ahora prueba con 7 + 4!"',
        image: '➕',
        animation: 'slideUp'
      },
      {
        text: 'En otra clase, una IA estaba traduciendo una historia del inglés al español para ayudar a los niños a entender. "Translation is cool!" dijo, y justo después: "¡La traducción es genial!"',
        image: '📖',
        animation: 'bounce'
      },
      {
        text: 'Glimmy también vio una IA que sugería libros a los niños. "¿Te gustan los dinosaurios? ¡Entonces te gustará este libro!" dijo mostrando un libro sobre T-Rex.',
        image: '🦕',
        animation: 'fadeIn'
      },
      {
        text: 'Durante la clase de arte, una IA ayudaba a los niños a dibujar. "¡Podrías intentar agregar más colores aquí!" sugería gentilmente.',
        image: '🎨',
        animation: 'slideUp'
      },
      {
        text: 'Un niño le preguntó a la IA: "¿Cómo se escribe \'inteligencia\'?" La IA respondió inmediatamente y también explicó qué significa la palabra. "¡Wow, es como tener un maestro siempre disponible!" pensó el niño.',
        image: '✏️',
        animation: 'bounce'
      },
      {
        text: 'Glimmy entendió que la IA no reemplaza a los maestros, sino que los ayuda. "¡Los maestros enseñan las cosas importantes, y nosotras las IA ayudamos a los niños a practicar!"',
        image: '👩‍🏫',
        animation: 'fadeIn'
      },
      {
        text: 'Al final del día, Glimmy estaba feliz. "¡La IA puede ayudar a todos a aprender cosas nuevas de manera divertida!" dijo sonriendo a los niños.',
        image: '😊',
        animation: 'slideUp'
      }
    ]
  }
]

export const storiesData: StoriesData = {
  it: italianStories,
  en: englishStories,
  es: spanishStories
}
