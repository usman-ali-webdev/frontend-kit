<template>
  <div class="login-form-modern">
    <form>
      <div class="icon-row">
        <i class="fas fa-user-circle"></i>
      </div>
      <div class="input-group">
        <input type="email" placeholder="Email address" required />
      </div>
      <div class="input-group">
        <input type="password" placeholder="Password" required />
      </div>
      <div class="divider"><span>or</span></div>
      <button type="submit" class="login-btn">Login</button>
    </form>
  </div>
</template>

<style scoped>
.login-form-modern {
  max-width: 340px;
  margin: 0 auto;
  padding: 32px 24px;
  background: #f8fafc;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(74, 74, 208, 0.08);
}

.icon-row {
  text-align: center;
  margin-bottom: 1.5rem;
}

.icon-row i {
  font-size: 3rem;
  color: #4a4ad0;
}

.input-group {
  margin-bottom: 1rem;
}

.input-group input {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #bbb;
  border-radius: 6px;
  font-size: 1rem;
  background: #fff;
}

.divider {
  text-align: center;
  margin: 1.5rem 0 1rem;
  position: relative;
}

.divider span {
  background: #f8fafc;
  padding: 0 12px;
  color: #aaa;
  position: relative;
  z-index: 1;
}

.divider:before {
  content: '';
  display: block;
  height: 1px;
  background: #e0e0e0;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  z-index: 0;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background: #4a4ad0;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.login-btn:hover {
  background: #003eaa;
}
</style>
