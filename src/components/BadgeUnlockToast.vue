<template>
  <Teleport to="body">
    <Transition name="toast">
      <div v-if="current" class="toast-wrap" role="status">
        <div class="card toast flex items-center gap-4 px-5 py-4">
          <div class="badge-emoji">{{ current.emoji }}</div>
          <div class="min-w-0">
            <p class="text-xs font-bold uppercase tracking-wider text-sun-500">
              {{ t('rewards.unlockedToast') }}
            </p>
            <p class="font-display font-bold text-ink truncate">{{ localizedName }}</p>
            <p class="text-sm text-ink-soft truncate">{{ localizedDescription }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useProgress } from '../composables/useProgress'
import { useSound } from '../composables/useSound'
import { useGlimmy } from '../composables/useGlimmy'
import { rewardsData, type Badge } from '../data/rewards'

const { t, locale } = useI18n()
const { newlyUnlocked, consumeNewBadges } = useProgress()
const { playUnlock } = useSound()
const { react } = useGlimmy()

const queue = ref<Badge[]>([])
const current = ref<Badge | null>(null)

watch(newlyUnlocked, (badges) => {
  if (badges.length > 0) {
    queue.value.push(...consumeNewBadges())
    if (!current.value) showNext()
  }
}, { deep: true })

function showNext() {
  const next = queue.value.shift()
  if (!next) {
    current.value = null
    return
  }
  current.value = next
  playUnlock()
  react('celebrate', 2000)
  setTimeout(() => {
    current.value = null
    setTimeout(showNext, 400)
  }, 3800)
}

/* Nome e descrizione del badge nella lingua corrente */
const localizedBadge = computed(() => {
  if (!current.value) return null
  const list = rewardsData[locale.value] || rewardsData.it
  return list.find(b => b.id === current.value!.id) || current.value
})

const localizedName = computed(() => localizedBadge.value?.name || '')
const localizedDescription = computed(() => localizedBadge.value?.description || '')
</script>

<style scoped>
.toast-wrap {
  position: fixed;
  top: 1.25rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  width: min(92vw, 380px);
}

.toast {
  border: 2px solid rgba(247, 179, 43, 0.5);
}

.badge-emoji {
  font-size: 2.4rem;
  line-height: 1;
  animation: badge-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes badge-pop {
  0% { transform: scale(0) rotate(-30deg); }
  70% { transform: scale(1.25) rotate(8deg); }
  100% { transform: scale(1) rotate(0); }
}

.toast-enter-active {
  transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.toast-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-16px) scale(0.95);
}
.toast-enter-to,
.toast-leave-from {
  transform: translateX(-50%) translateY(0) scale(1);
}
</style>
