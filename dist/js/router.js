import { createRouter, createWebHistory } from 'vue-router'

import RecipePage from './components/RecipePage';

const routes = [
  {
    path: '/receta',
    name: 'RecipePage',
    component: RecipePage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router