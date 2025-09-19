<template>
  <div class="builder">
    <div class="toolbar">
      <button class="theme-btn" @click="addContainer">+ Container</button>
      <button class="theme-btn export" @click="exportLayout">Export</button>
    </div>

    <div id="layout-generator" :class="{ building }" @click="clearSelection">
      <div v-for="(container, cIdx) in containers" :key="container.id" class="container" :class="{ 'selected-outline': selected?.type === 'container' && selected?.cIdx === cIdx }" :data-c="cIdx" :style="elementStyle(container)" @click.stop="selectElement('container', cIdx)">
        <div v-for="(snip, idx) in container.snippets || []" :key="snip.name + idx" class="snippet-item">
          <component :is="loadedSnippets[snip.name]" />
          <button class="snippet-remove" @click.stop="removeSnippet('container', cIdx, null, null, idx)">Remove</button>
        </div>
        <div class="toolbar-small toolbar-center">
          <button class="theme-btn" @click.stop="addRow(cIdx)">+ Row</button>
          <button class="theme-btn" @click.stop="openPicker('container', cIdx)">+ Add Component</button>
        </div>
        <div v-if="picker.show && picker.type === 'container' && picker.cIdx === cIdx" class="picker-inline toolbar-center">
          <input type="text" v-model="searchQuery" placeholder="Search component..." class="picker-search" />
          <div class="picker-list">
            <button v-for="snip in filteredSnippets" :key="snip.name" class="picker-item" @click.stop="addSnippetToElement(snip.name)">{{ snip.name }}</button>
          </div>
          <button class="picker-close" @click.stop="closePicker">Close</button>
        </div>

        <div v-for="(row, rIdx) in container.rows" :key="row.id" class="row" :class="{ 'selected-outline': selected?.type === 'row' && selected?.cIdx === cIdx && selected?.rIdx === rIdx }" :data-c="cIdx" :data-r="rIdx" :style="elementStyle(row)" @click.stop="selectElement('row', cIdx, rIdx)">
          <div v-for="(snip, idx) in row.snippets || []" :key="snip.name + idx" class="snippet-item">
            <component :is="loadedSnippets[snip.name]" />
            <button class="snippet-remove" @click.stop="removeSnippet('row', cIdx, rIdx, null, idx)">Remove</button>
          </div>
          <div v-for="(column, colIdx) in row.columns" :key="column.id" class="column" :class="{ 'selected-outline': selected?.type === 'column' && selected?.cIdx === cIdx && selected?.rIdx === rIdx && selected?.colIdx === colIdx }" :data-c="cIdx" :data-r="rIdx" :data-col="colIdx" :style="elementStyle(column)" @click.stop="selectElement('column', cIdx, rIdx, colIdx)">
            <!-- Column -->
            <div v-for="(snip, idx) in column.snippets || []" :key="snip.name + idx" class="snippet-item">
              <component :is="loadedSnippets[snip.name]" />
              <button class="snippet-remove" @click.stop="removeSnippet('column', cIdx, rIdx, colIdx, idx)">Remove</button>
            </div>
            <div class="toolbar-small toolbar-center">
              <button class="theme-btn" @click.stop="openPicker('column', cIdx, rIdx, colIdx)">+ Add Component</button>
            </div>
            <div v-if="picker.show && picker.type === 'column' && picker.cIdx === cIdx && picker.rIdx === rIdx && picker.colIdx === colIdx" class="picker-inline toolbar-center">
              <input type="text" v-model="searchQuery" placeholder="Search component..." class="picker-search" />
              <div class="picker-list">
                <button v-for="snip in filteredSnippets" :key="snip.name" class="picker-item" @click.stop="addSnippetToElement(snip.name)">{{ snip.name }}</button>
              </div>
              <button class="picker-close" @click.stop="closePicker">Close</button>
            </div>
          </div>
          <div class="toolbar-small toolbar-center">
            <button class="theme-btn" @click.stop="addColumn(cIdx, rIdx)">+ Column</button>
            <button class="theme-btn" @click.stop="openPicker('row', cIdx, rIdx)">+ Add Component</button>
          </div>
          <div v-if="picker.show && picker.type === 'row' && picker.cIdx === cIdx && picker.rIdx === rIdx" class="picker-inline toolbar-center">
            <input type="text" v-model="searchQuery" placeholder="Search component..." class="picker-search" />
            <div class="picker-list">
              <button v-for="snip in filteredSnippets" :key="snip.name" class="picker-item" @click.stop="addSnippetToElement(snip.name)">{{ snip.name }}</button>
            </div>
            <button class="picker-close" @click.stop="closePicker">Close</button>
          </div>
          <!-- Render row snippets first -->
          <div v-for="(snip, idx) in row.snippets || []" :key="snip.name + idx" class="snippet-item">
            <component :is="loadedSnippets[snip.name]" />
            <button class="snippet-remove" @click.stop="removeSnippet('row', cIdx, rIdx, null, idx)">Remove</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- floating control panel positioned at selected element's top-right -->
  <div v-if="selected" class="control-panel" :style="panelStyle">
    <h4>Edit {{ selected.type }}</h4>
    <label>Padding <input type="number" v-model.number="selectedRef.padding" /></label>
    <label>Margin <input type="number" v-model.number="selectedRef.margin" /></label>
    <label>Border Width <input type="number" v-model.number="selectedRef.borderWidth" /></label>
    <div style="margin-top:6px; font-size:12px; color:#666">
      Click outside to close panel
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, watch, onMounted, onBeforeUnmount } from 'vue'
// ...existing imports...
// Dynamically import all snippets/components from src/components/snippets

