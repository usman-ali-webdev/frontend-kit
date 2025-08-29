<template>
  <div class="progress-bar-demo">
    <span>Progress</span>
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: '70%' }"></div>
    </div>
    <span class="progress-label">70%</span>
  </div>
</template>

<script setup>
// Simple progress bar demo
</script>

<style scoped>
.progress-bar-demo {
  background: #f8fafd;
  padding: 1.5rem 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(74,74,208,0.07);
  min-width: 260px;
  text-align: center;
}
.progress-bar {
  background: #e3e8f7;
  border-radius: 8px;
  height: 18px;
  width: 100%;
  margin: 1rem 0;
  overflow: hidden;
}
.progress-fill {
  background: linear-gradient(90deg, #4a4ad0 0%, #43a047 100%);
  height: 100%;
  border-radius: 8px;
  transition: width 0.4s;
}
.progress-label {
  color: #4a4ad0;
  font-weight: 600;
}
</style>
