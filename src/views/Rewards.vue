<template>
  <AnimatedBackground theme="rainbow" :particles="true">
    <div class="container mx-auto p-6 max-w-7xl">
      <!-- Header -->
      <div class="mb-8 mt-16">
        <h1 class="text-5xl font-bold text-white mb-4">
          {{ $t('rewards.title') }}
        </h1>
        <p class="text-xl text-white/80">
          {{ $t('rewards.subtitle') }}
        </p>
      </div>

      <!-- Stats Dashboard -->
      <div class="stats-panel mb-12">
        <GlassCard depth="deep">
          <div class="p-6">
            <h2 class="text-2xl font-bold text-white mb-6 text-center">
              {{ $t('rewards.stats.title') }}
            </h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              <StatItem
                icon="🎮"
                :value="userProgress.totalGamesPlayed"
                :label="$t('rewards.stats.totalGames')"
              />
              <StatItem
                icon="🔥"
                :value="userProgress.streakDays"
                :label="$t('rewards.stats.streak')"
              />
              <StatItem
                icon="⭐"
                :value="userProgress.totalPoints"
                :label="$t('rewards.stats.points')"
              />
              <StatItem
                icon="🗺️"
                :value="userProgress.sectionsVisited.length"
                :label="$t('rewards.stats.sectionsVisited')"
              />
              <StatItem
                icon="🏆"
                :value="userProgress.unlockedBadges.length"
                :label="$t('rewards.stats.badgesUnlocked')"
                :sublabel="`${userProgress.unlockedBadges.length} / ${badges.length}`"
              />
            </div>
          </div>
        </GlassCard>
      </div>

      <!-- Filter by Rarity -->
      <div class="filter-section mb-8 flex flex-wrap gap-4 items-center">
        <span class="text-white font-semibold">{{ $t('rewards.filterByRarity') }}:</span>
        <GlassButton
          v-for="rarity in rarities"
          :key="rarity"
          @click="activeRarity = rarity"
          :variant="activeRarity === rarity ? 'primary' : 'secondary'"
          size="sm"
        >
          {{ $t(`rewards.badges.${rarity}`) }}
          <span class="ml-2 text-xs opacity-70">
            ({{ getBadgeCountByRarity(rarity) }})
          </span>
        </GlassButton>
      </div>

      <!-- Badges Grid -->
      <div class="badges-section">
        <h2 class="text-3xl font-bold text-white mb-6">
          {{ activeRarity === 'all'
            ? $t('rewards.allBadges')
            : $t(`rewards.badges.${activeRarity}`) + ' ' + $t('rewards.badgesLabel')
          }}
        </h2>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <BadgeCard
            v-for="badge in filteredBadges"
            :key="badge.id"
            :badge="badge"
            :unlocked="isUnlocked(badge.id)"
            :progress="getBadgeProgress(badge)"
            :progress-current="getBadgeProgressCurrent(badge)"
            :progress-total="getBadgeProgressTotal(badge)"
            :unlocked-date="getUnlockedDate(badge.id)"
            @click="showBadgeDetails(badge)"
          />
        </div>

        <!-- Empty state -->
        <div v-if="filteredBadges.length === 0" class="text-center py-12">
          <GlassCard depth="medium">
            <div class="p-8">
              <p class="text-2xl text-white/80">
                {{ $t('rewards.noBadgesInCategory') }}
              </p>
            </div>
          </GlassCard>
        </div>
      </div>

      <!-- Badge Details Modal -->
      <transition name="fade">
        <div
          v-if="selectedBadge"
          class="badge-modal fixed inset-0 flex items-center justify-center z-50 p-6"
          @click.self="closeBadgeDetails"
        >
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <GlassCard depth="deep" class="relative z-10 max-w-lg w-full">
            <div class="p-8">
              <!-- Close button -->
              <button
                @click="closeBadgeDetails"
                class="absolute top-4 right-4 text-white/70 hover:text-white text-2xl"
              >
                ×
              </button>

              <!-- Badge emoji -->
              <div class="text-8xl text-center mb-4">
                {{ selectedBadge.emoji }}
              </div>

              <!-- Badge name -->
              <h3 class="text-3xl font-bold text-white text-center mb-2">
                {{ selectedBadge.name }}
              </h3>

              <!-- Rarity -->
              <div class="flex justify-center mb-4">
                <span class="badge-rarity px-4 py-2 rounded-full text-sm font-semibold">
                  {{ $t(`rewards.badges.${selectedBadge.rarity}`) }}
                </span>
              </div>

              <!-- Description -->
              <p class="text-xl text-white/90 text-center mb-6">
                {{ selectedBadge.description }}
              </p>

              <!-- Unlock status -->
              <div class="text-center">
                <div v-if="isUnlocked(selectedBadge.id)" class="unlocked-status">
                  <span class="text-6xl mb-4 block">✓</span>
                  <p class="text-lg text-green-300 font-semibold">
                    {{ $t('rewards.unlocked') }}
                  </p>
                  <p class="text-sm text-white/60 mt-2">
                    {{ $t('rewards.unlockedOn', { date: formatDate(getUnlockedDate(selectedBadge.id)!) }) }}
                  </p>
                </div>
                <div v-else class="locked-status">
                  <span class="text-6xl mb-4 block opacity-40">🔒</span>
                  <p class="text-lg text-white/70 font-semibold mb-4">
                    {{ $t('rewards.locked') }}
                  </p>
                  <p class="text-sm text-white/60 italic">
                    {{ $t('rewards.howToUnlock') }}
                  </p>
                </div>
              </div>

              <!-- Share button (if unlocked) -->
              <div v-if="isUnlocked(selectedBadge.id)" class="mt-6">
                <GlassButton
                  @click="shareBadge(selectedBadge)"
                  variant="success"
                  size="lg"
                  icon="📤"
                  class="w-full"
                >
                  {{ $t('common.share') }}
                </GlassButton>
              </div>
            </div>
          </GlassCard>
        </div>
      </transition>
    </div>
  </AnimatedBackground>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import AnimatedBackground from '../components/AnimatedBackground.vue'
