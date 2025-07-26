<template>
  <div>
    <HomeNav />
    <!-- Landing Page -->
    <div class="landing-page">
      <div class="content">
        <h5 class="brand">AYURCURE</h5>
        <h1 class="headline">
          {{ $t('landing.headline.line1') }}<br />
          {{ $t('landing.headline.line2') }}<br />
          {{ $t('landing.headline.line3') }}
        </h1>
        <p class="subtext">{{ $t('landing.subtext') }}</p>
        <button class="auth-btn" @click="$router.push('/auth')">{{ $t('landing.authBtn') }}</button>
        <button class="scroll-btn" @click="scrollToAbout">↓</button>
      </div>
    </div>

    <!-- About Section -->
    <section id="about" class="about-section">
      <h2 style="font-size: 50px;" class="heading-with-underline">{{ $t('landing.about.title') }}</h2>
      <p class="intro" style="line-height:35px;">{{ $t('landing.about.intro') }}</p>

      <!-- Feature Carousel -->
<section class="features-section">
  <h2 style="font-size: 37px;" class="features-title">{{ $t('landing.features.title') }}</h2>
  <div class="carousel-wrapper">
    <button class="nav-btn" @click="prevSlide">‹</button>
    <div class="carousel">
      <div
  class="about-card"
  v-for="(card, index) in visibleCards"
  :key="index"
>
  <div class="card-image" :style="{ backgroundImage: `url(${card.image})` }"></div>
  <div class="card-content">
    <h3>{{ $t(`landing.features.cards.${card.key}.title`) }}</h3>
    <p>{{ $t(`landing.features.cards.${card.key}.text`) }}</p>
  </div>
</div>

    </div>
    <button class="nav-btn" @click="nextSlide">›</button>
  </div>
</section>


      <!-- Difference Section -->
      <section class="difference-section">
        <div class="text-content">
          <h3 style="font-size: 37px;">🌿 {{ $t('landing.difference.title') }}</h3>
          <p>{{ $t('landing.difference.intro') }}</p>
          <ul>
            <li v-for="(item, i) in tm('landing.difference.points')" :key="i">
            {{ item }}
            </li>
          </ul>
        </div>
        <div class="image-content">
           <img :src="currentDoctorImage" class="doctor-image" alt="Doctor" />
        </div>

      </section>

      <!-- Flow Section -->
      <section class="app-flow-section">
        <h2 class="section-title">{{ $t('landing.flow.title') }}</h2>
        <div class="flow-wrapper">
          <div class="flow-steps">
            <div
              v-for="step in flows"
              :key="step.id"
              class="flow-step"
              :class="{ active: step.id === current.id }"
            >
              <span>{{ step.id }}</span>
            </div>
          </div>
          <transition name="slide-card" mode="out-in">
            <div class="flow-card" :key="current.id">
  <div class="flow-card-content">
    <img :src="current.imageUrl" class="flow-image" />
    <div class="flow-text">
      <h3>{{ $t(`landing.flow.steps.${current.id}.title`) }}</h3>
      <p>{{ $t(`landing.flow.steps.${current.id}.desc`) }}</p>
    </div>
  </div>
</div>

          </transition>
        </div>
      </section>

      <!-- Emergency Section -->
      <section class="emergency">
        <h2 class="emergency-title">
          <span class="sos">{{ $t('home.emergency.sos') }}</span>
          {{ $t('home.emergency.title') }}
        </h2>
        <a href="tel:108" class="emergency-btn" aria-label="Call ambulance">
          {{ $t('home.emergency.call') }}
        </a>
      </section>
    </section>
  </div>
</template>


<script setup>
import HomeNav from '@/components/HomeNav.vue'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

const { tm } = useI18n()

// Feature Cards
const cards = ref([
  {
    key: "search",
    image: new URL("../assets/feature1.png", import.meta.url).href,
  },
  {
    key: "remedy",
    image: new URL("../assets/feature2.png", import.meta.url).href,
  },
  {
    key: "consult",
    image: new URL("../assets/feature3.png", import.meta.url).href,
  },
  {
    key: "bookmark",
    image: new URL("../assets/feature3.png", import.meta.url).href,
  },
  {
    key: "multilang",
    image: new URL("../assets/feature2.png", import.meta.url).href,
  },
  {
    key: "reminder",
    image: new URL("../assets/feature6.png", import.meta.url).href,
  },
  {
    key: "dualalert",
    image: new URL("../assets/features7.jpg", import.meta.url).href,
  },
  {
    key: "emergency",
    image: new URL("../assets/feature4.png", import.meta.url).href,
  },
  {
    key: "renewal",
    image: new URL("../assets/feature3.png", import.meta.url).href,
  },
])

