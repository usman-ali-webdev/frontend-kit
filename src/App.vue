<template>
  <!-- Header Section -->
  <div class="header-area">
    <Header></Header>
  </div>

  <!-- Content Section -->
  <div class="content-area">

    <!-- Sidebar Area -->
    <div v-if="$route.path !== '/'" class="sidebar-area">
      <Aside></Aside>
    </div>

    <!-- Main Area  -->
    <main class="main-area">
      <router-view></router-view>
    </main>
    
  </div>

  <!-- Footer Section -->
  <!-- <Footer></Footer> -->

</template>

<script setup>
import Header from './components/Header.vue';
import Aside from './components/Aside.vue';
import Footer from './components/Footer.vue';
import { ref, computed, onMounted } from 'vue';
// import api from '@/services/api';
</script>

<style scoped>
/* .header-area {
    background-color: #4a4ad0;
    color: white;
    padding: 8px;
    text-align: center;
  }
  
  .content-area {
    display: flex;
    flex-direction: row;
      background-image: url('../images/bg/wave-bg.svg');
  } */
/* 

  .sidebar-area {
    width: 200px;
    background-color: #f4f4f4;
    padding: 20px;
  }

  .main-area {
    flex-grow: 1;
    padding: 20px;
  } */
    
</style>
