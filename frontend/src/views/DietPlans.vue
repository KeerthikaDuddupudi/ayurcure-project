<template>
  <div>
    <main class="diet-wrapper">
      <div class="overlay-container">
        <button class="close-btn" @click="goHome">✕</button>
        <h1 class="title">AyurCure Diet Plans</h1>

        <!-- Grid of Cards -->
        <div class="card-grid" :class="{ blurred: selectedIndex !== null }">
          <button
            v-for="(condition, index) in conditions"
            :key="condition.name"
            class="diet-card"
            @click="expandCard(index)"
          >
            <img :src="condition.image" alt="condition" class="diet-image" />
            <span class="card-label">{{ condition.name }}</span>
          </button>
        </div>

        <!-- Enlarged View -->
        <div v-if="selectedIndex !== null" class="enlarged-card">
          <button class="back-btn" @click="selectedIndex = null">Back</button>
          <h2 class="center-text">{{ conditions[selectedIndex].name }} Diet Plan</h2>
          <div class="diet-info">
            <div class="diet-section">
              <strong class="section-header">What to Eat</strong>
              <ul>
                <li v-for="item in conditions[selectedIndex].eat" :key="item">{{ item }}</li>
              </ul>
            </div>
            <div class="diet-section">
              <strong class="section-header">What to Avoid</strong>
              <ul>
                <li v-for="item in conditions[selectedIndex].avoid" :key="item">{{ item }}</li>
              </ul>
            </div>
            <div class="diet-section">
              <strong class="section-header">Benefits</strong>
              <p class="benefits-text">{{ conditions[selectedIndex].benefits }}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import dietImg from '../assets/diet.jpg'
import pcodImg from '../assets/pcod.jpg'
import backImg from '../assets/back4.png'
import landImg from '../assets/landpic1.jpg'

