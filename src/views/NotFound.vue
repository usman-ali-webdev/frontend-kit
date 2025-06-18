<template>
  <div class="not-found">
    <h1>404</h1>
    <h2>Component Not Found</h2>
    <p>The component you are looking for does not exist or has been removed.</p>
    <router-link to="/ui-components" class="back-link">Back to UI Components</router-link>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 60px 20px;
}
h1 {
  font-size: 5rem;
  color: #ff7519;
  margin-bottom: 0.5rem;
}
h2 {
  font-size: 2rem;
  color: #4a4ad0;
  margin-bottom: 1rem;
}
p {
  color: #666;
  margin-bottom: 2rem;
}
.back-link {
  display: inline-block;
  padding: 10px 24px;
  background: #4a4ad0;
  color: #fff;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.2s;
}
.back-link:hover {
  background: #003eaa;
}
</style>
