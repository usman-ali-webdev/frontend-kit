<template>
  <div class="component-view">
    <h2>{{ componentLabel }} Component</h2>
    <div class="tabs">
      <div class="tab-buttons">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>
      <div class="tab-content">
        <!-- Preview Tab -->
        <div v-if="activeTab === 'preview'" class="preview-container">
          <component v-if="component" :is="component" />
          <div v-else>Component not found.</div>
        </div>
        <!-- HTML Tab -->
        <div v-if="activeTab === 'html'" class="code-container">
          <pre><code>{{ htmlContent }}</code></pre>
        </div>
        <!-- CSS Tab -->
        <div v-if="activeTab === 'css'" class="code-container">
          <pre><code>{{ cssContent }}</code></pre>
        </div>
      </div>
    </div>
    <!-- Random Snippets Section -->
    <div class="random-snippets-section">
      <h3 style="margin: 2.5rem 0 1rem 0; font-size: 1.2rem; font-weight: 600;">You May Also Like</h3>
      <div class="random-snippets-list">
        <div
          v-for="comp in randomSnippets"
          :key="comp.slug"
          class="random-snippet-box"
        >
        <!-- target="_blank" -->
          <a
            :href="`/component/${comp.slug}`"
            rel="noopener"
            title="View Code"
            class="random-snippet-eye"
            @click.stop
          >
            <i class="fas fa-eye"></i>
          </a>
          <div class="random-snippet-label">{{ comp.label }}</div>
          <component :is="comp.component" v-bind="comp.props || {}" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { defineAsyncComponent } from 'vue';
import meta from '@/meta/snippets-meta.js';

// Dynamically import all components from the snippets folder
const snippetModules = import.meta.glob('@/components/snippets/*.vue');
const snippetCodeModules = import.meta.glob('@/components/snippets/*.vue', { as: 'raw' });

function getRandomElements(arr, n, excludeSlug) {
  const filtered = arr.filter(e => e.slug !== excludeSlug);
  const shuffled = filtered.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

export default {
  name: 'ComponentView',
  data() {
    return {
      activeTab: 'preview',
      tabs: [
        { id: 'preview', label: 'Preview' },
        { id: 'html', label: 'HTML' },
        { id: 'css', label: 'CSS' }
      ],
      component: null,
      htmlContent: '',
      cssContent: '',
      randomSnippets: []
    };
  },
  computed: {
    slug() {
      return this.$route?.params?.slug;
    },
    componentLabel() {
      return this.slug.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).trim();
    }
  },
  async created() {
    // Find the matching component by slug
    const match = Object.keys(snippetModules).find(path => {
      const fileName = path.split('/').pop().replace('.vue', '');
      return fileName.toLowerCase() === this.slug?.toLowerCase();
    });
    if (match) {
      this.component = defineAsyncComponent(snippetModules[match]);
      // Load the raw code for code preview
      const rawCode = await snippetCodeModules[match]();
      // Extract <template> and <style> blocks
      const templateMatch = rawCode.match(/<template>([\s\S]*?)<\/template>/);
      const styleMatch = rawCode.match(/<style[^>]*>([\s\S]*?)<\/style>/);
      this.htmlContent = templateMatch ? templateMatch[1].trim() : 'No <template> found.';
      this.cssContent = styleMatch ? styleMatch[1].trim() : 'No <style> found.';
    } else {
      this.$router.replace({ name: 'NotFound' });
    }
    // Load random snippets for the section
    const comps = [];
    for (const entry of meta) {
      const path = Object.keys(snippetModules).find(p => p.endsWith(`/${entry.slug}.vue`));
      if (path) {
        const comp = (await snippetModules[path]()).default;
        comps.push({ ...entry, component: comp });
      }
    }
    this.randomSnippets = getRandomElements(comps, 3, this.slug); // Show 3 random, not current
  },
  watch: {
    // Watch for route changes to update randomSnippets and component
    '$route.params.slug': {
      immediate: true,
      async handler(newSlug) {
        // Find the matching component by slug
        const match = Object.keys(snippetModules).find(path => {
          const fileName = path.split('/').pop().replace('.vue', '');
          return fileName.toLowerCase() === newSlug?.toLowerCase();
        });
        if (match) {
          this.component = defineAsyncComponent(snippetModules[match]);
          // Load the raw code for code preview
          const rawCode = await snippetCodeModules[match]();
          // Extract <template> and <style> blocks
          const templateMatch = rawCode.match(/<template>([\s\S]*?)<\/template>/);
          const styleMatch = rawCode.match(/<style[^>]*>([\s\S]*?)<\/style>/);
          this.htmlContent = templateMatch ? templateMatch[1].trim() : 'No <template> found.';
          this.cssContent = styleMatch ? styleMatch[1].trim() : 'No <style> found.';
        } else {
          this.$router.replace({ name: 'NotFound' });
        }
        // Update random snippets
        const comps = [];
        for (const entry of meta) {
          const path = Object.keys(snippetModules).find(p => p.endsWith(`/${entry.slug}.vue`));
          if (path) {
            const comp = (await snippetModules[path]()).default;
            comps.push({ ...entry, component: comp });
          }
        }
        this.randomSnippets = getRandomElements(comps, 3, newSlug);
      }
    }
  },
  methods: {
    goToComponent(slug) {
      this.$router.push(`/component/${slug}`).then(() => {
        // Wait for DOM update, then scroll to top
        this.$nextTick(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      });
    }
  }
};
</script>

<style scoped>
.component-view {
    padding: 20px;
}

.tabs {
    margin-top: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.tab-buttons {
    display: flex;
    border-bottom: 1px solid #ddd;
}

.tab-buttons button {
    padding: 10px 20px;
    border: none;
    background: none;
    cursor: pointer;
}

.tab-buttons button.active {
    background-color: #f0f0f0;
    border-bottom: 2px solid #42b883;
}

.tab-content {
    padding: 20px;
}

.code-container {
    background-color: #f8f8f8;
    padding: 15px;
    border-radius: 4px;
}

.code-container pre {
    margin: 0;
    white-space: pre-wrap;
}

.preview-container {
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 4px;
}

.random-snippets-section {
  margin-top: 2.5rem;
}
.random-snippets-list {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}
.random-snippet-box {
  flex: 1 1 180px;
  min-width: 180px;
  max-width: 240px;
  background: #f8fafc;
  border: 1.5px solid #e3e8f7;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(74,74,208,0.06);
  padding: 1rem 1rem 0.5rem 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  transition: box-shadow 0.2s, transform 0.18s;
}
.random-snippet-box:hover {
  box-shadow: 0 8px 24px rgba(74,74,208,0.13);
  transform: translateY(-2px) scale(1.03);
}
.random-snippet-eye {
  position: absolute;
  top: 10px;
  right: 12px;
  font-size: 1.1rem;
  color: #4a4ad0;
  cursor: pointer;
  z-index: 2;
}
.random-snippet-label {
  font-size: 1.05rem;
  font-weight: 600;
  color: #464646;
  margin-bottom: 0.7rem;
  margin-top: 0.2rem;
}
</style>