<template>
  <div>
    <button class="open-modal-btn" @click="show = true">Open Modal</button>
    <div v-if="show" class="modal-overlay" @click.self="show = false">
      <div class="modal-content">
        <h2>Overlay Modal</h2>
        <p>This is a simple modal overlay example.</p>
        <button class="close-btn" @click="show = false">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const show = ref(false);
// testing
var abc = 123;
console.log(abc);
</script>

<style scoped>
.open-modal-btn {
  background: #4a4ad0;
  color: #fff;
  padding: 0.7rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(74,74,208,0.15);
  min-width: 320px;
  text-align: center;
}
.close-btn {
  background: #e3e8f7;
  color: #4a4ad0;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1.5rem;
  margin-top: 1rem;
  cursor: pointer;
}
</style>