// Flow Steps
const flows = ref([
  {
    id: 1,
    title: 'Search with Confidence',
    desc: 'Type in symptoms like "cold" or "diabetes" with intelligent auto-suggestions.',
    imageUrl: '../images/search.jpg'
  },
  {
    id: 2,
    title: 'Discover Trusted Remedies',
    desc: 'Find natural treatments like Neem paste for acne or Tulsi tea for colds.',
    imageUrl: 'https://img.freepik.com/premium-photo/herbal-remedies-bowl_23-2149390570.jpg'
  },
  {
    id: 3,
    title: 'Detailed Guidance',
    desc: 'Learn preparation methods (paste, decoction, oil), exact dosage & timing.',
    imageUrl: '../images/detail.jpg'
  },
  {
    id: 4,
    title: 'Consult with Experts',
    desc: 'Connect with doctors by location or through teleconsultations.',
    imageUrl: '../images/doct.jpg'
  }
])

const index = ref(0)
const current = computed(() => flows.value[index.value])

// Feature Carousel logic
const currentIndex = ref(0)
const visibleCards = computed(() => {
  const total = cards.value.length
  return [0, 1, 2].map(i => cards.value[(currentIndex.value + i) % total])
})

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % cards.value.length
}
const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + cards.value.length) % cards.value.length
}

// Smooth scroll to About section
const scrollToAbout = () => {
  const aboutSection = document.getElementById("about")
  if (aboutSection) {
    aboutSection.scrollIntoView({ behavior: "smooth" })
  }
}

// Doctor Image Auto-Rotation
const doctorImages = [
  new URL('../assets/diff2.jpg', import.meta.url).href,
  new URL('../assets/diff3.jpg', import.meta.url).href,
  new URL('../assets/diff1.jpg', import.meta.url).href
]

const currentDoctorIndex = ref(0)
const currentDoctorImage = ref(doctorImages[0])

let flowTimer = null
let doctorTimer = null

