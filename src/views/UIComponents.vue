<template>
  <div class="in-components-wrapper" style="padding: 2rem;">
    <h1 style="font-size: 2rem; margin-bottom: 1.5rem;">UI Components</h1>
    <div style="display: flex; flex-wrap: wrap; gap: 1.5rem;">
      <div
        v-for="comp in snippetComponents"
        :key="comp.slug"
        style="flex: 1 1 200px; border: 1px solid #ccc; padding: 1rem; border-radius: 8px; position: relative;"
      >
        <span
          @click="goToComponent(comp.slug)"
          title="View Code"
          style="position: absolute; top: 10px; right: 12px; font-size: 1.3rem; color: #4a4ad0; cursor: pointer; z-index: 2;"
        >
          <i class="fas fa-eye"></i>
        </span>
        <h3 style="margin-bottom: 1rem;">{{ comp.label }}</h3>
        <component :is="comp.component" v-bind="comp.props || {}" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import TrimMultilineText from '@/components/snippets/TrimMultilineText.vue';
import loginForm from '@/components/snippets/loginForm.vue';

const router = useRouter();

const snippetComponents = [
  {
    slug: 'TrimMultilineText',
    label: 'Trim Multiline Text',
    component: TrimMultilineText,
    props: {
      text: 'This is a sample long text that will be trimmed across multiple lines. You can adjust the number of lines and other properties here.',
      maxLines: 3
    }
  },
  {
    slug: 'loginForm',
    label: 'Login Form',
    component: loginForm
  }
  // Add more snippet components here as needed
];

function goToComponent(slug) {
  router.push(`/component/${slug}`);
}
</script>

<style scoped>
</style>
