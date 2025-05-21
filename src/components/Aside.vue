<template>
    <!-- <h1 class="sidebar-logo" style="color: var(--primary-color)">FrontendKit</h1> -->
    <aside>
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
    { text: 'Getting Started', path: '/' },
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
</script>

<style scoped>
.sidebar-logo{
    position: sticky;
    top: 5px;
}
li[id="Getting Started"]{
 margin-top: 10px;
}
</style>