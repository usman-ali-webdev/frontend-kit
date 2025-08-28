<template>
  <div style="padding: 2rem;">
    <div class="accordion-container" style="max-width: 1200px; margin: auto;">
      <nav class="breadcrumb">
        <router-link to="/" class="breadcrumb-home" title="Home">
          <i class="fas fa-home"></i>
        </router-link>
        <span class="breadcrumb-separator">/</span>
        <router-link to="/ui-components">UI Components</router-link>
        <span class="breadcrumb-separator">/</span>
        <span>{{ componentLabel }}</span>
      </nav>
      <div class="header-section">
        <h1 style="font-size: 2rem; margin-bottom: 1.5rem;">All UI Components</h1>
        <div style="margin-bottom: 1.5rem; max-width: 400px; min-width: 280px;">
          <input v-model="searchQuery" @input="hasInteracted = true" class="in-search-component" type="text"
            placeholder="Search here or pick from the sidebar..." />
        </div>
      </div>
      <div style="display:flex; gap: 1.5rem; margin-bottom: 2rem;">
        <div v-show="true">
          <div :class="['sidebar-drawer', { 'drawer-open': sidebarOpen }]">
            <button @click="sidebarOpen = !sidebarOpen" :style="!sidebarOpen ? 'left: 240px;' : 'left: 248px;'"
              class="drawer-toggle stylish-toggle">
              <i v-if="!sidebarOpen" style="font-size: 18px;" class="fa-solid fa-circle-chevron-right"></i>
              <i v-else style="font-size: 18px;" class="fa-solid fa-circle-chevron-left"></i>
            </button>
            <aside class="in-aside-area">
              <h2 style="font-size: 1.15rem; margin-bottom: 1.2rem; color: var(--primary-color); font-weight: 700;">
                Components Index
              </h2>
              <ul style="list-style: none; padding: 0; margin: 0;">
                <li v-for="(group, groupLabel) in groupedComponents" :key="groupLabel"
                  style="margin-bottom: 1.1rem; font-size: .9rem;">
                  <a href="#" @click.prevent="handleSidebarClick(groupLabel)" :style="{
                    color: openAccordions[groupLabel] ? '#003eaa' : '#4a4ad0',
                    fontWeight: openAccordions[groupLabel] ? 'bold' : 'normal',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.2s'
                  }">
                    <i class="fas fa-folder-open" style="margin-right: 0.5rem;"></i>
                    {{ groupLabel }} <span style="color: #888; font-size: 0.97em;">({{ group.length }})</span>
                  </a>
                </li>
              </ul>
            </aside>
          </div>
          <div v-show="sidebarOpen" class="drawer-overlay" @click="sidebarOpen = false"></div>
        </div>

        <div style="flex: 1; min-width: 0;">
          <div v-if="!filteredGroupedComponents">
            <p style="color: #888; font-style: italic; text-align: center; font-size: 2vw;">No results found</p>
          </div>
          <!-- <div v-else-if="!hasInteracted && Object.keys(filteredGroupedComponents).length === 0">
            Click on a Category from Sidebar or Search any Component in Searchbar
          </div> -->
          <div v-else-if="!hasInteracted && Object.keys(filteredGroupedComponents).length === 0"
            style="display: flex; align-items: center; justify-content: center; height: 300px; border: 1px solid #e0e0e0; border-radius: 12px; background: #f9f9ff;">
            <div style="text-align: center; max-width: 400px; padding: 2rem;">
              <i class="fas fa-puzzle-piece" style="font-size: 4rem; color: #4a4ad0; margin-bottom: 1rem;"></i>
              <p style="font-size: 1.1rem; color: #333; font-weight: 500;">
                Select a component category from the sidebar to preview its UI examples, <br />
                or search for a component above.
              </p>
            </div>
          </div>

          <div v-else-if="hasInteracted">
            <div v-for="(group, groupLabel) in filteredGroupedComponents" :key="groupLabel" class="accordion-group">
              <!-- @click="toggleAccordion(groupLabel) -->
              <div class="accordion-header"
                :style="{ borderBottom: openAccordions[groupLabel] ? '1px solid var(--primary-color)' : '' }">
                <span>{{ groupLabel }}</span>
              </div>
              <div v-show="openAccordions[groupLabel]" class="accordion-content">
                <div style="display: flex; gap: 2rem;">
                  <div style="min-width: 160px;">
                    <ul style="list-style: none; padding: 0;">
                      <li v-for="(comp, index) in group" :key="comp.slug" @click="activeTab[groupLabel] = index" :style="{
                        cursor: 'pointer',
                        padding: '0.5rem 1rem',
                        background: activeTab[groupLabel] === index ? '#e3e8f7' : 'transparent',
                        color: activeTab[groupLabel] === index ? '#4a4ad0' : '#333',
                        borderRadius: '6px',
                        marginBottom: '0.5rem',
                        fontWeight: activeTab[groupLabel] === index ? 'bold' : 'normal',
                      }">
                        {{ comp.label }}
                      </li>
                    </ul>
                  </div>
                  <div style="flex: 1;">
                    <div v-for="(comp, index) in group" :key="comp.slug" v-show="activeTab[groupLabel] === index"
                      style="position: relative; border: 1px solid #ccc; padding: 1rem; border-radius: 8px; background: #fff;">
                      <span @click="goToComponent(comp.slug)" title="View Code"
                        style="position: absolute; top: 10px; right: 12px; font-size: 1.3rem; color: #4a4ad0; cursor: pointer; z-index: 2;">
                        <i class="fas fa-eye"></i>
                      </span>
                      <h3 style="margin-bottom: 0.5rem;">{{ comp.label }}</h3>
                      <p style="font-size: 0.95rem; color: #888; margin-bottom: 1rem;">{{ comp.description }}</p>
                      <div style="margin-top: 1rem;">
                        <component :is="comp.component" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import meta from '@/meta/snippets-meta.json'

