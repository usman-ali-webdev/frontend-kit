<template>
  <table class="data-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Jane Doe</td>
        <td>jane@example.com</td>
        <td><span class="status-active">Active</span></td>
      </tr>
      <tr>
        <td>John Smith</td>
        <td>john@example.com</td>
        <td><span class="status-inactive">Inactive</span></td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
// Data entry table demo
</script>

<style scoped>
.data-table {
  width: 100%;
  border-collapse: collapse;
  background: #f8fafd;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(74,74,208,0.07);
  overflow: hidden;
}
th, td {
  padding: 1rem;
  text-align: left;
}
th {
  background: #e3e8f7;
  color: #4a4ad0;
  font-weight: 700;
}
td {
  background: #fff;
  color: #333;
}
.status-active {
  color: #2e7d32;
  font-weight: bold;
}
.status-inactive {
  color: #d32f2f;
  font-weight: bold;
}
</style>
