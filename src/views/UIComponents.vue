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
      <h1 style="font-size: 2rem; margin-bottom: 1.5rem;">All UI Components</h1>
      <div style="display:flex; gap: 1.5rem; margin-bottom: 2rem;">
        <div>
          <!-- Sticky Sidebar -->
          <aside
            style="
              position: sticky;
              top: 2rem;
              align-self: flex-start;
              min-width: 220px;
              max-width: 260px;
              background: #f8fafd;
              border-radius: 10px;
              box-shadow: 0 2px 8px rgba(74,74,208,0.07);
              padding: 1.5rem 1rem;
              margin-right: 2.5rem;
              margin-bottom: 2rem;
              border: 1.5px solid #e3e8f7;
              font-size: 1.05rem;
            "
          >
            <h2 style="font-size: 1.15rem; margin-bottom: 1.2rem; color: var(--primary-color); font-weight: 700;">
              Components Index
            </h2>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li
                v-for="(group, groupLabel) in groupedComponents"
                :key="groupLabel"
                style="margin-bottom: 1.1rem;"
              >
                <a
                  href="#"
                  @click.prevent="toggleAccordion(groupLabel)"
                  :style="{
                    color: openAccordions[groupLabel] ? '#003eaa' : '#4a4ad0',
                    fontWeight: openAccordions[groupLabel] ? 'bold' : 'normal',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.2s'
                  }"
                >
                  <i class="fas fa-folder-open" style="margin-right: 0.5rem;"></i>
                  {{ groupLabel }}
                </a>
                <ul
                  v-show="openAccordions[groupLabel]"
                  style="list-style: none; padding-left: 1.2rem; margin-top: 0.5rem;"
                >
                  <li
                    v-for="comp in group"
                    :key="comp.slug"
                    style="margin-bottom: 0.5rem;"
                  >
                    <a
                      @click.prevent="goToComponent(comp.slug)"
                      href="#"
                      style="color: #444; text-decoration: none; font-size: 0.98rem; cursor: pointer;"
                    >
                      <i class="fas fa-cube" style="margin-right: 0.4rem; color: #4a4ad0;"></i>
                      {{ comp.label }}
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </aside>
        </div>
        <div style="flex: 1; min-width: 0;">
          <div v-for="(group, groupLabel) in groupedComponents" :key="groupLabel" class="accordion-group">
            <div class="accordion-header" @click="toggleAccordion(groupLabel)" :style="{ borderBottom: openAccordions[groupLabel] ? '1px solid var(--primary-color)' : '' }">
              <span>{{ groupLabel }}</span>
                <span
                class="accordion-arrow"
                :aria-expanded="openAccordions[groupLabel] ? 'true' : 'false'"
                >
                <i class="fas fa-chevron-down"></i>
                </span>
            </div>
            <div v-show="openAccordions[groupLabel]" class="accordion-content">
              <div style="display: flex; flex-wrap: wrap; gap: 1.5rem;">
                <div
                  v-for="comp in group"
                  :key="comp.slug"
                  style="flex: 1 1 200px; border: 1px solid #ccc; padding: 1rem; border-radius: 8px; position: relative; min-width: 220px; max-width: 350px; background: #fff; display: flex; flex-direction: column; align-items: stretch;"
                >
                  <span
                    @click="goToComponent(comp.slug)"
                    title="View Code"
                    style="position: absolute; top: 10px; right: 12px; font-size: 1.3rem; color: #4a4ad0; cursor: pointer; z-index: 2;"
                  >
                    <i class="fas fa-eye"></i>
                  </span>
                  <h3 style="margin-bottom: 0.5rem;">{{ comp.label }}</h3>
                  <p style="font-size: 0.95rem; color: #888; margin-bottom: 1rem;">{{ comp.description }}</p>
                  <div style="display: flex; justify-content: center; align-items: center; min-height: 120px; margin-bottom: 1rem;">
                    <img
                      :src="getPreviewImage(comp.previewImage)"
                      alt="Preview"
                      loading="lazy"
                      style="max-width: 100%; max-height: 120px; object-fit: contain; border-radius: 6px; box-shadow: 0 2px 8px rgba(74,74,208,0.07); background: #f6f8fa;"
                    />
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import meta from '@/meta/snippets-meta.json';
// Map all preview images in the folder
const previewImages = import.meta.glob('@/assets/images/component-previews/*', { eager: true, import: 'default' });

function getPreviewImage(filename) {
  if (!filename) return previewImages['/src/assets/images/component-previews/header-navbar-sampledd.png'];
  const path = `/src/assets/images/component-previews/${filename}`;
  return previewImages[path];
}

const router = useRouter();
const modules = import.meta.glob('@/components/snippets/*.vue');

const groupedComponents = ref({});
const openAccordions = ref({});

async function loadComponents() {
  const comps = [];
  for (const entry of meta) {
    const path = Object.keys(modules).find(p => p.endsWith(`/${entry.slug}.vue`));
    if (path) {
      const comp = (await modules[path]()).default;
      comps.push({ ...entry, component: comp });
    }
  }
  // Group by category
  const grouped = {};
  comps.forEach(comp => {
    if (!grouped[comp.category]) grouped[comp.category] = [];
    grouped[comp.category].push(comp);
  });
  groupedComponents.value = grouped;
  // Open all accordions by default
  Object.keys(grouped).forEach(cat => openAccordions.value[cat] = true);
}

onMounted(loadComponents);

function toggleAccordion(label) {
  openAccordions.value[label] = !openAccordions.value[label];
}

function goToComponent(slug) {
  router.push(`/component/${slug}`);
}
</script>

<style scoped>
.accordion-group {
  margin-bottom: 2rem;
  border-radius: 8px;
  background: rgba(255,255,255,0.7);
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
  content: '\f02e'; /* Font Awesome folder-open icon */
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
  padding: 2rem 2rem 1.5rem 2.5rem;
  background: rgba(255,255,255,0.85);
  border-radius: inherit;
  animation: fadeInAccordion 0.4s cubic-bezier(.4,2,.6,1);
  box-shadow: 0 2px 8px rgba(74,74,208,0.04);
  border: 1.5px solid #e3e8f7;
  border-top: none;
  min-width: 0;
}
@keyframes fadeInAccordion {
  from { opacity: 0; transform: translateY(-16px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
