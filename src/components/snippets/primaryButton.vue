<template>
  <button class="primary-btn">Primary Button</button>
</template>

<script setup>
// Simple primary button
</script>

<style scoped>
.primary-btn {
  background: linear-gradient(90deg, #4a4ad0 0%, #003eaa 100%);
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(74,74,208,0.07);
  cursor: pointer;
  transition: background 0.2s;
}
.primary-btn:hover {
  background: linear-gradient(90deg, #003eaa 0%, #4a4ad0 100%);
}
</style>
