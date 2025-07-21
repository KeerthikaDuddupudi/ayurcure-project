<template>
  <div
    class="remedy-details"
    v-for="remedy in filteredRemedies"
    :key="remedy.name"
  >
    <img
      class="remedy-img-banner"
      :src="`/images/herbs/${remedy.name.replace(/\s+/g, '').toLowerCase()}.jpg`"
      :alt="remedy.name"
    />

    <h3>{{ remedy.name }}</h3>
    <ul>
      <li><strong>Plant:</strong> {{ remedy.plant }}</li>
      <li><strong>Part Used:</strong> {{ remedy.part }}</li>
      <li><strong>Preparation:</strong> {{ remedy.preparation }}</li>
      <li><strong>Dosage:</strong> {{ remedy.dosage }}</li>
      <li><strong>Caution:</strong> {{ remedy.caution }}</li>
    </ul>

    <button class="bookmark-btn" @click="toggleBookmark(remedy)">
      {{ isBookmarked(remedy.name) ? '❌ Unsave Remedy' : '📌 Save Remedy' }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import remediesData from '../data/remedies.js'

const props = defineProps(['type', 'filter'])
const savedRemedies = ref([])

onMounted(() => {
  const saved = localStorage.getItem('bookmarked')
  savedRemedies.value = saved ? JSON.parse(saved) : []
})

const filteredRemedies = computed(() => {
  const remedies = remediesData[props.type] || []
  return props.filter === 'all' ? remedies : remedies.filter(r => r.form === props.filter)
})

function isBookmarked(name) {
  return savedRemedies.value.some(r => r.name === name)
}

function toggleBookmark(remedy) {
  const index = savedRemedies.value.findIndex(r => r.name === remedy.name)
  if (index !== -1) {
    savedRemedies.value.splice(index, 1)
    alert(`❌ Unbookmarked: ${remedy.name}`)
  } else {
    savedRemedies.value.push(remedy)
    alert(`✅ Saved: ${remedy.name}`)
  }
  localStorage.setItem('bookmarked', JSON.stringify(savedRemedies.value))
}
</script>


<style>
.remedy-details {
  width: 90%;
  max-width: 750px;
  margin: 30px auto;
  background: #ffffff;
  border-radius: 20px;
  padding: 30px 25px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
  animation: slideFadeIn 0.6s ease;
  transition: transform 0.3s ease;
  border-left: 6px solid #66bb6a;
  position: relative;
}

.remedy-img-banner {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.remedy-details h3 {
  font-size: 22px;
  background: linear-gradient(to right, #2e7d32, #66bb6a);
  color: white;
  padding: 10px 16px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.remedy-details ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.remedy-details ul li {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  font-size: 16px;
  display: flex;
  align-items: center;
}

.remedy-details ul li strong {
  width: 120px;
  color: #2e7d32;
}

.bookmark-btn {
  margin-top: 20px;
  padding: 10px 22px;
  font-size: 15px;
  background-color: #43a047;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.bookmark-btn:hover {
  background-color: #2e7d32;
  transform: scale(1.03);
}

@keyframes slideFadeIn {
  from {
    opacity: 0;
    transform: translateY(25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
