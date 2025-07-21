<template>
  <div class="ai-container enhanced">
    <h3>🧠 Ask AyurCure AI</h3>
    
    <div class="ai-input-wrapper">
      <input v-model="question" placeholder="e.g. best remedy for stress..." />
      <button @click="fetchSuggestion">🔍</button>
    </div>
    
    <p v-if="loading">Thinking deeply... 🌿</p>
    
    <transition name="fade-bounce">
      <div class="ai-response" v-if="answer">
        {{ answer }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getRemedySuggestion } from '../services/ai'

const question = ref('')
const answer = ref('')
const loading = ref(false)

async function fetchSuggestion() {
  if (!question.value.trim()) return
  loading.value = true
  answer.value = ''
  try {
    answer.value = await getRemedySuggestion(question.value)
  } catch (error) {
    answer.value = error.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.ai-container.enhanced {
  max-width: 500px;
  padding: 24px;
  border-radius: 16px;
  background: linear-gradient(to right, #e8f5e9, #ffffff);
  border-left: 6px solid #66bb6a;
  box-shadow: 0 6px 18px rgba(102, 187, 106, 0.3);
  margin: 30px auto;
  animation: popIn 0.5s ease;
}

.ai-container h3 {
  text-align: center;
  font-size: 20px;
  color: #2e7d32;
  margin-bottom: 15px;
}

.ai-input-wrapper {
  display: flex;
  align-items: center;
  border: 2px solid #a5d6a7;
  border-radius: 50px;
  overflow: hidden;
  background: #f8fff6;
  box-shadow: 0 4px 10px rgba(0, 128, 0, 0.1);
  transition: all 0.3s ease;
}

.ai-input-wrapper input {
  flex: 1;
  padding: 14px 18px;
  font-size: 15px;
  border: none;
  outline: none;
  background: transparent;
  color: #2e7d32;
}

.ai-input-wrapper input::placeholder {
  color: #81c784;
  font-style: italic;
}

.ai-input-wrapper button {
  background: #66bb6a;
  color: white;
  border: none;
  padding: 12px 16px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
  border-left: 2px solid #a5d6a7;
}

.ai-input-wrapper button:hover {
  background: #388e3c;
}

.ai-response {
  margin-top: 20px;
  background: #f1f8e9;
  border-left: 4px solid #81c784;
  padding: 18px;
  border-radius: 10px;
  color: #2e7d32;
  font-size: 15.5px;
  line-height: 1.5;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
}

/* Animation */
@keyframes popIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.fade-bounce-enter-active {
  animation: bounceIn 0.6s;
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: translateY(15px);
  }
  60% {
    transform: translateY(-5px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.ai-container p {
  font-style: italic;
  font-size: 13px;
  text-align: center;
  color: #777;
  margin-top: 10px;
}
</style>