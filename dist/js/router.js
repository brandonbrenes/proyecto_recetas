import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './components/main.js';
import RecipeCard from './components/RecipeCard.js';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'main',
    component: App
  },
  {
    path: '/recipe/:id',
    name: 'Recipe',
    component: RecipeCard,
    props: true
  }
];

const router = new VueRouter({
  routes
});

export default router;