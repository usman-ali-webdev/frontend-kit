<template>
  <div class="component-view">
    <nav class="breadcrumb">
      <router-link to="/" class="breadcrumb-home" title="Home">
        <i class="fas fa-home"></i>
      </router-link>
      <span class="breadcrumb-separator">/</span>
      <router-link to="/ui-components">UI Components</router-link>
      <span class="breadcrumb-separator">/</span>
      <span>{{ componentLabel }}</span>
    </nav>

    <h2>
      <button class="back-btn" @click="$router.push({ path: '/ui-components', query: $route.query })" title="Go Back"
        style="display: inline-flex; align-items: center; gap: 0.5em; background: none; border: none; color: #4a4ad0; font-size: 1.1rem; cursor: pointer; font-weight: 500; margin-bottom: 1.2rem;">
        <i class="fas fa-arrow-left"></i>
      </button>&ensp;{{ componentLabel }} Component
    </h2>
    <div v-if="loading" class="bouncing-loader">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div v-else class="tabs">
      <!-- <div class="tab-buttons">
        <button v-for="tab in tabs" :key="tab.id" :class="{ active: activeTab === tab.id }" @click="activeTab = tab.id">
          {{ tab.label }}
        </button>
      </div> -->
      <div class="tab-buttons">
        <button v-for="tab in tabs" :key="tab.id" :class="{ active: activeTab === tab.id }" @click="activeTab = tab.id">
          {{ tab.label }}
        </button>
      </div>

      <div class="tab-content" :class="{ 'preview-container': true }">
        <!-- Preview Tab -->
        <div v-if="activeTab === 'preview'">
          <component v-if="component" :is="component" />
          <div v-else>Component not found.</div>
        </div>
        <!-- HTML Tab -->
        <div v-if="activeTab === 'html'" class="code-container code-container--with-copy">
          <div class="code-toolbar">
            <button class="copy-btn" @click="copyToClipboard(htmlContent)" title="Copy HTML"><i class="fas fa-copy"></i>
              Copy</button>
          </div>
          <pre><code>{{ htmlContent }}</code></pre>
        </div>
        <!-- CSS Tab -->
        <div v-if="activeTab === 'css'" class="code-container code-container--with-copy">
          <div class="code-toolbar">
            <button class="copy-btn" @click="copyToClipboard(cssContent)" title="Copy CSS"><i class="fas fa-copy"></i>
              Copy</button>
          </div>
          <pre><code>{{ cssContent }}</code></pre>
        </div>
        <!-- JavaScript Tab -->
        <div v-if="activeTab === 'js'" class="code-container code-container--with-copy">
          <div class="code-toolbar">
            <button class="copy-btn" @click="copyToClipboard(jsContent)" title="Copy JavaScript">
              <i class="fas fa-copy"></i> Copy
            </button>
          </div>
          <pre><code>{{ jsContent }}</code></pre>
        </div>
      </div>
    </div>
    <!-- Random Snippets Section -->
    <div class="random-snippets-section">
      <h3 style="margin: 2.5rem 0 1rem 0; font-size: 1.2rem; font-weight: 600;">You May Also Like</h3>
      <div class="random-snippets-list">
        <div v-for="comp in randomSnippets" :key="comp.slug" class="random-snippet-box">
          <!-- target="_blank" -->
          <a :href="`/component/${comp.slug}`" rel="noopener" title="View Code" class="random-snippet-eye" @click.stop>
            <i class="fas fa-eye"></i>
          </a>
          <div class="random-snippet-label">{{ comp.label }}</div>
          <component :is="comp.component" v-bind="comp.props || {}" />
        </div>
      </div>
    </div>
    <div v-if="showToast" class="copy-toast">Copied!</div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { defineAsyncComponent } from 'vue';
import meta from '@/meta/snippets-meta.json';

// Dynamically import all components from the snippets folder
const snippetModules = import.meta.glob('@/components/snippets/*.vue');
const snippetCodeModules = import.meta.glob('@/components/snippets/*.vue', { as: 'raw' });

