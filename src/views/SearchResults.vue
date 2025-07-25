<template>
  <div style="padding: 2rem;">
    <h1 style="font-size: 2rem; margin-bottom: 1.5rem;">Search Results</h1>
    <div v-if="results.length === 0">No components found for "{{ query }}".</div>
    <div v-else>
      <div style="display: flex; flex-wrap: wrap; gap: 1.5rem;">
        <div
          v-for="comp in results"
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
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import meta from '@/meta/snippets-meta.json';
const modules = import.meta.glob('@/components/snippets/*.vue');

const route = useRoute();
const router = useRouter();
const query = ref(route.params.query || '');
const results = ref([]);

function goToComponent(slug) {
  router.push(`/component/${slug}`);
}

async function searchComponents() {
  const q = query.value.toLowerCase();
  const matches = meta.filter(entry =>
    entry.label.toLowerCase().includes(q) ||
    entry.category.toLowerCase().includes(q) ||
    (entry.description && entry.description.toLowerCase().includes(q))
  );
  const comps = [];
  for (const entry of matches) {
    const path = Object.keys(modules).find(p => p.endsWith(`/${entry.slug}.vue`));
    if (path) {
      const comp = (await modules[path]()).default;
      comps.push({ ...entry, component: comp });
    }
  }
  results.value = comps;
}

onMounted(searchComponents);
</script>
