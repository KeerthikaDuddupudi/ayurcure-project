<template>
  <div class="remedy-list">
    <h1 class="page-title">AyurCure Remedies</h1>

    <div class="search-container">
      <input
        type="text"
        v-model="searchTerm"
        @keyup.enter="fetchRemedies"
        placeholder="Search by Category (e.g., Hair, Skin)"
        class="search-input"
      />
      <button @click="fetchRemedies" class="search-btn">Search</button>
    </div>

    <div v-if="loading" class="no-results">Loading remedies...</div>
    <div v-else-if="remedies.length" class="card-grid">
      <div v-for="(remedy, index) in remedies" :key="index" class="remedy-card">
        <h3 class="remedy-title">{{ remedy.title }}</h3>
        <div class="remedy-content">
          <div class="remedy-property">
            <span class="property-label">Plant:</span>
            <span class="property-value">{{ remedy.plant }}</span>
          </div>
          <div class="remedy-property">
            <span class="property-label">Part Used:</span>
            <span class="property-value">{{ remedy.partUsed }}</span>
          </div>
          <div v-if="remedy.ingredients" class="remedy-property">
            <span class="property-label">Ingredients:</span>
            <ul class="property-list">
              <li v-for="(item, i) in remedy.ingredients" :key="i">{{ item }}</li>
            </ul>
          </div>
          <div class="remedy-property">
            <span class="property-label">Preparation:</span>
            <div class="preparation-text">{{ remedy.preparation }}</div>
          </div>
          <div class="remedy-property">
            <span class="property-label">Dosage:</span>
            <span class="property-value">{{ remedy.dosage }}</span>
          </div>
          <div v-if="remedy.caution" class="remedy-property caution">
            <span class="property-label">Caution:</span>
            <span class="property-value">{{ remedy.caution }}</span>
          </div>
          <div v-if="remedy.note" class="remedy-property note">
            <span class="property-label">Note:</span>
            <span class="property-value">{{ remedy.note }}</span>
          </div>
          <div v-if="remedy.subcategory" class="remedy-property">
            <span class="property-label">Subcategory:</span>
            <span class="property-value">{{ remedy.subcategory }}</span>
          </div>
          <div v-if="remedy.benefits" class="remedy-property">
            <span class="property-label">Benefits:</span>
            <ul class="property-list">
              <li v-for="(point, i) in remedy.benefits" :key="i">{{ point }}</li>
            </ul>
          </div>
          <div v-if="remedy.bestRemedy" class="best-remedy">
            <h4 class="best-remedy-title">Best Remedy</h4>
            <div class="remedy-property">
              <span class="property-label">Title:</span>
              <span class="property-value">{{ remedy.bestRemedy.title }}</span>
            </div>
            <div class="remedy-property">
              <span class="property-label">Preparation:</span>
              <div class="preparation-text">{{ remedy.bestRemedy.preparation }}</div>
            </div>
            <div class="remedy-property">
              <span class="property-label">Usage:</span>
              <span class="property-value">{{ remedy.bestRemedy.usage }}</span>
            </div>
            <div class="remedy-property">
              <span class="property-label">Benefit:</span>
              <span class="property-value">{{ remedy.bestRemedy.benefit }}</span>
            </div>
          </div>
        </div>
        <button @click="saveCurrentRemedy(remedy)" class="save-btn">
          Save Remedy
        </button>
      </div>
    </div>

    <p v-else class="no-results">No remedies found for "{{ searchTerm }}".</p>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSavedRemedies } from '@/composables/savedRemedies'

const { saveRemedy } = useSavedRemedies()
const route = useRoute()
const searchTerm = ref(route.query.category || '')
const remedies = ref([])
const loading = ref(false)

const saveCurrentRemedy = (remedy) => {
  saveRemedy(remedy)
}