const router = useRouter()
const modules = import.meta.glob('@/components/snippets/*.vue')

const groupedComponents = ref({})
const openAccordions = ref({})
const activeTab = ref({})
const sidebarOpen = ref(false)

const searchQuery = ref('')
const hasInteracted = ref(false)
const selectedCategory = ref(null) // 🔑 track the active sidebar category

async function loadComponents() {
  const comps = []
  for (const entry of meta) {
    const path = Object.keys(modules).find(p => p.endsWith(`/${entry.slug}.vue`))
    if (path) {
      const comp = (await modules[path]()).default
      comps.push({ ...entry, component: comp })
    }
  }

  const grouped = {}
  comps.forEach(comp => {
    if (!grouped[comp.category]) grouped[comp.category] = []
    grouped[comp.category].push(comp)
  })

  groupedComponents.value = grouped

  Object.keys(grouped).forEach(cat => {
    openAccordions.value[cat] = false
    activeTab.value[cat] = 0
  })
}

onMounted(loadComponents)
function handleSidebarClick(label) {
  hasInteracted.value = true
  searchQuery.value = ''          // 🔑 clear search when sidebar is clicked
  selectedCategory.value = label  // set active category
  Object.keys(openAccordions.value).forEach(cat => (openAccordions.value[cat] = false))
  openAccordions.value[label] = true
}
// function toggleAccordion(label) { 
// openAccordions.value[label] = !openAccordions.value[label]; 
// }
function goToComponent(slug) {
  router.push(`/component/${slug}`)
}

const filteredGroupedComponents = computed(() => {
  if (searchQuery.value.trim()) {
    const words = searchQuery.value.toLowerCase().split(/\s+/).filter(Boolean)
    const filtered = {}

    for (const [category, comps] of Object.entries(groupedComponents.value)) {
      const categoryMatch = words.every(word => category.toLowerCase().includes(word))
      const matches = comps.filter(c =>
        words.every(word => c.label.toLowerCase().includes(word))
      )

      if (categoryMatch || matches.length) {
        filtered[category] = categoryMatch ? comps : matches

        // 🔑 Auto-expand on search match (category OR subcomponent)
        Object.keys(openAccordions.value).forEach(cat => (openAccordions.value[cat] = false))
        openAccordions.value[category] = true
        if (activeTab.value[category] == null) {
          activeTab.value[category] = 0
        }
      }
    }

    return Object.keys(filtered).length ? filtered : null
  }

  // if sidebar clicked
  if (selectedCategory.value) {
    return { [selectedCategory.value]: groupedComponents.value[selectedCategory.value] }
  }

  return {}
})



const componentLabel = computed(() => {
  const currentComponent = Object.values(groupedComponents.value).flat().find(c => c.slug === router.currentRoute.value.params.slug)
  return currentComponent ? currentComponent.label : 'UI Components'
})
</script>