export default {
  name: 'DietPlans',
  data() {
    return {
      selectedIndex: null,
      conditions: [
        {
          name: 'DIABETES',
          image: dietImg,
          eat: ['Whole grains', 'Leafy greens', 'Lentils'],
          avoid: ['Sugar', 'White bread', 'Processed foods'],
          benefits: 'Helps regulate blood sugar and prevents insulin spikes.'
        },
        {
          name: 'PCOD',
          image: pcodImg,
          eat: ['Fiber-rich veggies', 'Lean protein', 'Omega-3 foods'],
          avoid: ['Refined carbs', 'Sugar', 'Fried foods'],
          benefits: 'Balances hormones and supports healthy weight.'
        },
        {
          name: 'PCOS',
          image: dietImg,
          eat: ['Low GI foods', 'Anti-inflammatory greens', 'Nuts'],
          avoid: ['Dairy', 'Sugar', 'White rice'],
          benefits: 'Regulates periods and reduces inflammation.'
        },
        {
          name: 'CONSTIPATION',
          image: landImg,
          eat: ['Papaya', 'Oats', 'Leafy vegetables', 'Water'],
          avoid: ['Dairy', 'Red meat', 'Processed snacks'],
          benefits: 'Improves digestion and regularizes bowel movements.'
        },
        {
          name: 'WEIGHT LOSS',
          image: dietImg,
          eat: ['Salads', 'Green tea', 'Lean meat', 'Millets'],
          avoid: ['Sweets', 'Soft drinks', 'Junk food'],
          benefits: 'Burns fat and improves metabolism.'
        },
        {
          name: 'BP',
          image: backImg,
          eat: ['Bananas', 'Low-sodium foods', 'Beetroot', 'Oats'],
          avoid: ['Salt', 'Pickles', 'Canned foods'],
          benefits: 'Controls blood pressure and supports heart health.'
        }
      ]
    }
  },
  methods: {
    expandCard(index) {
      this.selectedIndex = index
    },
    goHome() {
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped>
.diet-wrapper {
  background: linear-gradient(to bottom right, #c9f9d1, #a0eac4);
  min-height: 100vh;
  padding: 104px 20px 80px; /* Top for NavBar, bottom for Footer */
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
}

.overlay-container {
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(14px);
  border-radius: 24px;
  padding: 40px 30px;
  max-width: 1100px;
  width: 100%;
  position: relative;
  text-align: center;
  box-shadow: 0 0 60px rgba(34, 139, 34, 0.3);
}

.title {
  font-size: 40px;
  font-weight: bold;
  color: #064420;
  margin-bottom: 36px;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 20px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #05472a;
  font-size: 20px;
  padding: 6px 12px;
  border-radius: 50%;
  cursor: pointer;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.4);
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  justify-items: center;
}

.card-grid.blurred {
  filter: blur(4px);
  pointer-events: none;
}

.diet-card {
  background: #ffffff;
  border: 2px solid #7bc88a;
  border-radius: 16px;
  text-align: center;
  width: 100%;
  max-width: 260px;
  box-shadow: 0 8px 20px rgba(0, 100, 0, 0.15);
  transition: transform 0.4s ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;
}

.diet-card:hover {
  transform: scale(1.07);
}

.diet-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-bottom: 1px solid #7bc88a;
}

.card-label {
  padding: 14px;
  font-size: 18px;
  font-weight: bold;
  color: #064420;
}

.enlarged-card {
  position: fixed;
  top: 40px;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(to bottom right, #e8fff2, #c6f7d4);
  border-radius: 20px;
  width: 90%;
  max-width: 480px;
  height:600px;
  padding: 30px;
  box-shadow: 0 12px 60px rgba(0, 100, 0, 0.35);
  z-index: 900;
  animation: fadeInScale 0.5s ease;
  color: #064420;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-y: auto;
}


@keyframes fadeInScale {
  from {
    transform: translate(-50%, -50%) scale(0.6);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}

.back-btn {
  background: #e1f5e6;
  border: none;
  padding: 8px 14px;
  border-radius: 10px;
  cursor: pointer;
  top:20px;
  left:10px;
  margin-bottom: 20px;
  font-weight: bold;
  color: #05472a;
  font-size: 16px;
}

.diet-info {
  width: 100%;
  max-width: 420px;
}

.diet-section {
  margin-top: 16px;
  text-align: center;
  background: #ffffff;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 12px;
  box-shadow: 0 4px 12px rgba(0, 100, 0, 0.1);
}

.diet-section ul {
  padding-left: 0;
  margin-top: 10px;
  list-style: none;
}

.diet-section li {
  line-height: 1.6;
  font-size: 15px;
  color: #055c30;
  margin-bottom: 5px;
}

.section-header {
  font-size: 17px;
  color: #05472a;
  margin-bottom: 6px;
  display: block;
}

.benefits-text {
  font-size: 15px;
  margin-top: 8px;
  color: #055c30;
}

.center-text {
  margin-top:35px;
  text-align: center;
  margin-bottom: 16px;
  font-size: 22px;
  color: #05472a;
  font-weight: bold;
}

/* 🌙 DARK THEME STYLES */
/* 🌙 UPDATED DARK THEME STYLES */
body.dark-theme .diet-wrapper {
  background: #000000; /* Pure black */
}

body.dark-theme .overlay-container {
  background-color: rgba(33, 33, 33, 0.6); /* Dark grayish overlay */
  backdrop-filter: blur(14px);
  box-shadow: 0 0 60px rgba(34, 197, 94, 0.3);
}

body.dark-theme .title {
  color: #bbf7d0; /* Tailwind green-200 */
}

body.dark-theme .close-btn {
  background: rgba(255, 255, 255, 0.05);
  color: #a7f3d0;
}
body.dark-theme .close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

body.dark-theme .diet-card {
  background-color: #1e1e1e; /* Very dark gray */
  border-color: #22c55e;
  box-shadow: 0 8px 20px rgba(34, 197, 94, 0.1);
}

body.dark-theme .diet-image {
  border-bottom: 1px solid #22c55e;
}

body.dark-theme .card-label {
  color: #bbf7d0;
}

body.dark-theme .enlarged-card {
  background: #121212; /* Blackish gray for expanded card */
  box-shadow: 0 12px 60px rgba(34, 197, 94, 0.3);
  color: #d1fae5;
}

body.dark-theme .back-btn {
  background: #166534;
  color: #d1fae5;
}

body.dark-theme .center-text {
  color: #86efac;
}

body.dark-theme .diet-section {
  background: #1e1e1e; /* Inner sections like cards */
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.1);
}

body.dark-theme .diet-section li,
body.dark-theme .benefits-text,
body.dark-theme .section-header {
  color: #a7f3d0;
}

</style>