import GlassButton from '../components/GlassButton.vue'
import GlassCard from '../components/GlassCard.vue'
import BadgeCard from '../components/BadgeCard.vue'
import StatItem from '../components/StatItem.vue'
import { rewardsData, type Badge, type UserProgress, initializeUserProgress, calculatePoints } from '../data/rewards'

const { locale, t } = useI18n()

// Get badges for current locale
const badges = computed(() => rewardsData[locale.value] || rewardsData.it)

// User progress state
const userProgress = ref<UserProgress>(initializeUserProgress())

// Filter state
const rarities = ['all', 'common', 'rare', 'epic', 'legendary'] as const
const activeRarity = ref<typeof rarities[number]>('all')

// Selected badge for modal
const selectedBadge = ref<Badge | null>(null)

// Filtered badges
const filteredBadges = computed(() => {
  if (activeRarity.value === 'all') {
    return badges.value
  }
  return badges.value.filter(b => b.rarity === activeRarity.value)
})

// Get badge count by rarity
const getBadgeCountByRarity = (rarity: string): number => {
  if (rarity === 'all') return badges.value.length
  return badges.value.filter(b => b.rarity === rarity).length
}

// Check if badge is unlocked
const isUnlocked = (badgeId: string): boolean => {
  return userProgress.value.unlockedBadges.includes(badgeId)
}

// Get unlocked date
const getUnlockedDate = (badgeId: string): string | undefined => {
  // This would come from extended UserProgress data
  // For now, return lastVisit as placeholder
  return isUnlocked(badgeId) ? userProgress.value.lastVisit : undefined
}

// Calculate badge progress
const getBadgeProgress = (badge: Badge): number => {
  const condition = badge.condition

  switch (condition.type) {
    case 'game_complete':
      if (!condition.target || !condition.count) return 0
      const completions = userProgress.value.gameStats[condition.target]?.completions || 0
      return (completions / condition.count) * 100

    case 'count':
      if (!condition.count) return 0
      const total = userProgress.value.totalGamesPlayed
      return (total / condition.count) * 100

    case 'streak':
      if (!condition.count) return 0
      return (userProgress.value.streakDays / condition.count) * 100

    case 'explore':
      if (!condition.count) return 0
      return (userProgress.value.sectionsVisited.length / condition.count) * 100

    case 'collection':
      if (condition.target === 'badges' && condition.count) {
        return (userProgress.value.unlockedBadges.length / condition.count) * 100
      }
      return 0

    default:
      return 0
  }
}

// Get progress current value
const getBadgeProgressCurrent = (badge: Badge): number => {
  const condition = badge.condition

  switch (condition.type) {
    case 'game_complete':
      return condition.target ? userProgress.value.gameStats[condition.target]?.completions || 0 : 0
    case 'count':
      return userProgress.value.totalGamesPlayed
    case 'streak':
      return userProgress.value.streakDays
    case 'explore':
      return userProgress.value.sectionsVisited.length
    case 'collection':
      return condition.target === 'badges' ? userProgress.value.unlockedBadges.length : 0
    default:
      return 0
  }
}

// Get progress total value
const getBadgeProgressTotal = (badge: Badge): number => {
  return badge.condition.count || 0
}

// Show badge details
const showBadgeDetails = (badge: Badge) => {
  selectedBadge.value = badge
}

// Close badge details
const closeBadgeDetails = () => {
  selectedBadge.value = null
}

// Share badge
const shareBadge = (badge: Badge) => {
  const shareText = t('rewards.shareText', { badge: badge.name })

  if (navigator.share) {
    navigator.share({
      title: badge.name,
      text: shareText
    }).catch(() => {
      // Fallback to copying to clipboard
      copyToClipboard(shareText)
    })
  } else {
    copyToClipboard(shareText)
  }
}

// Copy to clipboard
const copyToClipboard = (text: string) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      alert(t('common.copied'))
    })
  } else {
    // Fallback for older browsers
    const textarea = document.createElement('textarea')
    textarea.value = text
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    alert(t('common.copied'))
  }
}

// Format date
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  } catch {
    return dateString
  }
}

// LocalStorage persistence
const STORAGE_KEY = 'glimmy-user-progress'

const loadProgress = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      userProgress.value = JSON.parse(stored)
    }
  } catch (error) {
    console.error('Failed to load user progress:', error)
  }
}

const saveProgress = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userProgress.value))
  } catch (error) {
    console.error('Failed to save user progress:', error)
  }
}

// Load progress on mount
onMounted(() => {
  loadProgress()
})
</script>

<style scoped>
.badge-modal {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.badge-rarity {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
}

.unlocked-status,
.locked-status {
  animation: fadeIn 0.4s ease;
}
</style>
