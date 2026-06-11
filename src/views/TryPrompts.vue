<template>
  <AnimatedBackground>
    <div class="page max-w-4xl">
      <!-- Header -->
      <div class="mb-10 text-center animate-rise-in">
        <h1 class="page-title">{{ $t('prompts.title') }}</h1>
        <p class="page-subtitle">{{ $t('prompts.subtitle') }}</p>
      </div>

      <!-- Category Tabs -->
      <div class="mb-8 flex flex-wrap justify-center gap-2.5">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectCategory(cat)"
          class="filter-chip"
          :class="{ active: selectedCategory === cat }"
        >
          {{ categoryIcons[cat] }} {{ $t(`prompts.categories.${cat}`) }}
        </button>
      </div>

      <!-- Template Selection -->
      <div class="card p-6 mb-6">
        <label class="text-ink font-semibold mb-3 block">
          {{ $t('prompts.selectTemplate') }}
        </label>
        <select
          v-model="selectedTemplateId"
          @change="onTemplateChange"
          class="select-input"
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

      <!-- Prompt Builder -->
      <div v-if="selectedTemplate" class="card p-7 mb-6 animate-pop-in">
        <h2 class="font-display text-xl font-bold text-ink mb-5">
          {{ $t('prompts.buildYourPrompt') }}
        </h2>

        <!-- Input Fields -->
        <div class="space-y-4 mb-6">
          <div v-for="(field, index) in selectedTemplate.fields" :key="index">
            <label class="text-sm font-semibold text-ink-soft mb-1.5 block">
              {{ field.label }}
            </label>
            <input
              v-model="promptValues[index]"
              :placeholder="field.placeholder"
              class="text-input"
              @input="updatePromptPreview"
            />
          </div>
        </div>

        <!-- Prompt Preview -->
        <div v-if="promptPreview" class="mb-6 p-5 bg-cream rounded-2xl border border-ink/5">
          <p class="text-xs text-ink-faint mb-1.5 uppercase tracking-wider font-bold">{{ $t('prompts.preview') }}</p>
          <p class="text-lg text-ink italic">{{ promptPreview }}</p>
        </div>

        <!-- Generate Button -->
        <GlassButton
          @click="generateResponse"
          variant="primary"
          size="lg"
          :disabled="!canGenerate"
          class="w-full"
        >
          ✨ {{ $t('prompts.tryIt') }}
        </GlassButton>
      </div>

      <!-- Response Display -->
      <Transition name="fade-slide">
        <div v-if="response" class="card relative p-7 mb-6 response-card">
          <div class="flex items-start gap-5">
            <!-- Glimmy Avatar -->
            <img :src="glimmy" alt="Glimmy" class="w-16 h-16 flex-shrink-0 animate-float" />

            <!-- Response Content -->
            <div class="flex-1 min-w-0">
              <h3 class="font-display text-lg font-bold text-ink mb-2">
                {{ $t('prompts.response') }}
              </h3>
              <p class="text-lg text-ink-soft leading-relaxed">
                {{ response }}
              </p>
            </div>

            <button
              v-if="ttsSupported"
              class="tts-btn shrink-0"
              :aria-label="$t('common.readAloud')"
              @click="speak(response, locale)"
            >
              <AppIcon name="speaker" :size="18" />
            </button>
          </div>

          <!-- Buttons -->
          <div class="mt-6 flex gap-3 flex-wrap">
            <GlassButton @click="generateResponse" variant="primary" size="md">
              ✨ {{ $t('prompts.tryAgain') }}
            </GlassButton>
            <GlassButton @click="resetPrompt" variant="ghost" size="md">
              {{ $t('prompts.tryAnother') }}
            </GlassButton>
          </div>
        </div>
      </Transition>

      <!-- Tips Section -->
      <div class="card p-6">
        <h3 class="font-display text-xl font-bold text-ink mb-4 flex items-center gap-2">
          <span>💡</span>
          {{ $t('prompts.tips.title') }}
        </h3>
        <ul class="space-y-2.5">
          <li v-for="i in 4" :key="i" class="text-ink-soft flex items-start gap-3">
            <span class="text-mint-400 flex-shrink-0 mt-0.5">
              <AppIcon name="check" :size="18" />
            </span>
            <span>{{ $t(`prompts.tips.tip${i}`) }}</span>
          </li>
        </ul>
      </div>
    </div>
  </AnimatedBackground>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AnimatedBackground from '../components/AnimatedBackground.vue'
import AppIcon from '../components/AppIcon.vue'
import GlassButton from '../components/GlassButton.vue'
import { useProgress } from '../composables/useProgress'
import { useSound } from '../composables/useSound'
import { useSpeech } from '../composables/useSpeech'
import { useGlimmy } from '../composables/useGlimmy'

