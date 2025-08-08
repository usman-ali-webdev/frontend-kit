<template>
  <section class="landing" style="position: relative;">
    <svg width="20" height="20" class="floatY" style="position:absolute; top:20px; left:30px; opacity:0.15;">
      <circle cx="10" cy="10" r="10" fill="#E0E0E0" />
    </svg>
    <svg width="20" height="20" class="spin" style="position:absolute; top:60px; right:40px; opacity:0.15;">
      <polygon points="10,0 20,20 0,20" fill="#F2C94C" />
    </svg>
    <svg width="20" height="20" class="pulse" style="position:absolute; bottom:30px; left:50px; opacity:0.1;">
      <rect width="20" height="20" fill="#6FCF97" />
    </svg>
    <svg width="40" height="20" class="floatX" style="position:absolute; top:10px; right:20px; opacity:0.1;">
      <polyline points="0,10 10,0 20,10 30,0 40,10" stroke="#2D9CDB" stroke-width="2" fill="none" />
    </svg>
    <svg width="20" height="20" class="spin pulse" style="position:absolute; bottom:40px; right:30px; opacity:0.15;">
      <line x1="10" y1="0" x2="10" y2="20" stroke="#BB6BD9" stroke-width="2" />
      <line x1="0" y1="10" x2="20" y2="10" stroke="#BB6BD9" stroke-width="2" />
    </svg>
    <svg width="24" height="24" class="pulse" style="position:absolute; top:40px; left:5%; opacity:0.08;">
      <circle cx="4" cy="4" r="4" fill="#EB5757" />
      <circle cx="20" cy="4" r="4" fill="#EB5757" />
      <circle cx="12" cy="20" r="4" fill="#EB5757" />
    </svg>
    <svg width="30" height="30" class="floatY" style="position:absolute; top:150px; right:10%; opacity:0.1;">
      <polygon points="15,0 30,30 0,30" fill="#27AE60" />
    </svg>
    <svg width="60" height="20" class="floatX" style="position:absolute; bottom:20px; left:8%; opacity:0.15;">
      <path d="M0 10 Q15 0 30 10 T60 10" stroke="#2D9CDB" stroke-width="2" fill="none" />
    </svg>
    <svg width="16" height="16" class="spin" style="position:absolute; bottom:60px; right:20%; opacity:0.08;">
      <line x1="8" y1="0" x2="8" y2="16" stroke="#F2994A" stroke-width="2" />
      <line x1="0" y1="8" x2="16" y2="8" stroke="#F2994A" stroke-width="2" />
    </svg>
    <svg width="30" height="15" class="pulse" style="position:absolute; top:180px; left:15%; opacity:0.1;">
      <path d="M0,15 A15,15 0 0,1 30,15" fill="#BB6BD9" />
    </svg>
    <svg width="40" height="40" class="floatY" style="position:absolute; top:100px; left:10%; opacity:0.15;">
      <circle cx="20" cy="20" r="15" stroke="limegreen" stroke-width="6" fill="transparent" />
    </svg>
    <!-- Small O - Top Left-Center -->
    <!-- <svg width="24" height="24" class="pulse" style="position:absolute; top:80px; left:35%; opacity:0.15;">
  <circle cx="12" cy="12" r="9" stroke="limegreen" stroke-width="4" fill="transparent"/>
</svg> -->

    <!-- Medium O - Center Right -->
    <svg width="36" height="36" class="floatY" style="position:absolute; top:50%; right:28%; opacity:0.1;">
      <circle cx="18" cy="18" r="13" stroke="limegreen" stroke-width="5" fill="transparent" />
    </svg>

    <!-- Large O - Below Center Left -->
    <svg width="48" height="48" class="floatX" style="position:absolute; top:60%; left:32%; opacity:0.08;">
      <circle cx="24" cy="24" r="18" stroke="limegreen" stroke-width="6" fill="transparent" />
    </svg>

    <!-- Tiny O - Near Top Right-Center -->
    <!-- <svg width="16" height="16" class="spin" style="position:absolute; top:100px; right:35%; opacity:0.12;">
  <circle cx="8" cy="8" r="6" stroke="limegreen" stroke-width="3" fill="transparent"/>
