<template>
  <section class="landing">
    <h1></h1>
    <div class="search-section">
  <h2 class="search-title">Prebuilt Components &ndash; <br> Fast, Easy UI Integration!</h2>
  
  <div class="search-box">
    <input
      type="text"
      class="search-input"
      placeholder="Search a component..."
      oninput="filterSuggestions(this.value)"
      onfocus="showSuggestions()"
      onblur="hideSuggestionsDelayed()"
    />
    <ul class="suggestions" id="suggestionList">
      <li onclick="selectSuggestion('Header')">Header</li>
      <li onclick="selectSuggestion('Footer')">Footer</li>
      <li onclick="selectSuggestion('Navbar')">Navbar</li>
      <li onclick="selectSuggestion('Sidebar')">Sidebar</li>
      <li onclick="selectSuggestion('Tab System')">Tab System</li>
      <li onclick="selectSuggestion('Accordion')">Accordion</li>
      <li onclick="selectSuggestion('Dropdown')">Dropdown</li>
      <li onclick="selectSuggestion('Login Form')">Login Form</li>
    </ul>
    <button class="search-button">Explore</button>
  </div>

  <!-- <p class="search-note">Type to find a component like "header", "sidebar", or "tabs".</p> -->
</div>

  </section>

</template>

<script setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const router = useRouter();

function selectSuggestion(text) {
  const input = document.querySelector('.search-input');
  input.value = text;
  document.getElementById('suggestionList').style.display = 'none';
  if (input.value !== '') {
    router.push('/ui-components');
  }
}

onMounted(() => {
  window.selectSuggestion = selectSuggestion;
});
</script>

<style scoped>
.search-section {
  max-width: 700px;
  margin: 60px auto;
  text-align: center;
  padding: 20px;
  font-family: 'Segoe UI', sans-serif;
}

.search-title {
  font-size: 45px;
  margin-bottom: 20px;
  color: #2e2e2e;
  font-weight: bold;
}

.search-box {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.search-input {
  padding: 12px 20px;
  font-size: 16px;
  border: 2px solid #4a4ad0;
  border-radius: 10px;
  outline: none;
  transition: 0.3s;
  width: 100%;
}

.search-input:focus {
  border-color: #003eaa;
  box-shadow: 0 0 8px rgba(0, 87, 216, 0.3);
}

.search-button {
  margin-top: 12px;
  padding: 10px 18px;
  font-size: 16px;
  background-color: #4a4ad0;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  width: 200px;
  align-self: center;
}

.search-button:hover {
  background-color: #004bb5;
}

.search-note {
  font-size: 14px;
  margin-top: 10px;
  color: #555;
}

.suggestions {
  position: absolute;
  display: none;
  top: 48px;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-top: none;
  list-style: none;
  max-height: 200px;
  overflow-y: auto;
  z-index: 99;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  padding: 0;
  margin: 0;
}

.suggestions li {
  padding: 10px 20px;
  cursor: pointer;
  text-align: left;
  /* transition: background 0.2s; */
}

.suggestions li:hover {
  background-color: #f4f4f4;
}

</style>