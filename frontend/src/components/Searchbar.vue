<template>
  <div class="search-bar">
    <input
      v-model="query"
      @input="search"
      :placeholder="typedPlaceholder"
      @focus="stopTyping"
      @blur="startTyping"
    />
    <button @click="search" class="search-btn">🔍</button>
    <button v-if="query" @click="clear" class="clear-btn">❌</button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const emit = defineEmits(['select'])
const query = ref('')
const placeholderPhrases = [
  'Search by ailment...',
  'Try "cold", "acne", "headache"...',
  'Looking for cough remedy?',
  'Type your symptoms here...'
]

let phraseIndex = 0
let charIndex = 0
let interval = null
const typedPlaceholder = ref('')

function typeWriter() {
  const phrase = placeholderPhrases[phraseIndex]
  if (charIndex <= phrase.length) {
    typedPlaceholder.value = phrase.slice(0, charIndex++)
  } else {
    setTimeout(() => {
      phraseIndex = (phraseIndex + 1) % placeholderPhrases.length
      charIndex = 0
    }, 1500)
  }
}

function startTyping() {
  interval = setInterval(typeWriter, 120)
}

function stopTyping() {
  clearInterval(interval)
}

onMounted(() => {
  startTyping()
})

onBeforeUnmount(() => {
  stopTyping()
})

const search = () => {
  const lower = query.value.toLowerCase()
  const keywords = {
    cold: ['cold', 'cough'],
    acne: ['acne', 'pimples'],
    headache: ['headache'],
    constipation: ['constipation']
  }

  for (const key in keywords) {
    if (keywords[key].some(word => lower.includes(word))) {
      emit('select', key)
      return
    }
  }
}

function clear() {
  query.value = ''
  emit('select', '') // Optional: clears search
}
</script>

<style>
.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 20px auto;
  padding: 5px;
  width: 90%;
  max-width: 600px;
  position: relative;
}

.search-bar input {
  flex: 1;
  padding: 14px 20px;
  font-size: 16px;
  border: 2px solid #a5d6a7;
  border-radius: 50px;
  outline: none;
  transition: all 0.3s ease;
  background-color: #fafff5;
  box-shadow: 0 4px 12px rgba(0, 128, 0, 0.15);
  font-style: italic;
}

.search-bar input:focus {
  border-color: #388e3c;
  box-shadow: 0 0 10px rgba(56, 142, 60, 0.3);
  transform: scale(1.02);
}

.search-bar button {
  border: none;
  padding: 12px;
  font-size: 18px;
  cursor: pointer;
  transition: 0.3s ease;
  border-radius: 50%;
  background-color: #66bb6a;
  color: white;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.search-bar .clear-btn {
  background-color: #ef5350;
}

.search-bar button:hover {
  transform: scale(1.1);
}

.search-bar input::placeholder {
  color: #7cb342;
  font-style: italic;
  transition: all 0.3s ease;
}
</style>
