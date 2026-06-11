// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'

// Pagine principali
import Home from '../views/Home.vue'
import Menu from '../views/Menu.vue'

// Giochi
import Games from '../views/games/Index.vue'
import Memory from '../views/games/Memory.vue'
import Guess from '../views/games/GuessAI.vue'
import CompletePhrase from '../views/games/CompletePhraseGame.vue'
import Quiz from '../views/games/Quiz.vue'
import StoryFill from '../views/games/StoryFill.vue'
import TrainRobot from '../views/games/TrainRobot.vue'

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
          },
          {
            path: 'quiz',
            name: 'Quiz',
            component: Quiz
          },
          {
            path: 'story-fill',
            name: 'StoryFill',
            component: StoryFill
          },
          {
            path: 'train-robot',
            name: 'TrainRobot',
            component: TrainRobot
          }
        ]
      },
      {
        path: 'glossary',
        name: 'Glossary',
        component: () => import('../views/Glossary.vue')
      },
      {
        path: 'stories',
        name: 'Stories',
        component: () => import('../views/Stories.vue')
      },
      {
        path: 'rewards',
        name: 'Rewards',
        component: () => import('../views/Rewards.vue')
      },
      {
        path: 'try-prompts',
        name: 'TryPrompts',
        component: () => import('../views/TryPrompts.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