onMounted(() => {
  flowTimer = setInterval(() => {
    index.value = (index.value + 1) % flows.value.length
  }, 2000)

  doctorTimer = setInterval(() => {
    currentDoctorIndex.value = (currentDoctorIndex.value + 1) % doctorImages.length
    currentDoctorImage.value = doctorImages[currentDoctorIndex.value]
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(flowTimer)
  clearInterval(doctorTimer)
})
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Poppins:wght@400;600&display=swap');

.landing-page {
  height: 100vh;
  background: url('../assets/landpic1.jpg') center/cover no-repeat;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 80px;
  font-family: 'Libre Baskerville', serif;
}

.content {
  max-width: 480px;
  text-align: right;
  color: #3e2b24;
}

.brand {
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.headline {
  font-size: 42px;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 20px;
}

.headline span {
  color: #4d7c0f;
}

.subtext {
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  margin-bottom: 30px;
}

.auth-btn {
  padding: 12px 28px;
  background: #fff;
  border: 2px solid #3e2b24;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  margin-right: 10px;
  transition: all 0.3s ease;
}
.auth-btn:hover {
  background-color: #3e2b24;
  color: #fff;
}

.scroll-btn {
  margin-top: 20px;
  background: transparent;
  border: none;
  font-size: 30px;
  cursor: pointer;
  color: #3e2b24;
}

/* About Section */

.heading-with-underline {
  position: relative;
  display: inline-block;
  color:#1f4037; 
  font-weight: bold;
  font-size: 32px;
  margin-bottom: 30px;
  text-align: center;
}

/* Underline style */
.heading-with-underline::after {
  content: '';
  position: absolute;
  left: 47%;
  transform: translateX(-50%);
  bottom: -10px; 
  width: 250px;
  height: 4px;
  background-color: #1f4037; 
  border-radius: 2px;
}

.about-section {
  min-height: 100vh; 
  padding: 80px 20px;
  background-color: #f9f7f5;
  text-align: center;
  font-family: 'Poppins', sans-serif;
}

.intro {
  max-width: 800px;
  font-style: italic;
  margin: 0 auto 40px;
  font-size: 18px;
  line-height: 1.6;
}

/* Carousel */
.features-title{
 color:#333;
}

.features-section {
  background-color: #d4edc9; 
  padding: 40px 20px;
  border-radius: 12px;
}

.carousel-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  margin: 40px 0;
  flex-wrap: nowrap;
}

.carousel {
  display: flex;
  gap: 30px;
  overflow: hidden;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

.about-card {
  display: flex;
  flex-direction: column;         
  width: 300px;                   
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
  background: white;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}


.card-image {
  flex: 1.5; 
  width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.card-content {
  flex: 1; 
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #f8f8f8;
  text-align: left;
  color: #333;
}


.card-content h3 {
  font-size: 16px;
  margin-bottom: 8px;
  color: #4a4a4a;
}

.overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3); 
  z-index: 2;
}

.card-content p {
  font-size: 15px;
  line-height: 1.6;
  color: #4a4a4a;
}

.nav-btn {
  font-size: 50px;
  background: none;
  border: none;
  cursor: pointer;
  color: #4d7c0f;
  transition: transform 0.2s ease;
    border-radius: 80%; 
}
.nav-btn:hover {
  transform: scale(1.2);
  background-color:#4d7c0f;
  color: white;
}

/* Benefits */
.difference-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding: 60px 20px;
  background-color: #ffffff;
  font-family: 'Poppins', sans-serif;
  text-align: left;
}

@media (min-width: 768px) {
  .difference-section {
    flex-direction: row;
    justify-content: space-between;
    padding: 80px 60px;
  }
}

.text-content {
  flex: 1;
  max-width: 600px;
}

.text-content h3 {
  font-size: 28px;
  font-weight: 600;
  color: #3e2b24;
  margin-bottom: 20px;
}

.text-content p {
  font-size: 16px;
  color: #555;
  line-height: 1.7;
  margin-bottom: 24px;
}

.text-content ul {
  list-style: none;
  padding-left: 0;
  font-size: 16px;
  color: #555;
  line-height: 1.8;
}

.text-content ul li {
  position: relative;
  padding-left: 26px;
  margin-bottom: 12px;
}

.text-content ul li::before {
  content: '✔️';
  position: absolute;
  left: 0;
  top: 0;
  color: #4d7c0f;
  font-size: 18px;
}

.image-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.doctor-image {
  width: 100%;
  max-width: 400px;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transition: opacity 0.5s ease-in-out;
}


/* Emergency */
.emergency {
  background: linear-gradient(to right, #ff4e50, #f44336);
  color: white;
  text-align: center;
  padding: 1.5rem 1rem;
  font-size: 1.4rem;
  font-weight: bold;
  letter-spacing: 0.5px;
  box-shadow: 0 6px 16px var(--shadow);
  margin-top: 2rem;
  border-radius: var(--radius);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.emergency a {
  color: white;
  text-decoration: underline;
  font-weight: 600;
  font-size: 1.3rem;
}

/* ✨ Animate section on scroll */
.difference-section {
  opacity: 0;
  transform: translateY(50px);
  animation: fadeSlideUp 1s ease forwards;
  animation-delay: 0.3s;
}

@keyframes fadeSlideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ✅ Smooth transitions for child elements */
.text-content h3,
.text-content p,
.text-content ul li {
  transition: all 0.3s ease;
}

.text-content ul li:hover {
  transform: translateX(6px);
  color: #3e2b24;
}

/* 🖼️ Subtle zoom on image */
.image-content {
  transition: transform 0.4s ease;
}
.image-content:hover {
  transform: scale(1.03);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
}
.app-flow-section {
  background-color: #e2f3dc; /* pastel green */
  padding: 60px 20px;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  transition: background-color 0.3s ease;
}

.section-title {
  font-size: 37px;
  font-weight: 600;
  margin-bottom: 40px;
  color: #3e2b24;
}

.flow-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  flex-wrap: wrap;
}

.flow-steps {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.flow-step {
  width: 40px;
  height: 40px;
  background: #3b2a78;
  color: white;
  font-weight: bold;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: skewY(-20deg);
  opacity: 0.4;
  transition: all 0.3s ease;
}

.flow-step.active {
  background: #124c33;
  opacity: 1;
  transform: scale(1.1) skewY(-20deg);
}

.flow-card {
  display: flex;
  max-width: 1500px;
  height:400px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.5s ease-in-out;
  text-align: left;
}

.flow-card-content {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}

.flow-image {
  width: 50%;
  height: 100%;
  object-fit: cover;
  border-right: 1px solid #eee;
}

.flow-text {
   width: 50%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.flow-text h3 {
  font-size: 22px;
  margin-bottom: 10px;
  color: #3e2b24;
}

.flow-text p {
  font-size: 16px;
  color: #555;
  line-height: 1.6;
}

/* Slide Animation */
.slide-card-enter-active, .slide-card-leave-active {
  transition: all 0.6s ease;
}
.slide-card-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.slide-card-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

/* Dark mode: landing page text */
body.dark-theme .scroll-btn {
  color: #f5f5f5;
}
body.dark-theme .auth-btn {
  background: #121212;
  color: #f5f5f5;
  border-color: #ccc;
}
body.dark-theme .auth-btn:hover {
  background: #333;
  color: #fff;
}

/* Dark mode: about section */
body.dark-theme .about-section {
  background-color: #1a1a1a;
  color: #eaeaea;
}
body.dark-theme .heading-with-underline{
  color:#ffc107;
}
body.dark-theme .heading-with-underline::after {
  background-color: #ffc107;
}
body.dark-theme .intro {
  color: #ccc;
}

/* Dark mode: carousel overlay remains dark, so just change text contrast */
body.dark-theme .features-title{
 color:#333;
}

body.dark-theme .card-content h3,
body.dark-theme .card-content p {
  color: #333;
}

/* Dark mode: How AyurCure Makes a Difference */
body.dark-theme .difference-section {
  background-color: #121212;
}
body.dark-theme .text-content h3,
body.dark-theme .text-content p,
body.dark-theme .text-content ul {
  color: #f0f0f0;
}
body.dark-theme .text-content ul li::before {
  color: #a8e6cf;
}



/* Dark mode: Emergency section stays vibrant or darkens slightly */
body.dark-theme .emergency {
  background: linear-gradient(to right, #e53935, #b71c1c);
}


</style>
