<template>
  <div class="in-login-form-simple">
    <form>
      <input type="email" placeholder="Email" required class="in-input" />
      <input type="password" placeholder="Password" required class="in-input" />
      <button type="submit" class="in-btn">Sign In</button>
    </form>
  </div>
</template>

<style scoped>
.in-login-form-simple {
  max-width: 320px;
  margin: 0 auto;
  padding: 24px 18px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
}

.in-input {
  width: 100%;
  margin-bottom: 1rem;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.in-btn {
  width: 100%;
  padding: 10px;
  background: #4a4ad0;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.in-btn:hover {
  background: #003eaa;
}
</style>