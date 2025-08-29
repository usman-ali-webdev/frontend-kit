<template>
  <div>
    <button class="show-toast-btn" @click="show = true">Show Toast</button>
    <div v-if="show" class="toast">
      <i class="fa-solid fa-bell"></i>
      <span>Notification sent successfully!</span>
      <button class="close-toast" @click="show = false">×</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const show = ref(false);
</script>

<style scoped>
.show-toast-btn {
  background: #43a047;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 2rem;
  font-size: 1rem;
  cursor: pointer;
}
.toast {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #e6f9ed;
  color: #2e7d32;
  font-size: 1.1rem;
  padding: 1rem 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(46,125,50,0.07);
  margin-top: 1rem;
  position: relative;
}
.toast i {
  font-size: 1.5rem;
  color: #43a047;
}
.close-toast {
  background: none;
  border: none;
  color: #2e7d32;
  font-size: 1.3rem;
  cursor: pointer;
  margin-left: auto;
}
</style>
