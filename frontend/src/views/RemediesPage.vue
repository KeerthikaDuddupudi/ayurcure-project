<template>
  <div class="app-wrapper">
    <h2 class="remedies-title">{{ $t('remedies.pageTitle') }}</h2>

    <SearchBar @select="showRemedy" />

    <div class="remedy-slider" v-if="!activeRemedy">
      <button class="scroll-btn left" @click="scrollLeft">‹</button>

      <div class="remedy-track" ref="scrollContainer">
        <div
          class="ailment-card"
          v-for="a in ailments"
          :key="a.key"
          :data-key="a.key"
          @click="animateAndShow(a.key)"
        >
          <img
            class="ailment-img"
            :src="'/images/' + a.image"
            :alt="a.key"
          />
          <h3>{{ $t('ailment.' + a.key) }}</h3>
        </div>
      </div>

      <button class="scroll-btn right" @click="scrollRight">›</button>
    </div>

    <div class="ai-tip">💡{{ $t('remedies.expertTip') }}</div>
    <AiSuggest />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SearchBar from '../components/Searchbar.vue'
import AiSuggest from '../components/AiSuggest.vue'

const router = useRouter()
const scrollContainer = ref(null)
const activeRemedy = ref(null)

const ailments = [
  { key: 'cold', image: 'cold_final.jpg' },
  { key: 'acne', image: 'acne1.jpg' },
  { key: 'indigestion', image: 'indigestion1.jpg' },
  { key: 'headache', image: 'head.jpg' },
  { key: 'hair fall', image: 'hairfall.jpg' },
  { key: 'menstrual pain', image: 'mensuralpain.jpg' },
  { key: 'constipation', image: 'constipation.jpg' },
  { key: 'skin', image: 'skin.jpg' }
]

function showRemedy(type) {
  activeRemedy.value = type
}

function animateAndShow(type) {
  const clicked = document.querySelector(`.ailment-card[data-key="${type}"]`)
  if (clicked) {
    clicked.classList.add('click-animate')
    setTimeout(() => {
      clicked.classList.remove('click-animate')
      router.push({ path: '/remedielist', query: { category: type } })
    }, 400)
  } else {
    router.push({ path: '/remedielist', query: { category: type } })
  }
}

function scrollLeft() {
  scrollContainer.value?.scrollBy({ left: -300, behavior: 'smooth' })
}

function scrollRight() {
  scrollContainer.value?.scrollBy({ left: 300, behavior: 'smooth' })
}
</script>



<style scoped>
/* ALL STYLES REMAIN UNCHANGED AS REQUESTED */
.remedies-title {
  font-size: 45px;
  color: #2e7d32;
}
body.dark-theme .remedies-title {
  color: #ccc;
}

.app-wrapper {
  margin-top: 100px;
}

/* Slider */
.remedy-slider {
  position: relative;
  display: flex;
  align-items: center;
  margin: 30px auto;
  max-width: 100%;
  overflow: hidden;
}

.scroll-btn {
  background-color: #2e7d32;
  color: white;
  font-size: 26px;
  padding: 10px 16px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  z-index: 2;
  transition: background 0.3s ease;
}
.scroll-btn:hover {
  background-color: #1b5e20;
}

.remedy-track {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 10px 5px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}
.remedy-track::-webkit-scrollbar {
  display: none;
}
.remedy-track {
  scrollbar-width: none;
}

/* Ailment Cards */
.ailment-card {
  flex: 0 0 auto;
  width: 220px;
  background: #ffffff;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  scroll-snap-align: start;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 2px solid black;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.ailment-card:hover {
  transform: translateY(-5px);
  background: #f1f8e9;
}
.ailment-card h3 {
  margin: 0;
  color: #388e3c;
}

/* Ailment Image */
.ailment-img {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
  animation: fadeInImg 0.6s ease-in;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

/* Page background */
body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #8ab88a;
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  color: #333;
  backdrop-filter: brightness(0.95);
}

/* Page Title */
h2 {
  text-align: center;
  color: #1e1e1e;
  margin-top: 30px;
}

/* Search Bar */
.search-bar {
  display: flex;
  justify-content: center;
  margin: 20px auto;
  width: 90%;
  max-width: 700px;
  position: relative;
  transition: transform 0.3s ease;
}
.search-bar input {
  width: 100%;
  padding: 14px 20px;
  font-size: 16px;
  border: 2px solid #a5d6a7;
  border-radius: 12px;
  outline: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 128, 0, 0.15);
  background-color: #fafff5;
}
.search-bar input::placeholder {
  color: #7cb342;
  font-style: italic;
}
.search-bar input:hover {
  border-color: #66bb6a;
  box-shadow: 0 0 10px rgba(102, 187, 106, 0.4);
  background-color: #ffffff;
}
.search-bar input:focus {
  border-color: #388e3c;
  box-shadow: 0 0 15px rgba(56, 142, 60, 0.5);
  transform: scale(1.02);
}

/* Grid */
.ailments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 20px;
  padding: 20px;
  margin: auto;
  width: 90%;
}

