<template>
  <AnimatedBackground>
    <div class="page max-w-6xl">
      <!-- Header -->
      <div class="mb-10 text-center animate-rise-in">
        <h1 class="page-title">{{ $t('rewards.title') }}</h1>
        <p class="page-subtitle">{{ $t('rewards.subtitle') }}</p>
      </div>

      <!-- Stats Dashboard -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12 stagger">
        <StatItem
          icon="🎮"
          :value="progress.totalGamesPlayed"
          :label="$t('rewards.stats.totalGames')"
        />
        <StatItem
          icon="🔥"
          :value="progress.streakDays"
          :label="$t('rewards.stats.streak')"
        />
        <StatItem
          icon="⭐"
          :value="progress.totalPoints"
          :label="$t('rewards.stats.points')"
        />
        <StatItem
          icon="🗺️"
          :value="progress.sectionsVisited.length"
          :label="$t('rewards.stats.sectionsVisited')"
        />
        <StatItem
          icon="🏆"
          :value="progress.unlockedBadges.length"
          :label="$t('rewards.stats.badgesUnlocked')"
          :sublabel="`${progress.unlockedBadges.length} / ${badges.length}`"
        />
      </div>

      <!-- Filter by Rarity -->
      <div class="mb-8 flex flex-wrap justify-center gap-2.5">
        <button
          v-for="rarity in rarities"
          :key="rarity"
          @click="activeRarity = rarity"
          class="filter-chip"
          :class="{ active: activeRarity === rarity }"
        >
          {{ $t(`rewards.badges.${rarity}`) }}
          <span class="opacity-60">({{ getBadgeCountByRarity(rarity) }})</span>
        </button>
      </div>

      <!-- Badges Grid -->
      <div class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 stagger">
        <BadgeCard
          v-for="badge in filteredBadges"
          :key="badge.id"
          :badge="badge"
          :unlocked="isUnlocked(badge.id)"
          :progress="getBadgeProgress(badge)"
          :progress-current="getBadgeProgressCurrent(badge)"
          :progress-total="getBadgeProgressTotal(badge)"
          @click="showBadgeDetails(badge)"
        />
      </div>

      <!-- Empty state -->
      <div v-if="filteredBadges.length === 0" class="text-center py-12">
        <p class="text-xl text-ink-soft">{{ $t('rewards.noBadgesInCategory') }}</p>
      </div>

      <!-- Badge Details Modal -->
      <Transition name="fade">
        <div
          v-if="selectedBadge"
          class="fixed inset-0 flex items-center justify-center z-50 p-6"
          @click.self="closeBadgeDetails"
        >
          <div class="absolute inset-0 bg-ink/30 backdrop-blur-sm" />
          <div class="card relative z-10 max-w-md w-full p-8 animate-pop-in">
            <button
              @click="closeBadgeDetails"
              class="absolute top-4 right-4 text-ink-faint hover:text-ink transition"
              :aria-label="$t('common.close')"
            >
              <AppIcon name="x" :size="22" />
            </button>

            <div class="text-7xl text-center mb-4" :class="{ 'grayscale opacity-40': !isUnlocked(selectedBadge.id) }">
              {{ selectedBadge.emoji }}
            </div>

            <h3 class="font-display text-2xl font-bold text-ink text-center mb-2">
              {{ selectedBadge.name }}
            </h3>

            <div class="flex justify-center mb-4">
              <span class="chip text-xs bg-sun-50 text-sun-600">
                {{ $t(`rewards.badges.${selectedBadge.rarity}`) }}
              </span>
            </div>

            <p class="text-ink-soft text-center mb-6">
              {{ selectedBadge.description }}
            </p>

            <div class="text-center">
              <div v-if="isUnlocked(selectedBadge.id)">
                <p class="text-lg text-mint-500 font-bold flex items-center justify-center gap-2">
                  <AppIcon name="check" :size="20" />
                  {{ $t('rewards.unlocked') }}
                </p>
              </div>
              <div v-else>
                <p class="text-lg text-ink-faint font-semibold mb-1">
                  🔒 {{ $t('rewards.locked') }}
                </p>
                <p class="text-sm text-ink-faint italic">
                  {{ $t('rewards.howToUnlock') }}
                </p>
              </div>
            </div>

            <!-- Share button (if unlocked) -->
            <div v-if="isUnlocked(selectedBadge.id)" class="mt-6">
              <GlassButton @click="shareBadge(selectedBadge)" variant="success" size="md" class="w-full">
                📤 {{ $t('common.share') }}
              </GlassButton>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </AnimatedBackground>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AnimatedBackground from '../components/AnimatedBackground.vue'
import AppIcon from '../components/AppIcon.vue'
import GlassButton from '../components/GlassButton.vue'
import BadgeCard from '../components/BadgeCard.vue'
import StatItem from '../components/StatItem.vue'
import { rewardsData, type Badge } from '../data/rewards'
import { useProgress } from '../composables/useProgress'

const { locale, t } = useI18n()

// Progressi reali e reattivi: si aggiornano giocando
const { progress } = useProgress()

// Get badges for current locale
const badges = computed(() => rewardsData[locale.value] || rewardsData.it)

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

const getBadgeCountByRarity = (rarity: string): number => {
  if (rarity === 'all') return badges.value.length
  return badges.value.filter(b => b.rarity === rarity).length
}

const isUnlocked = (badgeId: string): boolean => {
  return progress.unlockedBadges.includes(badgeId)
}

// Valore corrente verso lo sblocco
const getBadgeProgressCurrent = (badge: Badge): number => {
  const condition = badge.condition

  switch (condition.type) {
    case 'game_complete':
      return condition.target ? progress.gameStats[condition.target]?.completions || 0 : 0
    case 'count':
      if (condition.target === 'prompts') {
        return progress.collections['prompts']?.length || 0
      }
      return progress.totalGamesPlayed
    case 'streak':
      return progress.streakDays
    case 'explore':
      return progress.sectionsVisited.length
    case 'collection':
      if (condition.target === 'badges') return progress.unlockedBadges.length
      return progress.collections[condition.target || '']?.length || 0
    default:
      return 0
  }
}

const getBadgeProgressTotal = (badge: Badge): number => {
  return badge.condition.count || 0
}

const getBadgeProgress = (badge: Badge): number => {
  const total = getBadgeProgressTotal(badge)
  if (total === 0) return 0
  return (getBadgeProgressCurrent(badge) / total) * 100
}

const showBadgeDetails = (badge: Badge) => {
  selectedBadge.value = badge
}

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
      copyToClipboard(shareText)
    })
  } else {
    copyToClipboard(shareText)
  }
}

const copyToClipboard = (text: string) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      alert(t('common.copied'))
    })
  } else {
    const textarea = document.createElement('textarea')
    textarea.value = text
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    alert(t('common.copied'))
  }
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

.grayscale {
  filter: grayscale(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
