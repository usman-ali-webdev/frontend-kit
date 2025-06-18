<template>
  <div class="component-view">
    <h2>{{ componentConfig.label }} Component</h2>
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
          <component :is="componentConfig.component" v-bind="componentConfig.props" />
        </div>
        <!-- HTML Tab -->
        <div v-if="activeTab === 'html'" class="code-container">
          <pre><code>{{ componentConfig.htmlContent }}</code></pre>
        </div>
        <!-- CSS Tab -->
        <div v-if="activeTab === 'css'" class="code-container">
          <pre><code>{{ componentConfig.cssContent }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Example: Add more components here as needed
import TrimMultilineText from '@/components/snippets/TrimMultilineText.vue';
import loginForm from '@/components/snippets/loginForm.vue';
import { useRoute } from 'vue-router';

const componentMap = {
  TrimMultilineText: {
    label: 'TrimMultilineText',
    component: TrimMultilineText,
    props: {
      text: 'This is a sample long text that will be trimmed across multiple lines. You can adjust the number of lines and other properties here.',
      maxLines: 3
    },
    htmlContent: `<template>
  <p class="excerpt">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod enim eget ultricies sollicitudin. Nunc aliquam arcu arcu, non suscipit metus luctus id.
  </p>
</template>`,
    cssContent: `.excerpt {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}`
  },
  loginForm: {
    label: 'Login Form',
    component: loginForm,
    props: {},
    htmlContent: `<template>
    <div class="login-form">
        <form>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" class="form-input" required placeholder="Enter your email">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" class="form-input" required placeholder="Enter your password">
            </div>
            <button type="submit" class="login-button">Login</button>
        </form>
    </div>
</template>`,
    cssContent: `.login-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
}
.form-group {
    margin-bottom: 1rem;
}
label {
    display: block;
    margin-bottom: 0.5rem;
}
.form-input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}
.login-button {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
.login-button:hover {
    background-color: #45a049;
}`
  }
  // Add more components here as needed
};

export default {
  name: 'ComponentView',
  props: {
    componentName: {
      type: String,
      default: 'TrimMultilineText'
    }
  },
  data() {
    return {
      activeTab: 'preview',
      tabs: [
        { id: 'preview', label: 'Preview' },
        { id: 'html', label: 'HTML' },
        { id: 'css', label: 'CSS' }
      ]
    };
  },
  setup(props) {
    const route = useRoute();
    return { route };
  },
  computed: {
    componentConfig() {
      // Use route param if available, fallback to prop
      const slug = this.route?.params?.slug || this.componentName;
      return componentMap[slug] || componentMap['TrimMultilineText'];
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