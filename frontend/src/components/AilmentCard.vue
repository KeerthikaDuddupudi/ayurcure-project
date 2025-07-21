<template>
  <div class="ailment-card" @click="$emit('click')">
    <h3>{{ label }}</h3>
  </div>
</template>

<script setup>
defineProps(['label'])
</script>


<style scoped>
.ailment-card {
  background-color: #f0fdf4; /* Light green base */
  border: 2px solid #22c55e;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.ailment-card:hover {
  transform: scale(1.05);
  background-color: #bbf7d0;
}

.ailment-card h3 {
  font-size: 18px;
  font-weight: 600;
  color: #064420; /* ✅ Make sure this is visible */
}
.ailment-card p {
  color: #064420;
}

body.dark-theme .ailment-card p {
  color: #d1fae5;
}


/* 🌙 Dark Theme Styles */
body.dark-theme .ailment-card {
  background-color: #1f2937; /* Slate-800 */
  border-color: #22c55e;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.15);
}

body.dark-theme .ailment-card:hover {
  background-color: #334155;
}

body.dark-theme .ailment-card h3 {
  color: #d1fae5; /* ✅ Light green in dark mode */
}
</style>
