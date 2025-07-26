<template>
  <div class="container">
    <h2 class="title">Saved Remedies</h2>

    <div v-if="savedRemedies.length" class="remedy-grid">
      <div
        v-for="(remedy, index) in savedRemedies"
        :key="index"
        class="remedy-card"
      >
        <button class="remove-btn" @click="removeRemedy(index)">×</button>

        <h3 class="remedy-title">{{ remedy.title }}</h3>
        <ul>
          <li><strong>Plant :</strong> {{ remedy.plant }}</li>
          <li><strong>Part Used :</strong> {{ remedy.partUsed }}</li>

          <li v-if="remedy.ingredients">
            <strong>Ingredients :</strong>
            <ul>
              <li v-for="(item, i) in remedy.ingredients" :key="i">- {{ item }}</li>
            </ul>
          </li>

          <li><strong>Preparation:</strong> {{ remedy.preparation }}</li>
          <li><strong>Dosage :</strong> {{ remedy.dosage || remedy.usage }}</li>

          <li v-if="remedy.benefits">
            <strong>Benefits :</strong>
            <ul>
              <li v-for="(point, i) in remedy.benefits" :key="i">- {{ point }}</li>
            </ul>
          </li>

          <li v-if="remedy.caution"><strong>Caution :</strong> {{ remedy.caution }}</li>
        </ul>
      </div>
    </div>

    <p v-else class="no-remedies">No remedies saved yet.</p>
  </div>
</template>

<script setup>
import { useSavedRemedies } from '@/composables/savedRemedies';

// ✅ Log the userId from localStorage
const userId = localStorage.getItem('userId');
console.log('🧪 userId from localStorage:', userId);

const { savedRemedies, removeRemedy } = useSavedRemedies();
</script>

<style scoped>
.container {
  padding: 2rem;
  max-width: 1300px;
  margin: 100px auto 0;
}

.title {
  text-align: center;
  font-size: 2.2rem;
  color: #2e7d32;
  margin-bottom: 2rem;
  font-weight: bold;
}

.remedy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.remedy-card {
  background: #ffffff;
  padding: 20px 18px;
  border-radius: 20px;
  border-left: 6px solid #66bb6a;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
  animation: slideFadeIn 0.6s ease;
  transition: transform 0.3s ease;
  position: relative;
}

.remedy-card:hover {
  transform: scale(1.02);
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

.remedy-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.remedy-card ul li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  font-size: 17px;
  line-height: 32px;
  display: flex;
}
.remedy-card ul li strong {
  width: 110px;
  color: #2e7d32;
}

.remove-btn {
  position: absolute;
  top: 30px;
  right: 30px;
  background: #ff4444;
  color: white;
  border: none;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1rem;
}

.no-remedies {
  text-align: center;
  color: #666;
  font-size: 1.1rem;
}

/* Dark mode styles */
body.dark-theme .container {
  background: #121212;
}

body.dark-theme .title {
  color: #66bb6a;
}

body.dark-theme .remedy-card {
  background: #1e1e1e;
  color: #000000;
  border-left: 6px solid #66bb6a;
}

body.dark-theme .remedy-card ul li {
  color: white;
  border-bottom: 1px solid #333;
}

body.dark-theme .remedy-card ul li strong {
  color: #66bb6a;
}

body.dark-theme .no-remedies {
  color: #888;
}

body.dark-theme .remedy-title {
  background: linear-gradient(to right, #2e7d32, #66bb6a);
  color: white;
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
