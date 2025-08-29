<template>
  <div class="stepper-demo">
    <div class="step" v-for="(step, idx) in steps" :key="step" :class="{ active: idx === 1 }">
      <span>{{ step }}</span>
      <span v-if="idx < steps.length - 1" class="divider"></span>
    </div>
  </div>
</template>

<script setup>
const steps = ['Start', 'In Progress', 'Complete'];
</script>

<style scoped>
.stepper-demo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f8fafd;
  padding: 1.5rem 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(74,74,208,0.07);
}
.step {
  display: flex;
  align-items: center;
  font-weight: 600;
  color: #888;
  font-size: 1rem;
  position: relative;
}
.step.active {
  color: #4a4ad0;
}
.divider {
  width: 32px;
  height: 2px;
  background: #e3e8f7;
  margin: 0 0.5rem;
  border-radius: 2px;
}
</style>
