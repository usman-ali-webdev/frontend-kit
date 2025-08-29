<template>
  <form class="form-demo">
    <label for="input">Your Name</label>
    <input id="input" type="text" placeholder="Enter your name" />
    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
// Basic form input demo
</script>

<style scoped>
.form-demo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #f8fafd;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(74,74,208,0.07);
  min-width: 260px;
}
label {
  font-weight: 600;
  color: #4a4ad0;
}
input {
  padding: 0.7rem 1rem;
  border: 1.5px solid #e3e8f7;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
}
button {
  background: #4a4ad0;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 600;
  margin-top: 0.5rem;
}
button:hover {
  background: #003eaa;
}
</style>
