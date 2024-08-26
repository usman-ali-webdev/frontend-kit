<template>
    <!-- <h1 class="sidebar-logo" style="color: var(--primary-color)">FrontendKit</h1> -->
    <aside>
        <nav>
            <ul>
                <li class="active">
                    <router-link to="/">Getting Started</router-link>
                </li>
                <li>
                    <router-link to="/layout-generator">Layout Generator</router-link>
                </li>
                <li><a href="#">Components</a></li>
                <li><a href="#">Utilities</a></li>
                <li><a href="#">Themes</a></li>
                <li><a href="#">Customization</a></li>
                <li><a href="#">Examples</a></li>
                <li><a href="#">Updates</a></li>
            </ul>
        </nav>
    </aside>
</template>

<script setup>

</script>

<style scoped>
.sidebar-logo{
    position: sticky;
    top: 5px;
}
</style>