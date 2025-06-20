<template>
  <div style="padding: 2rem;">
    <h1 style="font-size: 2rem; margin-bottom: 1.5rem;">All UI Components</h1>
    <div>
      <div v-for="(group, groupLabel) in groupedComponents" :key="groupLabel" class="accordion-group">
        <div class="accordion-header" @click="toggleAccordion(groupLabel)">
          <span>{{ groupLabel }}</span>
          <span class="accordion-arrow">{{ openAccordions[groupLabel] ? '▲' : '▼' }}</span>
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
              <component :is="comp.component" v-bind="comp.props || {}" />
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
import meta from '@/meta/snippets-meta.js';

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
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(74,74,208,0.13), 0 2px 8px rgba(0,0,0,0.05);
  background: rgba(255,255,255,0.7);
  backdrop-filter: blur(6px);
  border-left: 6px solid #4a4ad0;
  transition: box-shadow 0.25s, transform 0.18s;
}
.accordion-group:hover {
  box-shadow: 0 16px 48px rgba(74,74,208,0.18), 0 4px 16px rgba(0,0,0,0.07);
  transform: scale(1.012);
}
.accordion-header {
  cursor: pointer;
  padding: 1.5rem 2rem 1.5rem 2.5rem;
  font-size: 1.45rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  border-radius: 18px 18px 0 0;
  background: linear-gradient(100deg, #e0e7ef 0%, #f4f6fa 60%, #e0e7ef 100%);
  color: #2d3a4a;
  letter-spacing: 0.5px;
  position: relative;
  box-shadow: 0 2px 12px 0 rgba(74,74,208,0.08), 0 1px 0 #e0e7ef;
  border: 1.5px solid #e3e8f7;
  border-bottom: none;
  transition: background 0.2s, box-shadow 0.2s, border 0.2s;
}
.accordion-header:hover {
  background: linear-gradient(100deg, #dbeafe 0%, #e0e7ef 60%, #f4f6fa 100%);
  box-shadow: 0 4px 18px 0 rgba(74,74,208,0.13);
  border: 1.5px solid #b6c6f5;
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
  transition: transform 0.3s cubic-bezier(.4,2,.6,1), color 0.2s;
}
.accordion-arrow[aria-expanded="true"] {
  transform: rotate(180deg);
  color: #003eaa;
}
.accordion-content {
  padding: 2rem 2rem 1.5rem 2.5rem;
  background: rgba(255,255,255,0.85);
  border-radius: 0 0 18px 18px;
  animation: fadeInAccordion 0.4s cubic-bezier(.4,2,.6,1);
  box-shadow: 0 2px 8px rgba(74,74,208,0.04);
  border: 1.5px solid #e3e8f7;
  border-top: none;
}
@keyframes fadeInAccordion {
  from { opacity: 0; transform: translateY(-16px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