// element picker start here
const snippetModules = import.meta.glob('../components/snippets/*.vue')
const snippetNames = Object.keys(snippetModules).map(path => {
  const name = path.split('/').pop().replace('.vue', '')
  return { path, name }
})

const loadedSnippets = ref({})
async function loadSnippet(name) {
  const modInfo = snippetNames.find(s => s.name === name)
  if (!modInfo) return null
  if (!loadedSnippets.value[name]) {
    loadedSnippets.value[name] = (await snippetModules[modInfo.path]()).default
  }
  return loadedSnippets.value[name]
}

// Picker state
function removeSnippet(type, cIdx, rIdx, colIdx, idx) {
  let target = null
  if (type === 'container') target = containers.value[cIdx]
  if (type === 'row') target = containers.value[cIdx]?.rows[rIdx]
  if (type === 'column') target = containers.value[cIdx]?.rows[rIdx]?.columns[colIdx]
  if (!target || !target.snippets) return
  target.snippets.splice(idx, 1)
}
const picker = ref({ type: null, cIdx: null, rIdx: null, colIdx: null, show: false })
const searchQuery = ref('')
const filteredSnippets = computed(() => {
  if (!searchQuery.value) return snippetNames
  return snippetNames.filter(s => s.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
})

function openPicker(type, cIdx, rIdx = null, colIdx = null) {
  picker.value = { type, cIdx, rIdx, colIdx, show: true }
  searchQuery.value = ''
}
function closePicker() {
  picker.value.show = false
}

async function addSnippetToElement(snippetName) {
  const snippetComp = await loadSnippet(snippetName)
  if (!snippetComp) return
  const { type, cIdx, rIdx, colIdx } = picker.value
  let target = null
  if (type === 'container') target = containers.value[cIdx]
  if (type === 'row') target = containers.value[cIdx]?.rows[rIdx]
  if (type === 'column') target = containers.value[cIdx]?.rows[rIdx]?.columns[colIdx]
  if (!target) return
  if (!target.snippets) target.snippets = []
  target.snippets.push({ name: snippetName })
  closePicker()
}

// element picker end here
/* data */
const containers = ref([])
const building = ref(true)
let idCounter = 0
function uniqueId() { return Date.now() + '-' + (idCounter++) }

/* selection */
const selected = ref(null) // { type, cIdx, rIdx, colIdx }
const selectedRef = computed({
  get() {
    if (!selected.value) return {}
    const { type, cIdx, rIdx, colIdx } = selected.value
    if (type === 'container') return containers.value[cIdx]
    if (type === 'row') return containers.value[cIdx]?.rows[rIdx]
    if (type === 'column') return containers.value[cIdx]?.rows[rIdx]?.columns[colIdx]
    return {}
  }
})

/* panel position */
const panelPos = ref({ top: 0, right: 0 }) // <-- declared (fixes ReferenceError)
const panelWidthEstimate = 220

const panelStyle = computed(() => {
  return {
    position: 'absolute',
    top: panelPos.value.top + 'px',
    right: panelPos.value.right + 'px',
    width: panelWidthEstimate + 'px'
  }
})

/* utilities to add elements */
function addContainer() {
  containers.value.push({
    id: uniqueId(),
    type: 'container',
    padding: 10,
    margin: 10,
    borderWidth: 0,
    rows: []
  })
}
function addRow(cIdx) {
  containers.value[cIdx].rows.push({
    id: uniqueId(),
    type: 'row',
    padding: 10,
    margin: 10,
    borderWidth: 0,
    columns: []
  })
}
function addColumn(cIdx, rIdx) {
  const row = containers.value[cIdx].rows[rIdx]
  row.columns.push({
    id: uniqueId(),
    type: 'column',
    padding: 10,
    margin: 10,
    borderWidth: 0,
    flex: 1
  })
  // equalize flex for all columns
  const count = row.columns.length
  row.columns.forEach(col => col.flex = 1 / count)
}

/* select/deselect */
function selectElement(type, cIdx, rIdx = null, colIdx = null) {
  selected.value = { type, cIdx, rIdx, colIdx }
  // wait DOM update then measure & position panel
  nextTick().then(updatePanelPos)
}
function clearSelection() {
  selected.value = null
}

/* measure and position panel */
async function updatePanelPos() {
  if (!selected.value) return
  await nextTick()
  const { type, cIdx, rIdx, colIdx } = selected.value
  let selector = ''
  if (type === 'container') selector = `.container[data-c="${cIdx}"]`
  else if (type === 'row') selector = `.row[data-c="${cIdx}"][data-r="${rIdx}"]`
  else if (type === 'column') selector = `.column[data-c="${cIdx}"][data-r="${rIdx}"][data-col="${colIdx}"]`

  const el = document.querySelector(selector)
  if (!el) return

  const rect = el.getBoundingClientRect()
  const scrollX = window.scrollX || window.pageXOffset
  const scrollY = window.scrollY || window.pageYOffset

  // default place at top-right with small gap
  let left = scrollX + rect.right + 8
  const top = scrollY + rect.top

  // if panel would overflow right edge, place to left of element
  if (left + panelWidthEstimate > scrollX + window.innerWidth) {
    left = scrollX + rect.left - panelWidthEstimate - 8
    if (left < scrollX + 8) left = scrollX + 8
  }

  panelPos.value = { top, left }
}

/* style generator for elements */
function elementStyle(el) {
  if (!el) return {}
  const borderString = el.borderWidth && el.borderWidth > 0
    ? `${el.borderWidth}px solid #000`
    : (building.value ? '1px dashed #ccc' : 'none')

  const base = {
    padding: (typeof el.padding === 'number' ? el.padding : 0) + 'px',
    margin: (typeof el.margin === 'number' ? el.margin : 0) + 'px 0',
    border: borderString,
    boxSizing: 'border-box'
  }

  if (el.type === 'container') {
    base.width = '100%'
    base.display = 'block'
  }
  if (el.type === 'row') {
    base.display = 'flex'
    base.flexWrap = 'wrap'
    base.gap = '10px'
  }
  if (el.type === 'column') {
    base.flex = el.flex ?? '1'
    base.minHeight = '48px'
    // base.display = 'flex'
    // base.alignItems = 'center'
    // base.justifyContent = 'center'
  }
  return base
}

/* reposition panel on scroll/resize and when selected changes */
function onWindowChange() {
  if (selected.value) updatePanelPos()
}
onMounted(() => {
  window.addEventListener('scroll', onWindowChange, { passive: true })
  window.addEventListener('resize', onWindowChange)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onWindowChange)
  window.removeEventListener('resize', onWindowChange)
})

