<template>
  <div id="layout-generator" :class="{ building }">
    <button @click="addContainer">+ Add Container</button>
    <button @click="exportLayout">Export Layout</button>
    <div v-for="(container, cIdx) in containers" :key="container.id" class="container" :style="containerStyle(container)" :class="{ 'user-border': container.borderWidth }">
      <div class="control-panel">
        <label for="padding">Padding</label>
        <input type="number" placeholder="Padding" v-model.number="container.padding" />
        <label for="margin">Margin</label>
        <input type="number" placeholder="Margin" v-model.number="container.margin" />
        <label for="border-width">Border Width</label>
        <input type="number" placeholder="Border Width" v-model.number="container.borderWidth" />
      </div>
      <button class="control-button" @click="addRow(cIdx)">+ Add Row</button>
      <div v-for="(row, rIdx) in container.rows" :key="row.id" class="row">
        <button class="control-button" @click="addColumn(cIdx, rIdx)">
          + Add Column
        </button>
        <div v-for="(column, colIdx) in row.columns" :key="column.id" class="column" :style="columnStyle(row)">
          Column
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

let idCounter = 0
const building = ref(true)
const containers = ref([])

function uniqueId() {
  return idCounter++
}

function addContainer() {
  containers.value.push({
    id: uniqueId(),
    padding: 10,
    margin: 10,
    borderWidth: 0,
    rows: []
  })
}

function addRow(cIdx) {
  containers.value[cIdx].rows.push({
    id: uniqueId(),
    columns: []
  })
}

function addColumn(cIdx, rIdx) {
  containers.value[cIdx].rows[rIdx].columns.push({
    id: uniqueId()
  })
}

function containerStyle(container) {
  return {
    padding: container.padding + 'px',
    margin: container.margin + 'px 0',
    borderWidth: container.borderWidth ? container.borderWidth + 'px' : '',
    borderStyle: container.borderWidth ? 'solid' : '',
    borderColor: container.borderWidth ? '#000' : 'transparent',
    width: '100%',
    boxSizing: 'border-box'
  }
}

function columnStyle(row) {
  const count = row.columns.length || 1
  return {
    flexBasis: (100 / count) + '%',
    flexGrow: 1,
    padding: '10px',
    margin: '10px 0',
    boxSizing: 'border-box'
  }
}

function exportLayout() {
  building.value = false
  // Build HTML string
  let layoutContent = ''
  containers.value.forEach(container => {
    let containerAttrs = `style="padding:${container.padding}px;margin:${container.margin}px 0;${container.borderWidth ? `border-width:${container.borderWidth}px;border-style:solid;` : ''}width:100%;box-sizing:border-box;"${container.borderWidth ? ' class="user-border container"' : ' class="container"'}`
    let rowsHtml = ''
    container.rows.forEach(row => {
      let columnsHtml = ''
      const colCount = row.columns.length || 1
      row.columns.forEach(() => {
        columnsHtml += `<div class="column" style="flex-basis:${100 / colCount}%;flex-grow:1;padding:10px;margin:10px 0;box-sizing:border-box;">Column</div>`
      })
      rowsHtml += `<div class="row" style="padding:10px;margin:10px 0;display:flex;flex-wrap:wrap;box-sizing:border-box;">${columnsHtml}</div>`
    })
    layoutContent += `<div ${containerAttrs}>${rowsHtml}</div>`
  })

  const layoutHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exported Layout</title>
  <style>
    .container {
      padding: 10px;
      margin: 10px 0;
      width: 100%;
      box-sizing: border-box;
    }
    .row {
      padding: 10px;
      margin: 10px 0;
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
    }
    .column {
      padding: 10px;
      margin: 10px 0;
      flex-grow: 1;
      box-sizing: border-box;
    }
    .user-border {
      border-style: solid !important;
    }
    @media (max-width: 768px) {
      .column {
        flex-basis: 100% !important;
      }
    }
  </style>
</head>
<body>
  ${layoutContent}
</body>
</html>
  `
  // Download as file
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
#layout-generator {
  margin: 20px;
}

.container {
  padding: 10px;
  margin: 10px 0;
  position: relative;
  width: 100%;
  box-sizing: border-box;
}

.row {
  padding: 10px;
  margin: 10px 0;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}

.column {
  padding: 10px;
  margin: 10px 0;
  flex-grow: 1;
  box-sizing: border-box;
}

button,
.control-button {
  margin: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.control-panel {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  z-index: 1000;
}

.control-panel input {
  margin: 5px 0;
  display: block;
}

.user-border {
  border-style: solid !important;
}

@media (max-width: 768px) {
  .column {
    flex-basis: 100% !important;
  }
}

body {
  font-family: Arial, sans-serif;
}

#layout-generator {
  margin: 20px;
}

.container {
  padding: 10px;
  margin: 10px 0;
  position: relative;
  width: 100%;
  box-sizing: border-box;
}

.row {
  padding: 10px;
  margin: 10px 0;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}

.column {
  padding: 10px;
  margin: 10px 0;
  flex-grow: 1;
  box-sizing: border-box;
}

button {
  margin: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.control-button {
  margin: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.control-panel {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  z-index: 1000;
}

.control-panel input {
  margin: 5px 0;
  display: block;
}

.container,
.row,
.column {
  border: 1px dashed transparent;
}

.building .container,
.building .row,
.building .column {
  border: 1px dashed #ccc !important;
}

.user-border {
  border-style: solid !important;
}

@media (max-width: 768px) {
  .column {
    flex-basis: 100% !important;
  }
}
</style>