const fetchRemedies = async () => {
  if (!searchTerm.value.trim()) return

  loading.value = true
  remedies.value = []

  try {
  const res = await fetch(`http://localhost:5000/api/remedies?category=${encodeURIComponent(searchTerm.value)}`)

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`)
  }

  const result = await res.json()

  // If result has a `data` key and it's an array, use it. Otherwise, assume result is the array.
  remedies.value = Array.isArray(result?.data) ? result.data : result
} catch (err) {
  console.error('Error fetching remedies:', err)
  remedies.value = []
} finally {
  loading.value = false
}
}

// Fetch remedies on load
onMounted(() => {
  fetchRemedies()
})

// React to changes in route category
watch(
  () => route.query.category,
  (newCategory) => {
    searchTerm.value = newCategory || ''
    fetchRemedies()
  }
)
</script>



<style scoped>
.remedy-list {
  padding: 2rem;
  max-width: 1000px;
  margin: 100px auto 0;
}

.page-title {
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 2rem;
  color: #2e7d32;
  font-weight: bold;
  letter-spacing: 1px;
}

.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.search-input {
  width: 60%;
  padding: 12px 16px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #4caf50;
  outline: none;
}

.search-btn {
  padding: 12px 24px;
  font-size: 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.search-btn:hover {
  background-color: #388e3c;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.remedy-card {
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.remedy-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.remedy-title {
  font-size: 20px;
  background: linear-gradient(to right, #2e7d32, #66bb6a);
  color: white;
  padding: 10px 16px;
  border-radius: 12px;
  margin-bottom: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.remedy-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.remedy-property {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.property-label {
  font-weight: 600;
  color: #2e7d32;
  min-width: 100px;
}

.property-value {
  flex: 1;
  color: #333;
}

.preparation-text {
  white-space: pre-line;
  background-color: #f8f9fa;
  padding: 12px;
  border-radius: 8px;
  margin-top: 8px;
  line-height: 1.6;
  border-left: 3px solid #4caf50;
}

.property-list {
  list-style-type: none;
  padding-left: 0;
  margin: 0;
  flex: 1;
}

.property-list li {
  position: relative;
  padding-left: 1.2rem;
  margin-bottom: 0.5rem;
}

.property-list li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #4caf50;
  font-weight: bold;
}

.caution {
  background-color: #fff8e1;
  padding: 0.5rem;
  border-radius: 6px;
  border-left: 3px solid #ffa000;
}

.note {
  background-color: #e3f2fd;
  padding: 0.5rem;
  border-radius: 6px;
  border-left: 3px solid #1976d2;
}

.best-remedy {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px dashed #ccc;
}

.best-remedy-title {
  color: #4caf50;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.save-btn {
  margin-top: 1.5rem;
  padding: 12px;
  width: 100%;
  background-color: #2e7d32;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.save-btn:hover {
  background-color: #1b5e20;
}

.no-results {
  text-align: center;
  color: #757575;
  font-size: 1.1rem;
  margin-top: 2rem;
}
/* Dark Theme Styles - Light Grey Cards with Dark Text */
body.dark-theme {
  background-color: #303030; /* Dark page background */
  color: #e0e0e0; /* Default light text */
}

body.dark-theme .remedy-card {
  background:#212121; /* Light grey card background */
  border-left: 4px solid #388e3c; /* Green accent border */
  color: white; /* Dark text for content */
}

/* Text Elements */
body.dark-theme .best-remedy-title {
  color: #1b5e20; /* Dark green for titles */
}

body.dark-theme .property-label {
  color: white; /* Medium green for labels */
  font-weight: 600;
}

body.dark-theme .remedy-title {
  background: linear-gradient(to right, #2e7d32, #66bb6a);
  color: white;
}

body.dark-theme .property-value,
body.dark-theme .preparation-text,
body.dark-theme .property-list li {
  color: #2e7d32; /* Pure black for content */
}

/* Special Sections */
body.dark-theme .preparation-text {
  background-color: #eeeeee; /* Slightly darker grey */
  border-left: 3px solid #2e7d32;
}

body.dark-theme .caution {
  background-color: #212121; /* Light orange */
  border-left: 3px solid #ffa000;
  color: #d84315; /* Dark orange text */
}

body.dark-theme .note {
  background-color: #bbdefb; /* Light blue */
  border-left: 3px solid #1976d2;
  color: #0d47a1; /* Dark blue text */
}

/* Interactive Elements */
body.dark-theme .save-btn {
  background-color: #2e7d32;
  color: white;
  border: 2px solid #1b5e20;
}

body.dark-theme .save-btn:hover {
  background-color: #1b5e20;
}

body.dark-theme .search-input {
  background-color: #ffffff;
  border-color: #bdbdbd;
  color: #000000;
}

body.dark-theme .search-btn {
  background-color: #388e3c;
  color: white;
}

body.dark-theme .search-btn:hover {
  background-color: #2e7d32;
}

/* Structural Elements */
body.dark-theme .remedy-title {
  border-bottom: 2px solid #bdbdbd;
}

body.dark-theme .best-remedy {
  border-top: 1px dashed #9e9e9e;
}

body.dark-theme .property-list li::before {
  color: #2e7d32; /* Green bullets */
}

body.dark-theme .no-results {
  color: #9e9e9e;
}

@media (max-width: 768px) {
  .search-input {
    width: 100%;
  }
  
  .remedy-card {
    padding: 16px;
  }
}
</style>