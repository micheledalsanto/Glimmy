<template>
  <AnimatedBackground>
    <div class="page max-w-6xl">
      <!-- Header -->
      <div class="mb-10 text-center animate-rise-in">
        <h1 class="page-title">{{ $t('glossary.title') }}</h1>
        <p class="page-subtitle">{{ $t('glossary.subtitle') }}</p>
      </div>

      <!-- Category Filters -->
      <div class="flex flex-wrap justify-center gap-2.5 mb-6">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="activeCategory = cat"
          class="filter-chip"
          :class="{ active: activeCategory === cat }"
        >
          {{ $t(`glossary.categories.${cat}`) }}
        </button>
      </div>

      <!-- Search Bar -->
      <div class="mb-10 max-w-md mx-auto">
        <input
          v-model="searchQuery"
          type="search"
          :placeholder="$t('glossary.search')"
          class="search-input"
        />
      </div>

      <!-- No Results Message -->
      <div v-if="filteredTerms.length === 0" class="text-center py-12">
        <p class="text-xl text-ink-soft">{{ $t('glossary.noResults') }}</p>
      </div>

      <!-- Terms Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-12 stagger">
        <GlossaryCard
          v-for="term in filteredTerms"
          :key="term.id"
          :term="term"
          :viewed="viewedTerms.includes(term.id)"
          @viewed="markAsViewed"
        />
      </div>

      <!-- Progress Tracker -->
      <div class="card max-w-md mx-auto p-6 text-center">
        <p class="font-display text-lg font-bold text-ink mb-1">
          {{ $t('glossary.progress') }}
        </p>
        <p class="font-display text-4xl font-extrabold text-ink mb-4">
          {{ viewedCount }} <span class="text-ink-faint text-2xl">/ {{ totalTerms }}</span>
        </p>
        <div class="w-full h-3 bg-ink/5 rounded-full overflow-hidden">
          <div
            class="h-full bg-sun-400 rounded-full transition-all duration-500"
            :style="{ width: progressPercent + '%' }"
          />
        </div>
        <p class="text-sm text-ink-soft mt-3">
          {{ $t('glossary.viewedTerms', { count: viewedCount }) }}
        </p>
      </div>
    </div>
  </AnimatedBackground>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import AnimatedBackground from '../components/AnimatedBackground.vue'
import GlossaryCard from '../components/GlossaryCard.vue'
import { glossaryData } from '../data/glossary'
import { useProgress } from '../composables/useProgress'

const { locale } = useI18n()
const { recordCollectionItem } = useProgress()

const categories = ['all', 'basics', 'concepts', 'applications']
const activeCategory = ref<string>('all')
const searchQuery = ref<string>('')
const viewedTerms = ref<string[]>([])

// Get terms for current locale
const terms = computed(() => glossaryData[locale.value] || glossaryData.it)

// Filter terms by category and search
const filteredTerms = computed(() => {
  let filtered = terms.value

  if (activeCategory.value !== 'all') {
    filtered = filtered.filter(term => term.category === activeCategory.value)
  }

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
    // Badge "Diplomato del Glossario"
    recordCollectionItem('glossary', termId)
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

onMounted(() => {
  loadViewedTerms()
})
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

.search-input {
  width: 100%;
  padding: 0.9rem 1.4rem;
  border-radius: 9999px;
  font-size: 1.05rem;
  color: #2b2d42;
  background: #ffffff;
  border: 1.5px solid rgba(43, 45, 66, 0.08);
  box-shadow: 0 1px 2px rgba(43, 45, 66, 0.04), 0 8px 24px -8px rgba(43, 45, 66, 0.1);
  outline: none;
  transition: all 0.25s ease;
}

.search-input::placeholder {
  color: #a0a3bd;
}

.search-input:focus {
  border-color: rgba(247, 179, 43, 0.7);
  box-shadow: 0 0 0 4px rgba(247, 179, 43, 0.18);
}
</style>
