<template>
    <div class="dom-demo-cards">
        <h2 class="page-title">Animations & Transitions</h2>
        <div class="cards-grid">
            <div class="dom-card" v-for="(snippet, key) in cardData" :key="key">
                <!-- title gets the animation class for preview -->
                  <!-- :class="cardData[key].class" -->
                   <!-- :class="snippet.class" -->
                <h3 :data-key="key">
                    {{ snippet.title }}
                </h3>

                <pre class="code-block">{{ snippet.code }}</pre>

                <div class="btn-group">
                    <button class="action-btn" @click="copyCode(codeSnippets[key])">
                        Copy CSS
                    </button>
                    <button class="action-btn" @click="playAnimation(key)">
                        ▶ Play
                    </button>
                </div>

                <span v-if="copied === key" class="helper-msg">Copied!</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const copied = ref('')
const playStates = ref({}) // not used yet but can hold flags

const codeSnippets = {
    fadein: `.fade-in{animation:fadeIn .6s ease both}
@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`,

    slideup: `.slide-up{animation:slideUp .6s cubic-bezier(.2,.9,.2,1) both}
@keyframes slideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}`,

    bounce: `.bounce{animation:bounce .9s both}
@keyframes bounce{20%{transform:translateY(-10px)}40%{transform:translateY(0)}60%{transform:translateY(-6px)}80%{transform:translateY(0)}}`,

    spin: `.spin{display:inline-block;animation:spin 1s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}`,

    pulse: `.pulse{animation:pulse 1.2s ease-in-out infinite}
@keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.03)}100%{transform:scale(1)}}`,

    rotatein: `.rotate-in{animation:rotateIn .6s cubic-bezier(.2,.9,.2,1) both}
@keyframes rotateIn{from{opacity:0;transform:rotate(-12deg) scale(.95)}to{opacity:1;transform:none}}`,

    swing: `.swing{display:inline-block;animation:swing .8s ease both}
@keyframes swing{20%{transform:rotate(15deg)}40%{transform:rotate(-10deg)}60%{transform:rotate(6deg)}80%{transform:rotate(-3deg)}100%{transform:none}}`
}

const cardData = {
    fadein: { title: 'Fade In Animation (CSS)', code: codeSnippets.fadein, class: 'fade-in' },
    slideup: { title: 'Slide Up Animation (CSS)', code: codeSnippets.slideup, class: 'slide-up' },
    bounce: { title: 'Bounce Animation (CSS)', code: codeSnippets.bounce, class: 'bounce' },
    spin: { title: 'Spin Animation (CSS)', code: codeSnippets.spin, class: 'spin' },
    pulse: { title: 'Pulse Animation (CSS)', code: codeSnippets.pulse, class: 'pulse' },
    rotatein: { title: 'Rotate In Animation (CSS)', code: codeSnippets.rotatein, class: 'rotate-in' },
    swing: { title: 'Swing Animation (CSS)', code: codeSnippets.swing, class: 'swing' }
}

function copyCode(codeKey) {
    navigator.clipboard.writeText(codeKey)
    copied.value = Object.keys(codeSnippets).find(key => codeSnippets[key] === codeKey)
    setTimeout(() => (copied.value = ''), 1500)
}

function playAnimation(key) {
  // find the h3 element for this card
  const el = document.querySelector(`[data-key="${key}"]`)
  if (!el) return

  // remove the class to reset animation
  el.classList.remove(cardData[key].class)

  // force a reflow so the browser sees the change
  void el.offsetWidth

  // re-add the class (animation plays again)
  el.classList.add(cardData[key].class)
}
</script>

<style scoped>
/* your existing styles above… */

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

/* existing animations */
.fade-in {
    animation: fadeIn .6s ease both
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(8px)
    }

    to {
        opacity: 1;
        transform: none
    }
}

.slide-up {
    animation: slideUp .6s cubic-bezier(.2, .9, .2, 1) both
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(12px)
    }

    to {
        opacity: 1;
        transform: none
    }
}

.bounce {
    animation: bounce .9s both
}

@keyframes bounce {
    20% {
        transform: translateY(-10px)
    }

    40% {
        transform: translateY(0)
    }

    60% {
        transform: translateY(-6px)
    }

    80% {
        transform: translateY(0)
    }
}

.spin {
    display: inline-block;
    animation: spin 1s linear both
}

@keyframes spin {
    to {
        transform: rotate(360deg)
    }
}

.pulse {
    animation: pulse 1.2s ease-in-out both
}

@keyframes pulse {
    0% {
        transform: scale(1)
    }

    50% {
        transform: scale(1.03)
    }

    100% {
        transform: scale(1)
    }
}

.rotate-in {
    animation: rotateIn .6s cubic-bezier(.2, .9, .2, 1) both
}

@keyframes rotateIn {
    from {
        opacity: 0;
        transform: rotate(-12deg) scale(.95)
    }

    to {
        opacity: 1;
        transform: none
    }
}

.swing {
    display: inline-block;
    animation: swing .8s ease both
}

@keyframes swing {
    20% {
        transform: rotate(15deg)
    }

    40% {
        transform: rotate(-10deg)
    }

    60% {
        transform: rotate(6deg)
    }

    80% {
        transform: rotate(-3deg)
    }

    100% {
        transform: none
    }
}

/* replay helpers: apply the same animation again */
.fade-in-replay {
    animation: fadeIn .6s ease both
}

.slide-up-replay {
    animation: slideUp .6s cubic-bezier(.2, .9, .2, 1) both
}

.bounce-replay {
    animation: bounce .9s both
}

.spin-replay {
    animation: spin 1s linear infinite
}

.pulse-replay {
    animation: pulse 1.2s ease-in-out infinite
}

.rotate-in-replay {
    animation: rotateIn .6s cubic-bezier(.2, .9, .2, 1) both
}

.swing-replay {
    animation: swing .8s ease both
}

/* parent container behaves like flex */
.btn-group {
    display: flex;
    /* flex container */
    align-items: center;
    /* vertically center if heights differ */
}

/* create horizontal space between children */
.btn-group>*:not(:last-child) {
    margin-right: 0.5rem;
    /* 0.5rem ≈ Tailwind space-x-2 */
}
</style>
