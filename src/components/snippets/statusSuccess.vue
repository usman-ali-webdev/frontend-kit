<template>
  <div class="status-success">
    <i class="fa-solid fa-circle-check"></i>
    <span>Success!</span>
  </div>
</template>

<script setup>
// Success status indicator
</script>

<style scoped>
.status-success {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #e6f9ed;
  color: #2e7d32;
  font-size: 1.2rem;
  padding: 1rem 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(46,125,50,0.07);
}
.status-success i {
  font-size: 2rem;
  color: #43a047;
}
</style>