function getRandomElements(arr, n, excludeSlug) {
  const filtered = arr.filter(e => e.slug !== excludeSlug);
  const shuffled = filtered.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

function trimIndentation(str) {
  if (!str) return '';
  const lines = str.split('\n');
  // Remove empty lines at start/end
  while (lines.length && lines[0].trim() === '') lines.shift();
  while (lines.length && lines[lines.length - 1].trim() === '') lines.pop();
  // Find minimum indentation (ignore empty lines)
  const indents = lines.filter(l => l.trim()).map(l => l.match(/^\s*/)[0].length);
  const minIndent = indents.length ? Math.min(...indents) : 0;
  // Remove minIndent spaces from each line
  return lines.map(l => l.slice(minIndent)).join('\n');
}

export default {
  name: 'ComponentView',
  data() {
    return {
      activeTab: 'preview',
      tabs: [
        { id: 'preview', label: 'Preview' },
        { id: 'html', label: 'HTML' },
        { id: 'css', label: 'CSS' },
        { id: 'js', label: 'JS' } // 👈 new tab
      ],
      component: null,
      htmlContent: '',
      cssContent: '',
      jsContent: '',   // 👈 new state
      randomSnippets: [],
      loading: true,
      showToast: false
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
    this.loading = true;
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
      const scriptMatch = rawCode.match(/<script[^>]*>([\s\S]*?)<\/script>/);

      this.htmlContent = templateMatch ? trimIndentation(templateMatch[1]) : 'No <template> found.';
      this.cssContent = styleMatch ? trimIndentation(styleMatch[1]) : 'No <style> found.';
      this.jsContent = scriptMatch ? trimIndentation(scriptMatch[1]) : 'Enjoy, No JS required for this component.';
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
    this.loading = false;
  },
  watch: {
    // Watch for route changes to update randomSnippets and component
    '$route.params.slug': {
      immediate: true,
      async handler(newSlug) {
        this.loading = true;
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
          this.htmlContent = templateMatch ? trimIndentation(templateMatch[1]) : 'No <template> found.';
          this.cssContent = styleMatch ? trimIndentation(styleMatch[1]) : 'No <style> found.';
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
        this.loading = false;
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
    },
    copyToClipboard(content) {
      if (!content) return;
      // Add appropriate comment at the top if copying from HTML or CSS tab
      let textToCopy = content;
      const compName = this.componentLabel || '';
      if (this.activeTab === 'html') {
        textToCopy = `<!-- ${compName} HTML Starts Here -->\n` + content + `\n<!-- ${compName} HTML End Here (FRONTENDKIT.DEV) -->`;
      } else if (this.activeTab === 'css') {
        textToCopy = `/* ${compName} CSS Starts Here */\n` + content + `\n/* ${compName} CSS End Here (FRONTENDKIT.DEV) */`;
      } else if (this.activeTab === 'js') {
        textToCopy = `/* ${compName} JavaScript Starts Here */\n` + content + `\n/* ${compName} JavaScript End Here (FRONTENDKIT.DEV) */`;
      }

      navigator.clipboard.writeText(textToCopy).then(() => {
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 1500);
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
  position: relative;
  background-color: #f8f8f8;
  padding: 15px;
  border-radius: 8px;
  border: 1.5px solid #e3e8f7;
  margin-bottom: 1.2rem;
  box-shadow: 0 2px 8px rgba(74, 74, 208, 0.06);
}

.code-container--with-copy {
  padding-top: 2.5rem;
}

.code-toolbar {
  position: absolute;
  top: 0.7rem;
  right: 1.2rem;
  display: flex;
  gap: 0.5rem;
}

.copy-btn {
  background: #f4f4f9;
  border: 1px solid #e3e8f7;
  border-radius: 6px;
  padding: 6px 14px 6px 10px;
  font-size: 1.08rem;
  color: #4a4ad0;
  cursor: pointer;
  z-index: 2;
  transition: background 0.18s, color 0.18s;
  display: flex;
  align-items: center;
  gap: 0.4em;
  font-weight: 500;
}

.copy-btn:hover {
  background: #eaeafb;
  color: #2222aa;
}

.code-container pre {
  margin: 0;
  white-space: pre-wrap;
  font-size: 1.04rem;
  font-family: 'Fira Mono', 'Consolas', 'Menlo', monospace;
  background: none;
  border: none;
  box-shadow: none;

  & code {
    font-size: 13px;
  }
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
  box-shadow: 0 2px 8px rgba(74, 74, 208, 0.06);
  padding: 1rem 1rem 0.5rem 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  transition: box-shadow 0.2s, transform 0.18s;
}

.random-snippet-box:hover {
  box-shadow: 0 8px 24px rgba(74, 74, 208, 0.13);
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

.copy-toast {
  position: fixed;
  left: 50%;
  bottom: 32px;
  transform: translateX(-50%) translateY(40px);
  background: #2222aa;
  color: #fff;
  padding: 0.7rem 2.2rem;
  border-radius: 999px;
  font-size: 1.08rem;
  font-weight: 600;
  box-shadow: 0 6px 32px rgba(74, 74, 208, 0.13);
  opacity: 0;
  pointer-events: none;
  z-index: 99999;
  animation: toast-in 0.35s cubic-bezier(.4, 2, .6, 1) forwards, toast-out 0.35s 1.15s cubic-bezier(.4, 2, .6, 1) forwards;
}

@keyframes toast-in {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(40px);
  }

  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@keyframes toast-out {
  from {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  to {
    opacity: 0;
    transform: translateX(-50%) translateY(-40px);
  }
}
</style>