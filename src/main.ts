import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'

import { createI18n } from 'vue-i18n'
import it from './i18n/it.json'
import en from './i18n/en.json'
import es from './i18n/es.json'

import router from './router'

// 🟡 PRIMA definisci i18n
const savedLocale = localStorage.getItem('lang') || 'it'

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: { it, en, es }
})

// ✅ POI lo usi dentro createApp
createApp(App).use(router).use(i18n).mount('#app')
