<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2.1"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <template v-if="name === 'gamepad'">
      <path d="M6 11h4M8 9v4" />
      <circle cx="15.5" cy="10.5" r="0.4" fill="currentColor" />
      <circle cx="17.5" cy="12.5" r="0.4" fill="currentColor" />
      <path d="M17.3 5H6.7a4.7 4.7 0 0 0-4.6 5.6l1 5.2a2.7 2.7 0 0 0 4.7 1.2L9.6 15h4.8l1.8 2a2.7 2.7 0 0 0 4.7-1.2l1-5.2A4.7 4.7 0 0 0 17.3 5Z" />
    </template>
    <template v-else-if="name === 'book'">
      <path d="M12 6.5c-1.8-1.6-4.2-2-7-2v13c2.8 0 5.2.4 7 2 1.8-1.6 4.2-2 7-2v-13c-2.8 0-5.2.4-7 2Z" />
      <path d="M12 6.5v13" />
    </template>
    <template v-else-if="name === 'headphones'">
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="3" y="14" width="4.5" height="6" rx="2" />
      <rect x="16.5" y="14" width="4.5" height="6" rx="2" />
    </template>
    <template v-else-if="name === 'trophy'">
      <path d="M8 4h8v6a4 4 0 0 1-8 0V4Z" />
      <path d="M8 5H4.5a3.5 3.5 0 0 0 3.6 4.4M16 5h3.5a3.5 3.5 0 0 1-3.6 4.4" />
      <path d="M12 14v3M8.5 20h7M10 20v-3h4v3" />
    </template>
    <template v-else-if="name === 'brain'">
      <path d="M9.5 4A2.7 2.7 0 0 0 7 7.5 3.3 3.3 0 0 0 5 11a3.3 3.3 0 0 0 1 6 2.8 2.8 0 0 0 4.5 2.2A2.5 2.5 0 0 0 12 17V6.5A2.5 2.5 0 0 0 9.5 4Z" />
      <path d="M14.5 4A2.7 2.7 0 0 1 17 7.5 3.3 3.3 0 0 1 19 11a3.3 3.3 0 0 1-1 6 2.8 2.8 0 0 1-4.5 2.2A2.5 2.5 0 0 1 12 17V6.5A2.5 2.5 0 0 1 14.5 4Z" />
    </template>
    <template v-else-if="name === 'target'">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    </template>
    <template v-else-if="name === 'chat'">
      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.2A8 8 0 1 1 21 12Z" />
      <circle cx="8.5" cy="12" r="0.4" fill="currentColor" />
      <circle cx="12" cy="12" r="0.4" fill="currentColor" />
      <circle cx="15.5" cy="12" r="0.4" fill="currentColor" />
    </template>
    <template v-else-if="name === 'sparkle'">
      <path d="M12 3.5 13.8 9 19.5 11 13.8 13 12 18.5 10.2 13 4.5 11 10.2 9 12 3.5Z" />
      <path d="M18.5 16.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z" />
    </template>
    <template v-else-if="name === 'robot'">
      <rect x="5" y="8" width="14" height="11" rx="3" />
      <path d="M12 8V5M12 5a1.3 1.3 0 1 0 0-2.6A1.3 1.3 0 0 0 12 5ZM2.5 13v3M21.5 13v3" />
      <circle cx="9" cy="13" r="0.5" fill="currentColor" />
      <circle cx="15" cy="13" r="0.5" fill="currentColor" />
      <path d="M9.5 16.5h5" />
    </template>
    <template v-else-if="name === 'pencil'">
      <path d="m14.5 5.5 4 4L8 20H4v-4L14.5 5.5Z" />
      <path d="m12.5 7.5 4 4" />
    </template>
    <template v-else-if="name === 'speaker'">
      <path d="M11 5 6.5 9H3.5v6h3L11 19V5Z" />
      <path d="M15 9.5a3.5 3.5 0 0 1 0 5M17.5 7a7 7 0 0 1 0 10" />
    </template>
    <template v-else-if="name === 'speaker-off'">
      <path d="M11 5 6.5 9H3.5v6h3L11 19V5Z" />
      <path d="m15.5 9.5 5 5M20.5 9.5l-5 5" />
    </template>
    <template v-else-if="name === 'star'">
      <path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6L12 16.7 6.6 19.6l1.1-6L3.2 9.4l6.1-.8L12 3Z" />
    </template>
    <template v-else-if="name === 'arrow-left'">
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </template>
    <template v-else-if="name === 'check'">
      <path d="m4.5 12.5 5 5 10-11" />
    </template>
    <template v-else-if="name === 'x'">
      <path d="m6 6 12 12M18 6 6 18" />
    </template>
    <template v-else-if="name === 'refresh'">
      <path d="M20 11a8 8 0 1 0-2.3 6.3" />
      <path d="M20 5v6h-6" />
    </template>
    <template v-else-if="name === 'home'">
      <path d="m4 11 8-7 8 7v8a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19v-8Z" />
      <path d="M9.5 20.5v-6h5v6" />
    </template>
    <template v-else-if="name === 'flame'">
      <path d="M12 3s5.5 4.2 5.5 9.5a5.5 5.5 0 0 1-11 0C6.5 9.5 9 7.5 9 5c1.5 1 2 2.5 2 4 .8-1.5 1-3.6 1-6Z" />
    </template>
    <template v-else-if="name === 'play'">
      <path d="M7 4.5v15l12-7.5L7 4.5Z" />
    </template>
  </svg>
</template>

<script setup lang="ts">
export type IconName =
  | 'gamepad' | 'book' | 'headphones' | 'trophy' | 'brain' | 'target'
  | 'chat' | 'sparkle' | 'robot' | 'pencil' | 'speaker' | 'speaker-off'
  | 'star' | 'arrow-left' | 'check' | 'x' | 'refresh' | 'home' | 'flame' | 'play'

interface Props {
  name: IconName
  size?: number | string
}

withDefaults(defineProps<Props>(), {
  size: 24
})
</script>
