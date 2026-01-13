<template>
  <AnimatedBackground theme="green-cyan" :particles="true">
    <div class="container mx-auto p-6 max-w-5xl">
      <!-- Header -->
      <div class="mb-8 mt-16">
        <h1 class="text-5xl font-bold text-white mb-4">
          {{ $t('prompts.title') }}
        </h1>
        <p class="text-xl text-white/80">
          {{ $t('prompts.subtitle') }}
        </p>
      </div>

      <!-- Category Tabs -->
      <div class="category-tabs mb-8 flex flex-wrap gap-4">
        <GlassButton
          v-for="cat in categories"
          :key="cat"
          @click="selectCategory(cat)"
          :variant="selectedCategory === cat ? 'primary' : 'secondary'"
          size="md"
          :icon="categoryIcons[cat]"
        >
          {{ $t(`prompts.categories.${cat}`) }}
        </GlassButton>
      </div>

      <!-- Template Selection -->
      <div class="template-section mb-8">
        <GlassCard depth="medium">
          <div class="p-6">
            <label class="text-white text-lg font-semibold mb-4 block">
              {{ $t('prompts.selectTemplate') }}
            </label>
            <select
              v-model="selectedTemplateId"
              @change="onTemplateChange"
              class="glass-input w-full p-4 text-white text-lg rounded-xl"
            >
              <option value="" disabled>{{ $t('prompts.chooseTemplate') }}</option>
              <option
                v-for="template in currentTemplates"
                :key="template.id"
                :value="template.id"
              >
                {{ template.label }}
              </option>
            </select>
          </div>
        </GlassCard>
      </div>

      <!-- Prompt Builder -->
      <div v-if="selectedTemplate" class="prompt-builder mb-8">
        <GlassCard depth="deep">
          <div class="p-8">
            <h2 class="text-2xl font-bold text-white mb-6">
              {{ $t('prompts.buildYourPrompt') }}
            </h2>

            <!-- Input Fields -->
            <div class="prompt-fields space-y-4 mb-6">
              <div v-for="(field, index) in selectedTemplate.fields" :key="index" class="field-group">
                <label class="text-white/90 text-sm font-medium mb-2 block">
                  {{ field.label }}
                </label>
                <input
                  v-model="promptValues[index]"
                  :placeholder="field.placeholder"
                  class="glass-input w-full p-4 text-white text-lg rounded-xl"
                  @input="updatePromptPreview"
                />
              </div>
            </div>

            <!-- Prompt Preview -->
            <div v-if="promptPreview" class="prompt-preview mb-6 p-6 bg-white/10 rounded-xl border border-white/20">
              <p class="text-xs text-white/60 mb-2 uppercase tracking-wide">{{ $t('prompts.preview') }}</p>
              <p class="text-lg text-white italic">{{ promptPreview }}</p>
            </div>

            <!-- Generate Button -->
            <GlassButton
              @click="generateResponse"
              variant="success"
              size="xl"
              icon="✨"
              :disabled="!canGenerate"
              class="w-full"
            >
              {{ $t('prompts.tryIt') }}
            </GlassButton>
          </div>
        </GlassCard>
      </div>

      <!-- Response Display -->
      <transition name="fade-slide">
        <div v-if="response" class="response-section mb-8">
          <GlassCard depth="deep">
            <div class="p-8">
              <div class="flex items-start gap-6">
                <!-- Glimmy Avatar -->
                <div class="glimmy-avatar text-7xl flex-shrink-0 animate-float">
                  ✨
                </div>

                <!-- Response Content -->
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-white mb-4">
                    {{ $t('prompts.response') }}
                  </h3>
                  <p class="text-xl text-white/90 leading-relaxed">
                    {{ response }}
                  </p>
                </div>
              </div>

              <!-- Try Another Button -->
              <div class="mt-6 flex gap-4">
                <GlassButton
                  @click="resetPrompt"
                  variant="secondary"
                  size="lg"
                  icon="🔄"
                  class="flex-1"
                >
                  {{ $t('prompts.tryAnother') }}
                </GlassButton>
                <GlassButton
                  @click="generateResponse"
                  variant="primary"
                  size="lg"
                  icon="✨"
                  class="flex-1"
                >
                  {{ $t('prompts.tryAgain') }}
                </GlassButton>
              </div>
            </div>
          </GlassCard>
        </div>
      </transition>

      <!-- Tips Section -->
      <div class="tips-section">
        <GlassCard depth="medium">
          <div class="p-6">
            <h3 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span>💡</span>
              {{ $t('prompts.tips.title') }}
            </h3>
            <ul class="space-y-3">
              <li v-for="i in 4" :key="i" class="text-white/80 text-lg flex items-start gap-3">
                <span class="text-green-400 flex-shrink-0">✓</span>
                <span>{{ $t(`prompts.tips.tip${i}`) }}</span>
              </li>
            </ul>
          </div>
        </GlassCard>
      </div>
    </div>
  </AnimatedBackground>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AnimatedBackground from '../components/AnimatedBackground.vue'
