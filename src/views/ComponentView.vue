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
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { defineAsyncComponent } from 'vue';

// Dynamically import all components from the snippets folder
const snippetModules = import.meta.glob('@/components/snippets/*.vue');
const snippetCodeModules = import.meta.glob('@/components/snippets/*.vue', { as: 'raw' });

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
      cssContent: ''
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
</style>