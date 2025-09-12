<template>
    <div class="dom-demo-cards">
        <h2 class="page-title">DOM Manipulation Helpers</h2>
        <div class="cards-grid">
            <!-- Copy to Clipboard Helper -->
            <div class="dom-card" v-for="(snippet, key) in cardData" :key="key">
                <h3>{{ snippet.title }}</h3>
                <pre class="code-block">{{ snippet.code }}</pre>
                <button class="action-btn" @click="copyCode(codeSnippets[key])">
                    Copy Code
                </button>
                <span v-if="copied === key" class="helper-msg">Copied!</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const copied = ref('');

const codeSnippets = {
    copy: `const text = document.querySelector('#myInput').value;\nnavigator.clipboard.writeText(text);`,
    scroll: `document.querySelector('#target').scrollIntoView({\n  behavior: 'smooth',\n  block: 'center'\n});`,
    highlight: `const el = document.querySelector('#highlight');\nel.classList.add('highlighted');\n// CSS:\n// .highlighted { background: yellow; transition: background 0.3s; }`,
    toggle: `document.querySelector('#toggleMe').classList.toggle('active');`,
    showhide: `const el = document.querySelector('#hideMe');\nel.style.display = el.style.display === 'none' ? 'block' : 'none';`,
    button: `document.querySelector('#myBtn').addEventListener('click', function() {\n  // Your action here\n  alert('Button clicked!');\n});`,
    // Create & Append Element
    createappend: `const newEl = document.createElement('div');\nnewEl.textContent = 'Hello World';\ndocument.body.appendChild(newEl);`,

    // Remove Element
    remove: `const el = document.querySelector('#removeMe');\nel.remove();`,

    // Replace Element Content
    replace: `const el = document.querySelector('#replaceMe');\nel.innerHTML = '<strong>New Content</strong>';`,

    // Add Event Delegation
    delegation: `document.querySelector('#parent').addEventListener('click', function(e){\n  if(e.target.matches('.child')){\n    alert('Child clicked!');\n  }\n});`,

    // Smooth Fade Toggle (JS + CSS)
    fade: `const el = document.querySelector('#fadeMe');\nel.classList.toggle('fade');\n// CSS:\n// .fade { opacity: 0; transition: opacity 0.5s; }`,
    tour: `// Add 'data-tour' to each element you want to highlight:
// <button data-tour="Step 1: Click here to start">Start</button>
// <input data-tour="Step 2: Enter your name">

const steps = document.querySelectorAll('[data-tour]');
let index = 0;
let tooltip;

function renderStep(i) {
  steps.forEach(el => el.classList.remove('tour-highlight'));
  if (tooltip) tooltip.remove();

  if (steps[i]) {
    const el = steps[i];
    el.classList.add('tour-highlight');

    tooltip = document.createElement('div');
    tooltip.className = 'tour-tooltip';
    tooltip.innerHTML = \`
      <div class="tour-text">\${el.dataset.tour}</div>
      <div class="tour-actions">
        <button onclick="prevStep()">◀ Prev</button>
        <button onclick="nextStep()">Next ▶</button>
        <button onclick="endTour()">End ✖</button>
      </div>
    \`;
    document.body.appendChild(tooltip);

    const rect = el.getBoundingClientRect();
    tooltip.style.top = window.scrollY + rect.bottom + 6 + 'px';
    tooltip.style.left = window.scrollX + rect.left + 'px';
  }
}

function nextStep() {
  index = Math.min(index + 1, steps.length - 1);
  renderStep(index);
}

function prevStep() {
  index = Math.max(index - 1, 0);
  renderStep(index);
}

function endTour() {
  steps.forEach(el => el.classList.remove('tour-highlight'));
  if (tooltip) tooltip.remove();
  index = 0;
}

// Start the tour:
renderStep(index);`
};

const cardData = {
    copy: { title: 'Copy to Clipboard (JS)', code: codeSnippets.copy },
    scroll: { title: 'Scroll to Element (JS)', code: codeSnippets.scroll },
    highlight: { title: 'Highlight Element (JS + CSS)', code: codeSnippets.highlight },
    toggle: { title: 'Toggle Class (JS)', code: codeSnippets.toggle },
    showhide: { title: 'Show/Hide Element (JS)', code: codeSnippets.showhide },
    button: { title: 'Button Click Event (JS)', code: codeSnippets.button },
    createappend: { title: 'Create & Append Element (JS)', code: codeSnippets.createappend },
    remove: { title: 'Remove Element (JS)', code: codeSnippets.remove },
    replace: { title: 'Replace Element Content (JS)', code: codeSnippets.replace },
    delegation: { title: 'Event Delegation (JS)', code: codeSnippets.delegation },
    fade: { title: 'Fade Toggle (JS + CSS)', code: codeSnippets.fade },
    tour: {
        title: 'Simple Website Tour Guide (JS + CSS)',
        code: codeSnippets.tour
    }
};

function copyCode(codeKey) {
    navigator.clipboard.writeText(codeKey);
    copied.value = Object.keys(codeSnippets).find(key => codeSnippets[key] === codeKey);
    setTimeout(() => copied.value = '', 1500);
}
</script>

<style scoped>
.dom-demo-cards {
    max-width: 90%;
    margin: 0 auto;
    padding: 2rem;
}

.page-title {
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    color: #334155;
    margin-bottom: 2rem;
    background: linear-gradient(90deg, #4f46e5, #3b82f6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
    gap: 1.5rem;
}

.dom-card {
    background: #ffffff;
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.dom-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
}

.dom-card h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 1rem;
}

.code-block {
    background: #f8fafd;
    color: #1e293b;
    font-size: 0.9rem;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
    width: 100%;
    font-family: 'Fira Mono', 'Consolas', monospace;
    white-space: pre-line;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.03);
}

.action-btn {
    background: #4f46e5;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    align-self: start;
    transition: background 0.2s ease;
}

.action-btn:hover {
    background: #3b82f6;
}

.helper-msg {
    color: #16a34a;
    font-size: 0.9rem;
    margin-top: 0.5rem;
    display: block;
}

/* put in <style scoped> */
.fade {
    opacity: 0;
    transition: opacity 0.5s;
}

.tour-highlight {
    position: relative;
    z-index: 9999;
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.4);
    border-radius: 6px;
    transition: box-shadow 0.3s;
}
</style>
