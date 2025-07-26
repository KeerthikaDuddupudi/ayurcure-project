<template>
  <div class="search-bar">
    <input
      type="text"
      v-model="searchTerm"
      @keyup.enter="performSearch"
      placeholder="Search by Category (e.g., Hair, Skin)"
      class="search-input"
    />
    <button @click="performSearch" class="search-btn">Search</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const searchTerm = ref('')
const router = useRouter()

const performSearch = () => {
  if (searchTerm.value.trim()) {
    router.push({ path: '/remedielist', query: { category: searchTerm.value.trim() } })
  }
}
</script>

<style scoped>
.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin: 2rem 0;
  flex-wrap: wrap;
}

.search-input {
  width: 60%;
  padding: 10px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.search-btn {
  padding: 10px 20px;
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
</style>
