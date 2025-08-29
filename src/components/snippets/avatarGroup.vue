<template>
  <div class="avatar-group">
    <img v-for="i in 4" :key="i" :src="`https://randomuser.me/api/portraits/men/${30+i}.jpg`" class="avatar" />
  </div>
</template>

<script setup>
// Avatar group demo
</script>

<style scoped>
.avatar-group {
  display: flex;
  gap: -12px;
  align-items: center;
  padding: 1rem;
}
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid #4a4ad0;
  margin-left: -12px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(74,74,208,0.07);
}
</style>
