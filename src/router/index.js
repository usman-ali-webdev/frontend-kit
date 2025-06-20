// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import LayoutGenerator from '@/views/LayoutGenerator.vue';
import UIComponents from '@/views/UIComponents.vue';
import ComponentView from '@/views/ComponentView.vue';
import NotFound from '@/views/NotFound.vue'; // Import NotFound component
import SearchResults from '@/views/SearchResults.vue'; // Import SearchResults component
// Add other imports as needed



const routes = [
  // Define your routes
  { path: '/', name: 'Home', component: Home },
  { path: '/layout-generator', name: 'LayoutGenerator', component: LayoutGenerator },
  { path: '/ui-components', name: 'ui-components', component: UIComponents },
  { path: '/component/:slug', name: 'ComponentView', component: ComponentView },
  { path: '/search/:query', name: 'SearchResults', component: SearchResults }, // Add SearchResults route
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound } // Add NotFound route
  // Add other routes here
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