const { t, locale } = useI18n()
const { recordCollectionItem } = useProgress()
const { playCorrect } = useSound()
const { speak, supported: ttsSupported } = useSpeech()
const { react } = useGlimmy()

const glimmy = new URL('../assets/images/glimmy.png', import.meta.url).href

// Category management
type Category = 'creative' | 'questions' | 'instructions'

const categories: Category[] = ['creative', 'questions', 'instructions']
const selectedCategory = ref<Category>('creative')

const categoryIcons: Record<Category, string> = {
  creative: '🎨',
  questions: '❓',
  instructions: '📝'
}

// Template definitions: struttura statica, testi presi da i18n (reattivi alla lingua)
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
}

const baseTemplates: { id: string; labelKey: string; category: Category; fieldKeys: string[] }[] = [
  { id: 'draw', labelKey: 'draw', category: 'creative', fieldKeys: ['subject', 'style'] },
  { id: 'story', labelKey: 'story', category: 'creative', fieldKeys: ['character', 'place'] },
  { id: 'ai-question', labelKey: 'question', category: 'questions', fieldKeys: ['topic'] },
  { id: 'how-question', labelKey: 'howQuestion', category: 'questions', fieldKeys: ['action'] },
  { id: 'task', labelKey: 'task', category: 'instructions', fieldKeys: ['action', 'object'] },
  { id: 'help', labelKey: 'help', category: 'instructions', fieldKeys: ['task'] }
]

const templates = computed<PromptTemplate[]>(() =>
  baseTemplates.map(b => ({
    id: b.id,
    label: t(`prompts.templates.${b.labelKey}`),
    category: b.category,
    fields: b.fieldKeys.map(key => ({
      key,
      label: t(`prompts.fields.${key}`),
      placeholder: t(`prompts.data.${b.id}.ph.${key}`)
    }))
  }))
)

// Valori correnti dei campi come parametri per l'interpolazione i18n
const fieldParams = (fallbackToPlaceholder = false): Record<string, string> => {
  const params: Record<string, string> = {}
  selectedTemplate.value?.fields.forEach((field, index) => {
    params[field.key] = promptValues.value[index] || (fallbackToPlaceholder ? `[${field.placeholder}]` : '')
  })
  return params
}

// Current category templates
const currentTemplates = computed(() =>
  templates.value.filter(tpl => tpl.category === selectedCategory.value)
)

// Selected template
const selectedTemplateId = ref<string>('')
const selectedTemplate = computed(() =>
  templates.value.find(tpl => tpl.id === selectedTemplateId.value)
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
  promptPreview.value = t(`prompts.data.${selectedTemplate.value.id}.prompt`, fieldParams(true))
}

// Generate response
const generateResponse = () => {
  if (!selectedTemplate.value || !canGenerate.value) return

  const n = Math.floor(Math.random() * 3) + 1
  response.value = t(`prompts.data.${selectedTemplate.value.id}.r${n}`, fieldParams())
  playCorrect()
  react('happy', 2000)

  // Ogni prompt diverso conta per il badge "Pro dei Prompt"
  const promptId = `${selectedTemplate.value.id}:${promptValues.value.join('|').toLowerCase()}`
  recordCollectionItem('prompts', promptId)
}

// Reset prompt
const resetPrompt = () => {
  selectedTemplateId.value = ''
  promptValues.value = []
  promptPreview.value = ''
  response.value = ''
}
</script>

<style scoped>
.filter-chip {
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 0.9rem;
  color: #6e7191;
  background: #ffffff;
  border: 1.5px solid rgba(43, 45, 66, 0.08);
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-chip:hover {
  border-color: rgba(247, 179, 43, 0.5);
  color: #2b2d42;
}

.filter-chip.active {
  background: #f7b32b;
  border-color: #f7b32b;
  color: #2b2d42;
  box-shadow: 0 6px 16px -6px rgba(229, 157, 19, 0.5);
}

.text-input,
.select-input {
  width: 100%;
  padding: 0.85rem 1.2rem;
  border-radius: 1rem;
  font-size: 1.05rem;
  color: #2b2d42;
  background: #fbf8f2;
  border: 1.5px solid rgba(43, 45, 66, 0.08);
  outline: none;
  transition: all 0.25s ease;
}

.text-input::placeholder {
  color: #a0a3bd;
}

.text-input:focus,
.select-input:focus {
  border-color: rgba(247, 179, 43, 0.7);
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(247, 179, 43, 0.18);
}

.select-input {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236e7191' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1.1rem center;
  cursor: pointer;
}

.response-card {
  border-color: rgba(247, 179, 43, 0.35);
}

.tts-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 9999px;
  background: #eef6fc;
  color: #2a6ba5;
  border: none;
  cursor: pointer;
  transition: transform 0.18s ease, background 0.18s ease;
}

.tts-btn:hover {
  background: #d8ebf8;
  transform: scale(1.08);
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
