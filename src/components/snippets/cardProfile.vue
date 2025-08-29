<template>
  <div class="profile-card">
    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Profile" class="avatar" />
    <h3>Alex Johnson</h3>
    <p>Frontend Developer</p>
    <button>Follow</button>
  </div>
</template>

<script setup>
// Attractive profile card
</script>

<style scoped>
.profile-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(74,74,208,0.09);
  padding: 2rem 1.5rem;
  text-align: center;
  width: 220px;
}
.avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  margin-bottom: 1rem;
  border: 2px solid #4a4ad0;
}
h3 {
  color: #4a4ad0;
  margin-bottom: 0.3rem;
}
p {
  color: #888;
  margin-bottom: 1rem;
}
button {
  background: #4a4ad0;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 600;
}
button:hover {
  background: #003eaa;
}
</style>