watch(selected, (newVal) => {
  if (newVal) {
    nextTick().then(updatePanelPos)
  }
})

/* export - simplified */
function exportLayout() {
  building.value = false
  // build html (keeps user borders only if set)
  let layoutContent = ''
  containers.value.forEach(container => {
    const contStyle = `padding:${container.padding}px;margin:${container.margin}px 0;${container.borderWidth ? `border:${container.borderWidth}px solid #000;` : ''}width:100%;box-sizing:border-box;`
    let rowsHtml = ''
    container.rows.forEach(row => {
      const colCount = row.columns.length || 1
      let cols = ''
      row.columns.forEach(col => {
        cols += `<div class="column" style="flex-basis:${100 / colCount}%;flex-grow:1;padding:${col.padding}px;margin:${col.margin}px 0;box-sizing:border-box;${col.borderWidth ? `border:${col.borderWidth}px solid #000;` : ''}">Column</div>`
      })
      rowsHtml += `<div class="row" style="padding:${row.padding}px;margin:${row.margin}px 0;display:flex;flex-wrap:wrap;box-sizing:border-box;">${cols}</div>`
    })
    layoutContent += `<div class="container" style="${contStyle}">${rowsHtml}</div>`
  })

  const layoutHTML = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
  .container{box-sizing:border-box;width:100%}
  .row{display:flex;flex-wrap:wrap;box-sizing:border-box}
  .column{box-sizing:border-box;flex-grow:1}
  @media(max-width:768px){.column{flex-basis:100% !important}}
  </style></head><body>${layoutContent}</body></html>`

  const blob = new Blob([layoutHTML], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'layout.html'
  a.click()
  URL.revokeObjectURL(url)

  building.value = true
}
</script>

<style scoped>
/* Center toolbar buttons */
.toolbar-center {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
}
.builder {
  padding: 12px;
  font-family: Arial, sans-serif;
}

.toolbar {
  margin-bottom: 12px;
}

.theme-btn {
  background: linear-gradient(90deg, #4a4ad0 0%, #3b82f6 100%);
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 10px;
  margin-right: 6px;
  cursor: pointer;
}

.theme-btn.export {
  background: linear-gradient(90deg, #10b981 0%, #3b82f6 100%);
}

#layout-generator {
  margin: 8px 0;
  position: relative;
}

/* elements */
.container {
  background: #fafafa;
  margin-bottom: 14px;
  position: relative;
}

.row {
  background: #fff;
  margin-bottom: 8px;
  padding: 6px;
}

.column {
  background: #e7f1ff;
  margin-bottom: 8px;
}

/* small toolbars inside elements */
.toolbar-small {
  padding: 6px 0;
}

.control-panel {
  position: absolute;
  /* top/left generated dynamically via :style */
  background: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  z-index: 1100;
  width: 220px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
}

.control-panel label {
  display: block;
  margin-bottom: 8px;
  font-size: 13px;
}

.control-panel input {
  width: 100%;
  box-sizing: border-box;
  padding: 6px;
  margin-top: 4px;
}

/* dashed guide borders during building */
/* only show dashed if there is no user border */
/* .building .container,
.building .row,
.building .column {
  outline: none;
} */

/* note: border handled inline via elementStyle */

.selected-outline {
  outline: 2px solid #60a5fa;
  outline-offset: 2px;
  /* border: none !important; */
  /* border-radius: 6px; */
}

.picker-inline {
  margin-top: 8px;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  max-width: 260px;
  flex-direction: column;
}

.picker-search {
  width: 100%;
  padding: 6px;
  margin-bottom: 8px;
  border-radius: 4px;
  border: 1px solid #cbd5e1;
}

.picker-list {
  max-height: 120px;
  overflow-y: auto;
  margin-bottom: 8px;
}

.picker-item {
  display: block;
  width: 100%;
  text-align: left;
  background: #e7f1ff;
  border: none;
  padding: 6px 8px;
  margin-bottom: 4px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.picker-item:hover {
  background: #bae6fd;
}

.picker-close {
  background: #f87171;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 4px 10px;
  cursor: pointer;
  font-size: 13px;
}

.snippet-item {
position: relative;
margin-bottom: 8px;
}
.snippet-remove {
position: absolute;
top: 4px;
right: 4px;
background: #f87171;
color: #fff;
border: none;
border-radius: 4px;
padding: 2px 8px;
font-size: 12px;
cursor: pointer;
z-index: 10;
}
.toolbar-center {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  margin-bottom: 4px;
  width: 100%;
}
</style>