/* Remedy Details */
.remedy-details {
  width: 90%;
  max-width: 700px;
  margin: 30px auto;
  background: #fff;
  padding: 25px;
  border-radius: 15px;
  border-left: 5px solid #81c784;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}
.remedy-details h3 {
  color: #2e7d32;
  margin-bottom: 10px;
}
.remedy-details ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.remedy-details ul li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

/* Bookmark */
.bookmark-btn {
  display: inline-block;
  margin-top: 15px;
  padding: 10px 18px;
  background-color: #66bb6a;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s ease;
}
.bookmark-btn:hover {
  background-color: #388e3c;
}

/* AI Tip */
.ai-tip {
  margin: 30px auto;
  width: 90%;
  max-width: 700px;
  background: #e8f5e9;
  border-left: 5px solid #66bb6a;
  padding: 20px;
  font-style: italic;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  color: #2e7d32;
}

/* AI Container */
.ai-container {
  background: linear-gradient(135deg, #f3fbe3, #e0f2f1);
  border: 2px solid #a5d6a7;
  border-left: 10px solid #66bb6a;
  border-radius: 16px;
  padding: 30px 25px;
  max-width: 700px;
  margin: 40px auto;
  box-shadow: 0 8px 20px rgba(102, 187, 106, 0.3);
  font-family: 'Segoe UI', sans-serif;
  animation: fadeIn 0.6s ease;
  position: relative;
}
/* IMPORTANT: The content: "🤖 Expert AI Suggestion"; must be moved to an HTML div for i18n */
.ai-container::before {
  /* This rule will be empty or removed if a new HTML div is used for the label */
  /* For now, leaving it as is, but we'll add a new class to style the new div */
  content: ""; /* Keep for existing styles but the text will be in a new div */
}
/* New style for the actual HTML div that will hold the AI suggestion label */
.ai-header-label {
  position: absolute;
  top: -16px;
  left: 25px;
  background-color: #66bb6a;
  color: white;
  padding: 4px 12px;
  font-weight: bold;
  border-radius: 8px;
  font-size: 14px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.ai-container input {
  width: 100%;
  padding: 14px 18px;
  font-size: 16px;
  border: 2px solid #a5d6a7;
  border-radius: 10px;
  outline: none;
  transition: all 0.3s ease;
  background-color: #fafff5;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0, 100, 0, 0.1);
}
.ai-container input::placeholder {
  color: #7cb342;
  font-style: italic;
}
.ai-container input:hover {
  border-color: #66bb6a;
  box-shadow: 0 0 10px rgba(102, 187, 106, 0.3);
  background-color: #ffffff;
}
.ai-container input:focus {
  border-color: #388e3c;
  box-shadow: 0 0 12px rgba(56, 142, 60, 0.4);
  transform: scale(1.01);
}
.ai-container button {
  padding: 12px 24px;
  background-color: #66bb6a;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.ai-container button:hover {
  background-color: #388e3c;
  transform: scale(1.02);
}
.ai-container p {
  font-style: italic;
  color: #999;
  margin-top: 10px;
  text-align: center;
}
.ai-response {
  background: #e8f5e9;
  border-left: 5px solid #66bb6a;
  padding: 20px;
  margin-top: 20px;
  border-radius: 10px;
  font-size: 16px;
  line-height: 1.6;
  white-space: pre-line;
  color: #2e7d32;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fadeInImg {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.click-animate {
  animation: popOpen 0.4s ease;
}
@keyframes popOpen {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.06);
  }
  100% {
    transform: scale(1);
  }
}

/* Back Button */
.back-btn {
  display: block;
  background-color: #388e3c;
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  margin: 20px auto 10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top:90px;
}
.back-btn:hover {
  background-color: #256029;
}

/* Dark Mode */
body.dark-theme .remedies-title{
  color:white;
}
body.dark-theme {
  background-color: #121212;
  background-image: none;
  color: #f5f5f5;
}
body.dark-theme .ailment-card,
body.dark-theme .remedy-details {
  background-color: #1e1e1e;
  color: #f5f5f5;
  border-color: #444;
}

/* 🌙 Fix remedy text visibility in dark mode */
body.dark-theme .remedy-details {
  background-color: #1e1e1e;
  color: #e4e4e4; /* default text color */
}

body.dark-theme .remedy-details li,
body.dark-theme .remedy-details p,
body.dark-theme .remedy-details td,
body.dark-theme .remedy-details span,
body.dark-theme .remedy-details strong {
  color: #e4e4e4 !important;
}
/* Dark mode styles for the new AI header label */
body.dark-theme .ai-header-label {
    background-color: #22c55e; /* A slightly brighter green for dark mode */
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}
body.dark-theme .ai-container {
    background: linear-gradient(135deg, #1f1f1f, #282828);
    border-color: #3a3a3a;
    border-left-color: #22c55e;
    box-shadow: 0 8px 20px rgba(34, 197, 94, 0.3);
}
body.dark-theme .ai-container input {
    background-color: #333;
    color: #eee;
    border-color: #555;
    box-shadow: 0 2px 5px rgba(0, 150, 0, 0.15);
}
body.dark-theme .ai-container input::placeholder {
    color: #a7f3d0;
}
body.dark-theme .ai-container input:hover {
    border-color: #22c55e;
    box-shadow: 0 0 10px rgba(34, 197, 94, 0.3);
    background-color: #3a3a3a;
}
body.dark-theme .ai-container input:focus {
    border-color: #16a34a;
    box-shadow: 0 0 12px rgba(34, 197, 94, 0.4);
}
body.dark-theme .ai-container button {
    background-color: #22c55e;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
body.dark-theme .ai-container button:hover {
    background-color: #16a34a;
}
body.dark-theme .ai-container p {
    color: #bbb;
}
body.dark-theme .ai-response {
    background: #282828;
    border-left-color: #22c55e;
    color: #e0e0e0;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15);
}
</style>