<style scoped>
.accordion-group {
  margin-bottom: 2rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(6px);
  transition: box-shadow 0.25s, transform 0.18s;
  border: 1.5px solid var(--primary-color);
  overflow: hidden;
  width: 100%;
}

.accordion-header {
  cursor: pointer;
  padding: .9rem 1.5rem;
  font-size: 1.2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  background-color: lavender;
  color: var(--primary-color);
  letter-spacing: 0.5px;
  position: relative;
  font-weight: bold;
  font-family: 'Samsung Sharp Sans Medium';
}

.accordion-header::before {
  content: '\f02e';
  /* Font Awesome folder-open icon */
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
  color: #4a4ad0;
  font-size: 1.3rem;
  margin-right: 1rem;
  opacity: 0.7;
}

.accordion-arrow {
  font-size: 1.5rem;
  color: #4a4ad0;
  margin-left: auto;
  transition: transform 0.3s ease-in, color 0.2s;
}

.accordion-arrow[aria-expanded="true"] {
  transform: rotate(180deg);
  color: #003eaa;
}

.accordion-content {
  padding: 1.5rem 1rem;
  background: rgba(255, 255, 255, 0.85);
  border-radius: inherit;
  animation: fadeInAccordion 0.4s cubic-bezier(.4, 2, .6, 1);
  box-shadow: 0 2px 8px rgba(74, 74, 208, 0.04);
  border: 1.5px solid #e3e8f7;
  border-top: none;
  min-width: 0;
}

@keyframes fadeInAccordion {
  from {
    opacity: 0;
    transform: translateY(-16px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Mobile drawer behavior */
/* Show drawer */
.drawer-open {
  transform: translateX(0);
}

/* Overlay */
.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 998;
}

/* Drawer toggle button */
.drawer-toggle {
  display: none;
  position: relative;
  top: 7rem;
  left: 240px;
  z-index: 1000;
  background: #4a4ad0;
  color: white;
  border: none;
  padding: 0.7rem 1rem;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  font-size: 1.2rem;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: left 0.3s ease;
}

/* Optional pull-tab illusion */
.drawer-toggle::after {
  content: '';
  position: absolute;
  top: 50%;
  right: -5px;
  transform: translateY(-50%);
  width: 5px;
  height: 40%;
  background: rgba(0, 0, 0, 0.08);
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

@media (max-width: 768px) {
  .drawer-toggle {
    display: block;
  }
}


/* Mobile view: override to behave like drawer */
@media (max-width: 768px) {
  .sidebar-drawer {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 260px;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
    z-index: 999;
    border-radius: 0;
    margin: 0;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.08);
  }

  .drawer-open {
    transform: translateX(0);
  }
}

/* Default: Desktop styles (your original) */
.sidebar-drawer {
  position: sticky;
  top: 2rem;
  align-self: flex-start;
  min-width: 220px;
  max-width: 260px;
  border-radius: 10px;

  /* margin-right: 2.5rem; */
  margin-bottom: 2rem;
  font-size: 1.05rem;
  transform: none !important;
}

/* Mobile: override as drawer */
@media (max-width: 768px) {
  .sidebar-drawer {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 260px;
    background: #f8fafd;
    padding: 1.5rem 1rem;
    border: 1.5px solid #e3e8f7;
    box-shadow: 0 2px 8px rgba(74, 74, 208, 0.07);
    transform: translateX(-100%) !important;
    transition: transform 0.3s ease-in-out;
    z-index: 999;
    border-radius: 0;
    margin: 0;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.08);
  }

  .sidebar-drawer.drawer-open {
    transform: translateX(0) !important;
  }
}

.in-search-component {
  width: 100%;
  padding: 0.65rem 1rem;
  font-size: 1rem;
  border: 1.5px solid #ccc;
  border-radius: 6px;
  outline: none;
}

.in-aside-area {
  position: sticky;
  top: 2rem;
  align-self: flex-start;
  min-width: 220px;
  max-width: 260px;
  background: #f8fafd;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(74, 74, 208, 0.07);
  padding: 1.5rem 1rem;
  margin-right: 2.5rem;
  margin-bottom: 2rem;
  border: 1.5px solid #e3e8f7;
  font-size: 1.05rem;
}

.header-section {
  margin-bottom: 1.1rem;
}

@media(min-width: 769px) {
  .header-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
