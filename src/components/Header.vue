<template>
    <header id="navbar" style="display: flex; justify-content: space-between; align-items: center;">
        <!-- <h1>FrontendKit</h1> -->
        <h1 class="in-go-home" @click="$router.push('/')" style="line-height: 0.5; font-size: 1.6em;">
            <i class="fa-solid fa-diamond" style="color: #FF7519;"></i>
            FrontendKit
            <!-- <br> <small style="font-size: xx-small;">Your Development Companion</small> -->
        </h1>
        <button class="menu-btn" :class="{ open: sidebarOpen }" @click="sidebarOpen = !sidebarOpen">
            <span></span>
            <span></span>
            <span></span>
        </button>
        <!-- <nav style="flex:1; text-align: center;">
          <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Features</a></li>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Support</a></li>
              <li><a href="#">Contact</a></li>
          </ul>
      </nav> -->
    </header>

    <aside :class="{ open: sidebarOpen }" class="sidebar" style="z-index: 1;">
        <nav>
            <ul>
                <li v-for="item in navItems" :key="item.path" :id="item.text" :class="{ active: isActive(item.path) }">
                    <router-link v-if="item.path" :to="item.path">{{ item.text }}</router-link>
                    <a v-else href="#">{{ item.text }}</a>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const navItems = [
    // { text: 'Home', path: '/' },
    { text: 'Layout Generator', path: '/layout-generator' },
    { text: 'UI Components', path: '/ui-components' },
    { text: 'Animations / Transitions', path: null },
    { text: 'Utilities', path: null },
    { text: 'Themes', path: null },
    { text: 'Customization', path: null },
    { text: 'Examples', path: null },
    { text: 'Updates', path: null },
]

function isActive(path) {
    return path && route.path === path
}

import { ref, onMounted, onUnmounted } from 'vue';
const sidebarOpen = ref(false);
function handleClickOutside(event) {
    const sidebar = document.querySelector('.sidebar');
    const menuBtn = document.querySelector('.menu-btn');
    if (sidebarOpen.value && 
        !sidebar.contains(event.target) && 
        !menuBtn.contains(event.target)) {
        sidebarOpen.value = false;
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped></style>