import GlassButton from '../components/GlassButton.vue'
import GlassCard from '../components/GlassCard.vue'

const { t } = useI18n()

// Category management
type Category = 'creative' | 'questions' | 'instructions'

const categories: Category[] = ['creative', 'questions', 'instructions']
const selectedCategory = ref<Category>('creative')

const categoryIcons: Record<Category, string> = {
  creative: '🎨',
  questions: '❓',
  instructions: '📝'
}

// Template definitions
interface TemplateField {
  key: string
  label: string
  placeholder: string
}

interface PromptTemplate {
  id: string
  label: string
  category: Category
  fields: TemplateField[]
  promptTemplate: string
  responses: string[]
}

const templates: PromptTemplate[] = [
  // Creative templates
  {
    id: 'draw',
    label: t('prompts.templates.draw'),
    category: 'creative',
    fields: [
      { key: 'subject', label: t('prompts.fields.subject'), placeholder: 'un drago' },
      { key: 'style', label: t('prompts.fields.style'), placeholder: 'cartone animato' }
    ],
    promptTemplate: 'Disegna {subject} in stile {style}',
    responses: [
      "🎨 Creerei {subject} in stile {style} con colori brillanti e forme divertenti!",
      "✏️ Che bella idea! Un {subject} in stile {style} sarebbe fantastico!",
      "🖌️ Mi piace! Potrei disegnare {subject} in stile {style} con tanti dettagli colorati!"
    ]
  },
  {
    id: 'story',
    label: t('prompts.templates.story'),
    category: 'creative',
    fields: [
      { key: 'character', label: t('prompts.fields.character'), placeholder: 'un robot' },
      { key: 'place', label: t('prompts.fields.place'), placeholder: 'nello spazio' }
    ],
    promptTemplate: 'Racconta una storia su {character} {place}',
    responses: [
      "📖 C'era una volta {character} che viveva {place}... Un giorno incontrò nuovi amici!",
      "✨ Che avventura! {character} {place} scoprì un segreto incredibile...",
      "🌟 Ti racconto di {character} che {place} visse mille avventure emozionanti!"
    ]
  },
  // Questions templates
  {
    id: 'ai-question',
    label: t('prompts.templates.question'),
    category: 'questions',
    fields: [
      { key: 'topic', label: t('prompts.fields.topic'), placeholder: 'i robot' }
    ],
    promptTemplate: 'Cos\'è {topic}?',
    responses: [
      "🤔 {topic}? Che bella domanda! Ti spiego in modo semplice...",
      "💡 Ottima domanda su {topic}! È una cosa interessante da scoprire!",
      "🧠 {topic} è qualcosa di speciale! Glimmy può spiegartelo!"
    ]
  },
  {
    id: 'how-question',
    label: t('prompts.templates.howQuestion'),
    category: 'questions',
    fields: [
      { key: 'action', label: t('prompts.fields.action'), placeholder: 'riconoscere i gatti' }
    ],
    promptTemplate: 'Come fa Glimmy a {action}?',
    responses: [
      "👀 Per {action}, guardo tantissime foto e imparo i dettagli!",
      "📚 Posso {action} perché ho visto tanti esempi diversi!",
      "🔍 Per {action}, uso il mio cervello robotico che trova le somiglianze!"
    ]
  },
  // Instructions templates
  {
    id: 'task',
    label: t('prompts.templates.task'),
    category: 'instructions',
    fields: [
      { key: 'action', label: t('prompts.fields.action'), placeholder: 'traduci' },
      { key: 'object', label: t('prompts.fields.object'), placeholder: 'questa frase' }
    ],
    promptTemplate: '{action} {object}',
    responses: [
      "✓ Certo! Posso {action} {object} per te in un attimo.",
      "👍 Perfetto! Per {action} {object}, farei così...",
      "⚡ Fatto! Ho appena {action} {object} come hai chiesto!"
    ]
  },
  {
    id: 'help',
    label: t('prompts.templates.help'),
    category: 'instructions',
    fields: [
      { key: 'task', label: t('prompts.fields.task'), placeholder: 'fare i compiti' }
    ],
    promptTemplate: 'Aiutami a {task}',
    responses: [
      "📚 Certo! Posso aiutarti a {task}. Ti spiego passo dopo passo!",
      "🤝 Perfetto! Per {task} possiamo lavorare insieme!",
      "💪 Volentieri! Ti aiuto a {task} in modo facile e divertente!"
    ]
  }
]

