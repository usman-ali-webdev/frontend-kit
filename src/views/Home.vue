<template>
  <section class="landing">
    <h1></h1>
    <div class="search-section">
      <h2 class="search-title">Prebuilt Components &ndash; <br> Fast, Easy <span style="color: #FF7519;">UI
          Integration!</span></h2>

      <div class="search-box">
        <input type="text" class="search-input" placeholder="Search a component..."
          oninput="filterSuggestions(this.value)" onfocus="showSuggestions()" onblur="hideSuggestionsDelayed()" />
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
        <!-- <button class="search-button">Explore</button> -->
      </div>

      <!-- <p class="search-note">Type to find a component like "header", "sidebar", or "tabs".</p> -->
    </div>

  </section>

  <section>
    <div class="container" style="text-align: center; margin-top: 1rem;">
      <h2 class="section-title" style="color: #464646; font-family: 'Samsung Sharp Sans Bold'; font-size: 25px;">Examples</h2>
      <div class="examples-container">
        <div class="example-card">
          <img src="" alt="Header Example">
          <h3>Header</h3>
          <p>Clean and responsive header designs</p>
        </div>
        <div class="example-card">
          <img src="" alt="Sidebar Example">
          <h3>Sidebar</h3>
          <p>Customizable sidebar navigation</p>
        </div>
        <div class="example-card">
          <img src="" alt="Form Example">
          <h3>Forms</h3>
          <p>Modern form components and validations</p>
        </div>
      </div>

      <div class="view-more-section">
        <button class="view-more-btn" @click="router.push('/ui-components')">
          View More Components
        </button>
      </div>

      <div class="featured-section">
        <h2 class="section-title" style="color: #464646; font-family: 'Samsung Sharp Sans Bold'; font-size: 25px; margin-bottom: 0;">Key Features</h2>
        <div class="feature-flex">
          <div class="feature-item">
            <span class="feature-icon">🚀</span>
            <h4>Prebuilt</h4>
            <p>Ready-to-use components with no setup required</p>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🎨</span>
            <h4>Customizable</h4>
            <p>Easily modify styles to match your brand</p>
          </div>
          <div class="feature-item">
            <span class="feature-icon">📱</span>
            <h4>Responsive</h4>
            <p>Works seamlessly on all devices</p>
          </div>
        </div>
      </div>

     


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
  margin: 0 auto;
  padding-block: 60px;
  text-align: center;
  padding: 20px;
  font-family: Samsung Sharp Sans Bold;
}

.search-title {
  font-size: 45px;
  margin-bottom: 20px;
  color: white;
  font-family: Samsung Sharp Sans Bold;
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

.examples-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  padding: 16px 0;
}

.example-card {
  flex: 0 1 300px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  background-color: #fff;
}

.example-card:hover {
  transform: translateY(-5px);
}

.example-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

.example-card h3 {
  margin: 15px 0 10px;
  color: #333;
}

.example-card p {
  color: #666;
  font-size: 0.9rem;
}

.view-more-section {
        margin: 2rem 0;
      }

      .view-more-btn {
        background: #4a4ad0;
        color: white;
        padding: 12px 24px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
        transition: background 0.3s;
      }

      .view-more-btn:hover {
        background: #3939a0;
      }

      .featured-section {
        margin-top: 3rem;
      }

      .feature-flex {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 2rem;
        margin-top: .5rem;
      }

      .feature-item {
        flex: 1;
        min-width: 270px;
        max-width: 270px;
        text-align: center;
        padding: 1.5rem;
        /* background: #cee0f2; */
        border-radius: 12px;
        font-size: 15px;
      }

      .feature-icon {
        font-size: 2rem;
        display: block;
        margin-bottom: 1rem;
      }
</style>