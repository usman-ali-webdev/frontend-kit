// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import LayoutGenerator from '@/views/LayoutGenerator.vue';

// Add other imports as needed

const routes = [
  // Define your routes
  { path: '/', name: 'Home', component: Home },
  { path: '/layout-generator', name: 'LayoutGenerator', component: LayoutGenerator }
  // Add other routes here
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