// Current category templates
const currentTemplates = computed(() =>
  templates.filter(t => t.category === selectedCategory.value)
)

// Selected template
const selectedTemplateId = ref<string>('')
const selectedTemplate = computed(() =>
  templates.find(t => t.id === selectedTemplateId.value)
)

// Prompt values
const promptValues = ref<string[]>([])
const promptPreview = ref<string>('')
const response = ref<string>('')

// Can generate
const canGenerate = computed(() =>
  selectedTemplate.value &&
  promptValues.value.every(v => v && v.trim().length > 0)
)

// Select category
const selectCategory = (category: Category) => {
  selectedCategory.value = category
  selectedTemplateId.value = ''
  resetPrompt()
}

// On template change
const onTemplateChange = () => {
  if (selectedTemplate.value) {
    promptValues.value = new Array(selectedTemplate.value.fields.length).fill('')
    response.value = ''
    updatePromptPreview()
  }
}

// Update prompt preview
const updatePromptPreview = () => {
  if (!selectedTemplate.value) return

  let preview = selectedTemplate.value.promptTemplate
  selectedTemplate.value.fields.forEach((field, index) => {
    const value = promptValues.value[index] || `[${field.placeholder}]`
    preview = preview.replace(`{${field.key}}`, value)
  })

  promptPreview.value = preview
}

// Generate response
const generateResponse = () => {
  if (!selectedTemplate.value || !canGenerate.value) return

  // Pick a random response template
  const responses = selectedTemplate.value.responses
  const randomResponse = responses[Math.floor(Math.random() * responses.length)]

  // Replace placeholders with actual values
  let finalResponse = randomResponse
  selectedTemplate.value.fields.forEach((field, index) => {
    const value = promptValues.value[index]
    finalResponse = finalResponse.replace(new RegExp(`\\{${field.key}\\}`, 'g'), value)
  })

  response.value = finalResponse

  // Track prompt attempt (could integrate with rewards system)
  trackPromptAttempt()
}

// Reset prompt
const resetPrompt = () => {
  selectedTemplateId.value = ''
  promptValues.value = []
  promptPreview.value = ''
  response.value = ''
}

// Track prompt attempt (placeholder for rewards integration)
const trackPromptAttempt = () => {
  // This could update user progress for the "Prompt Pro" badge
  console.log('Prompt attempt tracked')
}
</script>

<style scoped>
.glass-input {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  outline: none;
  transition: all 0.3s ease;
}

.glass-input:focus {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

.glass-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.glass-input option {
  background: rgba(31, 38, 135, 0.9);
  color: white;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
