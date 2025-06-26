// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'

// Pagine principali
import Home from '../views/Home.vue'
import Menu from '../views/Menu.vue'

// Giochi
import Games from '../views/games/Index.vue'
import Memory from '../views/games/Memory.vue'
import Guess from '../views/games/GuessAI.vue' // ← QUI
import CompletePhrase from '../views/games/CompletePhraseGame.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: 'menu',
        name: 'Menu',
        component: Menu
      },
      {
        path: 'games',
        children: [
          {
            path: '',
            name: 'Games',
            component: Games
          },
          {
            path: 'memory',
            name: 'Memory',
            component: Memory
          },
          {
            path: 'guess',
            name: 'Guess',
            component: Guess
          },
          {
        path: 'complete-phrase',
        name: 'CompletePhrase',
        component: CompletePhrase
        }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
