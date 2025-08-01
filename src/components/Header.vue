<template>
    <header id="navbar" style="display: flex; justify-content: space-between; align-items: center;">
        <!-- <h1>FrontendKit</h1> -->
        <h1 class="in-go-home" @click="$router.push('/')" style="line-height: 0.5; font-size: 1.6em;">
            <i class="fa-solid fa-diamond" style="color: white;"></i>
             <!-- <img src="@/assets/images/logo/frontend-kit-logo.png" alt="FrontendKit Logo" style="max-width: 100%; width: 40px; height: auto; vertical-align: middle;"/> -->
            FrontendKit
            <!-- <br> <small style="font-size: xx-small;">Your Development Companion</small> -->
        </h1>
        <nav style="flex:1; text-align: center; background-color: transparent;">
            <ul class="in-hide-home-li">
                <li style="font-family: 'Samsung Sharp Sans Regular'; padding-inline: 10px; letter-spacing: 1px;" v-for="item in navItems" :key="item.path" :id="item.text" :class="{ active: isActive(item.path) }">
                    <router-link v-if="item.path" :to="item.path">{{ item.text }}</router-link>
                    <a v-else href="#">{{ item.text }}</a>
                </li>
            </ul>
      </nav>
        <button class="menu-btn" :class="{ open: sidebarOpen }" @click="sidebarOpen = !sidebarOpen">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </header>

    <aside :class="{ open: sidebarOpen }" class="sidebar" style="z-index: 4;">
        <nav>
            <ul>
                <li style="font-size: 11px;" v-for="item in navItems" :key="item.path" :id="item.text" :class="{ active: isActive(item.path) }">
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
    { text: 'Home', path: '/' },
    // { text: 'Home', path: '/' },
    { text: 'UI Components', path: '/ui-components' },
    { text: 'Layout Generator', path: '/layout-generator' },
    { text: 'Animations / Transitions', path: 'coming-soon' },
    { text: 'DOM Manipulation', path: 'coming-soon' },
    // { text: 'Utilities', path: 'coming-soon' },
    // { text: 'Themes', path: 'coming-soon' },
    // { text: 'Customization', path: 'coming-soon' },
    // { text: 'Examples', path: 'coming-soon' },
    // { text: 'Updates', path: 'coming-soon' },
    // { text: 'About Us', path: '/about-us' }, 
]

function isActive(path) {
    return path && route.path === path
}

import { ref, onMounted, onUnmounted } from 'vue';
const sidebarOpen = ref(false);
function handleClickOutside(event) {
    const sidebar = document.querySelector('.sidebar');
    const menuBtn = document.querySelector('.menu-btn');
    const clickedLink = event.target.closest('a');
    
    if ((sidebarOpen.value && 
        !sidebar.contains(event.target) && 
        !menuBtn.contains(event.target)) ||
        (clickedLink && clickedLink.getAttribute('href') !== '#')) {
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

<style scoped>
/* Default: hide sidebar, show top nav */
.sidebar, .menu-btn {
  display: none;
}

header nav {
  display: block;
}

/* For screens less than 768px */
@media (max-width: 768px) {
  .sidebar {
    display: block;
  }
  .menu-btn {
    display: flex;
  }

  header nav {
    display: none;
  }
}

ul.in-hide-home-li li:first-child{
    display: none;
}

</style>