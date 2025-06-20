<template>
  <div class="coming-soon-container">
    <div class="coming-soon-badge">Coming Soon</div>
    <div class="coming-soon-content">
      <i class="fas fa-rocket"></i>
      <h2>Exciting New Component Coming Soon!</h2>
      <p>We're working on something awesome. Stay tuned for more reusable UI magic!</p>
    </div>
  </div>
</template>

<script setup>
// No props needed for now
</script>

<style scoped>
.coming-soon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 320px;
  background: linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%);
  border-radius: 18px;
  box-shadow: 0 6px 32px rgba(74,74,208,0.10);
  position: relative;
  margin: 2rem auto;
  max-width: 480px;
  padding: 2.5rem 2rem 2rem 2rem;
}
.coming-soon-badge {
  position: absolute;
  top: -18px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(90deg, #4a4ad0 60%, #42b883 100%);
  color: #fff;
  font-size: 1.05rem;
  font-weight: 700;
  padding: 0.4rem 1.2rem;
  border-radius: 999px;
  box-shadow: 0 2px 8px rgba(74,74,208,0.13);
  letter-spacing: 0.5px;
  z-index: 2;
}
.coming-soon-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.1rem;
}
.coming-soon-content i {
  font-size: 2.8rem;
  color: #4a4ad0;
  margin-bottom: 0.5rem;
  animation: rocket-bounce 1.2s infinite alternate cubic-bezier(.4,2,.6,1);
}
@keyframes rocket-bounce {
  from { transform: translateY(0); }
  to { transform: translateY(-18px) scale(1.08); }
}
.coming-soon-content h2 {
  font-size: 1.45rem;
  font-weight: 700;
  color: #222;
  margin: 0;
  text-align: center;
}
.coming-soon-content p {
  color: #4a4ad0;
  font-size: 1.08rem;
  margin: 0;
  text-align: center;
}
</style>
