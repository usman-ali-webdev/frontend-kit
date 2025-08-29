<template>
  <div class="sidebar-demo">
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Profile</a></li>
        <li><a href="#">Settings</a></li>
        <li><a href="#">Logout</a></li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
// Sidebar navigation demo
</script>

<style scoped>
.sidebar-demo {
  background: #f8fafd;
  padding: 2rem 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(74,74,208,0.07);
  width: 220px;
}
nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
nav li {
  margin-bottom: 1.2rem;
}
nav a {
  color: #4a4ad0;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  transition: color 0.2s;
}
nav a:hover {
  color: #003eaa;
}
</style>