</svg> -->





    <h1></h1>
    <div class="search-section">
      <h2 class="search-title">Prebuilt Components &ndash; <br> Fast, Easy <span style="color: #FF7519;">UI
          Integration!</span></h2>

      <!-- <div class="search-box">
        <input type="text" class="search-input" placeholder="Search a component..."
          oninput="filterSuggestions(this.value)" onfocus="showSuggestions()" onblur="hideSuggestionsDelayed()" />
        <ul class="suggestions" id="suggestionList">
          <li onclick="selectSuggestion('Excerpt')">Excerpt - <small style="font-size: 10px; letter-spacing: .6px; color: gray;">Trim multiline text</small></li>
          <li onclick="selectSuggestion('Login Form')">Form - <small style="font-size: 10px; letter-spacing: .6px; color: gray;">Modern login form</small></li>
          <li onclick="selectSuggestion('Header')">Header</li>
          <li onclick="selectSuggestion('Footer')">Footer</li>
        </ul>
        <button class="search-button">Explore</button>
      </div>  -->
      <!-- Search Bar -->
      <div class="search-section">
        <h1 class="search-title">Search Components</h1>

        <div class="search-box">
          <!-- Search Input -->
          <input v-model="searchQuery" type="text" placeholder="Search here..." class="search-input" />

          <!-- Suggestions -->
          <ul v-if="searchQuery.trim()" class="suggestions">
            <li v-for="comp in flatFilteredList" :key="comp.slug" @click="goToComponent(comp.slug)">
              {{ comp.label }}
            </li>

            <li v-if="flatFilteredList.length === 0" class="no-results">
              No results found
            </li>
          </ul>
        </div>
      </div>


      <!-- <p class="search-note">Type to find a component like "header", "sidebar", or "tabs".</p> -->
    </div>

  </section>

  <section>
    <div class="container" style="text-align: center; margin-top: 1rem;">
      <h2 class="section-title" style="color: #464646; font-family: 'Samsung Sharp Sans Bold'; font-size: 25px;">
        Examples</h2>
      <div class="examples-container">
        <div class="example-card">
          <!-- <img src="@/assets/images/samples/header-navbar-sample.png" alt="Header Example"> -->
          <!-- <img src="" alt="Header Example"> -->
          <i class="fas fa-window-maximize" style="font-size: 48px; color: #4a4ad0;"></i>
          <h3>Header</h3>
          <p>Clean and responsive header designs</p>
        </div>
        <div class="example-card">
          <!-- <img src="" alt="Sidebar Example"> -->
          <i class="fas fa-columns" style="font-size: 48px; color: #4a4ad0;"></i>
          <h3>Sidebar</h3>
          <p>Customizable sidebar navigation</p>
        </div>
        <div class="example-card" @click="router.push({ path: '/ui-components', query: { highlight: 'loginForm' } })">
          <!-- <img src="" alt="Form Example"> -->
          <i class="fas fa-wpforms" style="font-size: 48px; color: #4a4ad0;"></i>
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
        <h2 class="section-title"
          style="color: #464646; font-family: 'Samsung Sharp Sans Bold'; font-size: 25px; margin-bottom: 0;">Key
          Features</h2>
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

  <div class="cta-hire-me" hidden>
    <button class="hire-me-btn" @click="router.push('/contact')">
      Hire Me 👋
    </button>
  </div>

</template>

<script setup>
// const suggestionMap = {
//   'Header': 'Header',
//   'Excerpt': 'TrimMultilineText',
//   'Footer': 'Footer',
//   'Navbar': 'Navbar',
//   'Sidebar': 'Sidebar',
//   'Tab System': 'TabSystem',
//   'Accordion': 'Accordion',
//   'Dropdown': 'Dropdown',
//   'Login Form': 'loginForm',
// };

// function selectSuggestion(text) {
//   const input = document.querySelector('.search-input');
//   input.value = text;
//   document.getElementById('suggestionList').style.display = 'none';
//   if (input.value !== '') {
//     router.push(`/search/${encodeURIComponent(text)}`);
//   }
// }

// onMounted(() => {
//   window.selectSuggestion = selectSuggestion;
// });


import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import meta from "@/meta/snippets-meta.json";

const router = useRouter();
const modules = import.meta.glob('@/components/snippets/*.vue');

const groupedComponents = ref({});
const searchQuery = ref("");

// Load components (same as in your accordion page)
async function loadComponents() {
  const comps = [];
  for (const entry of meta) {
    const path = Object.keys(modules).find(p => p.endsWith(`/${entry.slug}.vue`));
    if (path) {
      const comp = (await modules[path]()).default;
      comps.push({ ...entry, component: comp });
    }
  }
  const grouped = {};
  comps.forEach(comp => {
    if (!grouped[comp.category]) grouped[comp.category] = [];
    grouped[comp.category].push(comp);
  });
  groupedComponents.value = grouped;
}

onMounted(loadComponents);

// Flattened filtered list for suggestions
const flatFilteredList = computed(() => {
  if (!searchQuery.value.trim()) return [];

  const words = searchQuery.value.toLowerCase().split(/\s+/).filter(Boolean);
  const allComps = Object.values(groupedComponents.value).flat();

  return allComps.filter(c =>
    words.every(word => c.label.toLowerCase().includes(word) || c.category.toLowerCase().includes(word))
  );
});

// Navigate
function goToComponent(slug) {
  router.push(`/component/${slug}`);
}
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
  /* display: none; */
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
  cursor: pointer;
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

.cta-hire-me {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
}

.hire-me-btn {
  background: #FF7519;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(255, 117, 25, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hire-me-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(255, 117, 25, 0.4);
}

@keyframes floatY {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

@keyframes floatX {

  0%,
  100% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(10px);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }
}

/* Animation Classes */
.floatY {
  animation: floatY 4s ease-in-out infinite;
}

.floatX {
  animation: floatX 6s ease-in-out infinite;
}

.spin {
  animation: spin 12s linear infinite;
}

.pulse {
  animation: pulse 3s ease-in-out infinite;
}
</style>