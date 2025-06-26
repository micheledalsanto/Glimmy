<template>
  <button
    @mouseover="hover = true"
    @mouseleave="hover = false"
    class="w-full h-56 sm:h-64 bg-white text-blue-800 rounded-3xl shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl active:scale-95 flex items-center justify-center text-center"
    :class="{ 'ring-4 ring-yellow-300': hover }"
  >
    <div class="flex flex-col items-center justify-center gap-2">
      <span class="text-6xl sm:text-7xl transition-transform duration-300" :class="{ 'scale-110': hover }">
        {{ icon }}
      </span>
      <span class="text-2xl sm:text-3xl font-medium tracking-wide">
        {{ label }}
      </span>
    </div>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  icon: string
  label: string
}>()

const hover = ref(false)
</script>
