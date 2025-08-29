<template>
  <div class="media-icon-demo">
    <img src="https://placekitten.com/80/80" alt="Kitten" class="demo-img" />
    <i class="fa-solid fa-star demo-icon"></i>
    <span>Media & Icon Demo</span>
  </div>
</template>

<script setup>
// Media and icon demo
</script>

<style scoped>
.media-icon-demo {
  display: flex;
  align-items: center;
  gap: 18px;
  background: #fffbe6;
  padding: 1.5rem 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(74,74,208,0.07);
}
.demo-img {
  border-radius: 50%;
  width: 80px;
  height: 80px;
  object-fit: cover;
  border: 2px solid #4a4ad0;
}
.demo-icon {
  font-size: 2rem;
  color: #f7b500;
}
span {
  font-size: 1.1rem;
  color: #333;
}
</style>
