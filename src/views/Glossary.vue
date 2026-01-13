<template>
  <AnimatedBackground theme="purple-blue" :particles="true">
    <div class="container mx-auto p-6 max-w-7xl">
      <!-- Header -->
      <div class="mb-8 mt-16">
        <h1 class="text-5xl font-bold text-white mb-4">
          {{ $t('glossary.title') }}
        </h1>
        <p class="text-xl text-white/80">
          {{ $t('glossary.subtitle') }}
        </p>
      </div>

      <!-- Category Filters -->
      <div class="flex flex-wrap gap-4 mb-8">
        <GlassButton
          v-for="cat in categories"
          :key="cat"
          @click="activeCategory = cat"
          :variant="activeCategory === cat ? 'primary' : 'secondary'"
          size="md"
        >
          {{ $t(`glossary.categories.${cat}`) }}
        </GlassButton>
      </div>

      <!-- Search Bar -->
      <div class="mb-8">
        <input
          v-model="searchQuery"
          type="search"
          :placeholder="$t('glossary.search')"
          class="glass-input w-full p-4 text-white text-lg placeholder-white/50 rounded-xl"
        />
      </div>

      <!-- No Results Message -->
      <div v-if="filteredTerms.length === 0" class="text-center py-12">
        <GlassCard depth="medium">
          <div class="p-8">
            <p class="text-2xl text-white">{{ $t('glossary.noResults') }}</p>
          </div>
        </GlassCard>
      </div>

      <!-- Terms Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        <GlossaryCard
          v-for="term in filteredTerms"
          :key="term.id"
          :term="term"
          :viewed="viewedTerms.includes(term.id)"
          @viewed="markAsViewed"
        />
      </div>

      <!-- Progress Tracker -->
      <div class="mt-12">
        <GlassCard depth="medium">
          <div class="p-6 text-center">
            <p class="text-2xl text-white font-semibold mb-2">
              {{ $t('glossary.progress') }}
            </p>
            <p class="text-4xl text-white font-bold mb-4">
              {{ viewedCount }} / {{ totalTerms }}
            </p>
            <div class="w-full h-4 bg-white/10 rounded-full overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                :style="{ width: progressPercent + '%' }"
              ></div>
            </div>
            <p class="text-sm text-white/70 mt-4">
              {{ $t('glossary.viewedTerms', { count: viewedCount }) }}
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  </AnimatedBackground>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import AnimatedBackground from '../components/AnimatedBackground.vue'
import GlassButton from '../components/GlassButton.vue'
import GlassCard from '../components/GlassCard.vue'
import GlossaryCard from '../components/GlossaryCard.vue'
import { glossaryData } from '../data/glossary'

const { locale } = useI18n()

const categories = ['all', 'basics', 'concepts', 'applications']
const activeCategory = ref<string>('all')
const searchQuery = ref<string>('')
const viewedTerms = ref<string[]>([])

// Get terms for current locale
const terms = computed(() => glossaryData[locale.value] || glossaryData.it)

// Filter terms by category and search
const filteredTerms = computed(() => {
  let filtered = terms.value

  // Filter by category
  if (activeCategory.value !== 'all') {
    filtered = filtered.filter(term => term.category === activeCategory.value)
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(term =>
      term.term.toLowerCase().includes(query) ||
      term.definition.toLowerCase().includes(query) ||
      (term.example && term.example.toLowerCase().includes(query))
    )
  }

  return filtered
})

// Progress tracking
const totalTerms = computed(() => terms.value.length)
const viewedCount = computed(() => viewedTerms.value.length)
const progressPercent = computed(() =>
  totalTerms.value > 0 ? Math.round((viewedCount.value / totalTerms.value) * 100) : 0
)

// Mark term as viewed
const markAsViewed = (termId: string) => {
  if (!viewedTerms.value.includes(termId)) {
    viewedTerms.value.push(termId)
    saveViewedTerms()
  }
}

// LocalStorage persistence
const STORAGE_KEY = 'glimmy-glossary-viewed'

const loadViewedTerms = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      viewedTerms.value = JSON.parse(stored)
    }
  } catch (error) {
    console.error('Failed to load viewed terms:', error)
  }
}

const saveViewedTerms = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(viewedTerms.value))
  } catch (error) {
    console.error('Failed to save viewed terms:', error)
  }
}

// Load viewed terms on mount
onMounted(() => {
  loadViewedTerms()
})
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
</style>
