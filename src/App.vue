<template>

  <!-- Header Section -->
  <div class="header-area">
    <Header></Header>
  </div>

  <!-- Content Section -->
  <div class="content-area">

    <!-- Sidebar Area -->
    <div class="sidebar-area">
      <Aside></Aside>
    </div>

    <!-- Main Area  -->
    <main>
      <Home v-if="$route.path === '/'"></Home>
      <router-view></router-view>
    </main>
    
  </div>

  <!-- Footer Section -->
  <Footer></Footer>

</template>

<script setup>
import Header from './components/Header.vue';
import Aside from './components/Aside.vue';
// import Home from './views/Home.vue';
import Footer from './components/Footer.vue';
import { ref, computed, onMounted } from 'vue';
import router from './router'
// import api from '@/services/api';
</script>

<style scoped>

</style>
