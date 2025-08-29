<template>
  <div class="grid-demo">
    <div class="grid-item">A</div>
    <div class="grid-item">B</div>
    <div class="grid-item">C</div>
    <div class="grid-item">D</div>
  </div>
</template>

<script setup>
// Simple grid layout demo
</script>

<style scoped>
.grid-demo {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  background: linear-gradient(90deg, #e3e8f7 0%, #f8fafd 100%);
  padding: 24px;
  border-radius: 12px;
}
.grid-item {
  background: #4a4ad0;
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 32px 0;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(74,74,208,0.07);
}
</style>
