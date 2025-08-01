<template>
  <div>
    <section class="hero">
      <div class="hero-content">
        <h1>{{ $t('home.hero.title') }}</h1>
        <p>{{ $t('home.hero.subtitle') }}</p>
        <button @click="$router.push('/remedies')">{{ $t('home.hero.button') }}</button>
      </div>
    </section>

    <section class="remedy-highlight-section">
      <h2 class="highlight-title">{{ $t('home.remedyHighlights') }}</h2>
      <div class="carousel-wrapper">
        <transition name="slide-card" mode="out-in">
          <div class="highlight-card" :key="current.id">
            <img :src="current.imageUrl" :alt="$t(current.nameKey)" class="highlight-img" />
            <div class="highlight-text">
              <h3>{{ $t(current.nameKey) }}</h3>
              <p>{{ $t(current.descKey) }}</p>
            </div>
          </div>
        </transition>
      </div>
    </section>
    <section class="consult-doctor">
      <h2 class ="doctors-title">{{ $t('home.consult.title') }}</h2>
      <p>{{ $t('home.consult.desc') }}</p>
      <router-link to="/doctors" class="doctor-button">
        {{ $t('home.consult.button') }}
      </router-link>
    </section>

    <section class="features">
      <h2>{{ $t('home.featuresTitle') }}</h2>
      <div class="hanging-card-grid">
        <div class="hanging-card" v-for="(feature, i) in features" :key="i">
          <div class="rope"></div>
          <div class="card-content">
            <img :src="feature.imageUrl" :alt="feature.title" class="card-image" />
            <h3>{{ $t(feature.titleKey) }}</h3> <p v-html="$t(feature.descriptionKey)"></p> </div>
        </div>
      </div>
    </section>

    <section class="emergency">
      <h2 class="emergency-title">
        <span class="sos">{{ $t('home.emergency.sos') }}</span>
        {{ $t('home.emergency.title') }}
      </h2>
      <a href="tel:108" class="emergency-btn" aria-label="Call ambulance">
        {{ $t('home.emergency.call') }}
      </a>
    </section>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      query: '',
      attempts: 2,
      index: 0,
      timer: null,
      remedies: [
        {
          id: 1,
          // CHANGED: Use nameKey and descKey pointing to the full JSON path
          nameKey: 'home.remedies.lemonHoney.name',
          descKey: 'home.remedies.lemonHoney.desc',
          imageUrl: 'https://img.freepik.com/premium-photo/fresh-lemon-with-leaf-honey-with-honey-dipper-isolated-white-wall-ingredient-summer-beverage-concept_34435-4068.jpg?w=1380'
        },
        {
          id: 2,
          // CHANGED: Use nameKey and descKey pointing to the full JSON path
          nameKey: 'home.remedies.herbalMix.name',
          descKey: 'home.remedies.herbalMix.desc',
          imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.OZyL9BI5FEWEgLF35WxArgHaE8?w=1000&h=667&rs=1&pid=ImgDetMain&o=7&rm=3'
        },
        {
          id: 3,
          // CHANGED: Use nameKey and descKey pointing to the full JSON path
          nameKey: 'home.remedies.neemLeaf.name',
          descKey: 'home.remedies.neemLeaf.desc',
          imageUrl: 'https://img.freepik.com/premium-photo/medicinal-neem-leaf-white-surface-azadirachta-indica_136354-3554.jpg?w=2000'
        },
        {
          id: 4,
          // CHANGED: Use nameKey and descKey pointing to the full JSON path
          nameKey: 'home.remedies.aloeVera.name',
          descKey: 'home.remedies.aloeVera.desc',
          imageUrl: 'https://farmseller.in/wp-content/uploads/2022/01/Alovera-plant.jpeg'
        },
        {
          id: 5,
          // CHANGED: Use nameKey and descKey pointing to the full JSON path
          nameKey: 'home.remedies.goldenMilk.name',
          descKey: 'home.remedies.goldenMilk.desc',
          imageUrl: 'https://foolproofliving.com/wp-content/uploads/2019/02/Turmeric-Golden-Milk-Recipe-9304-600x600.jpg'
        }
      ],
      features: [
        { titleKey: 'home.features.naturalRemedies.title', imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.N-P2LXTnKYjLcE_m5bbS-QHaE8?rs=1&pid=ImgDetMain&o=7&rm=3', descriptionKey: 'home.features.naturalRemedies.description' },
        { titleKey: 'home.features.expertDoctors.title', imageUrl: 'https://th.bing.com/th/id/R.a3419a86ce57057efa9c3fb4682c3c22?rik=NBvQIovFisn4ZQ&riu=http%3a%2f%2femergencyexpertforyou.com%2fwp-content%2fuploads%2f2016%2f01%2fMedicalExpertWitness-767x511%402x.jpg&ehk=f7wYbQIamGDCVhkbMo9PhYVN%2b3jlQLUfJ1%2bd%2bk%2bN4es%3d&risl=&pid=ImgRaw&r=0', descriptionKey: 'home.features.expertDoctors.description' },
        { titleKey: 'home.features.guidedKnowledge.title', imageUrl: 'https://gomlab.net/wp-content/uploads/2021/06/Health-Tips.jpg', descriptionKey: 'home.features.guidedKnowledge.description' },
        { titleKey: 'home.features.accessForAll.title', imageUrl: 'https://static.vecteezy.com/system/resources/previews/021/937/374/original/friendly-people-stand-in-circle-hold-hands-for-collaboration-and-teamwork-top-view-university-students-of-different-gender-and-race-get-education-together-while-studying-in-college-vector.jpg', descriptionKey: 'home.features.accessForAll.description' },
        { titleKey: 'home.features.emergencyHelp.title', imageUrl: 'https://static.vecteezy.com/system/resources/previews/013/710/631/original/emergency-word-concept-with-red-siren-illustration-vector.jpg', descriptionKey: 'home.features.emergencyHelp.description' }
      ]
    };
  },
  computed: {
    current() {
      // This remains correct, as it just returns the current object from the remedies array
      return this.remedies[this.index];
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.index = (this.index + 1) % this.remedies.length;
    }, 3000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
  methods: {
    search() {
      if (this.attempts > 0 && this.query.trim()) {
        alert(this.$t('home.search.alertMessage', { query: this.query }));
        this.attempts--;
      }
    }
  }
};
</script>

<style scoped>
/* Your existing CSS styles go here. No changes needed for CSS. */
:root {
  --green-dark: #1e5631;
  --mint: #a8e6cf;
  --white: #ffffff;
  --bg-light: #013220;
  --accent-dark: #14532d;
  --danger: #ff1744;
  --shadow: rgba(0, 0, 0, 0.08);
  --radius: 16px;
  --font-main: 'Segoe UI', sans-serif;
}
body {
  margin: 0;
  overflow-x: hidden;
  font-family: var(--font-main);
  background-color: var(--bg-light);
  color: var(--white);
  line-height: 1.6;
}

.hero {
  min-height: 100vh;
  background:
    linear-gradient(rgba(30, 86, 49, 0.5), rgba(30, 86, 49, 0.5)),
    url('../assets/image.png') no-repeat center center / cover;
  background-blend-mode: overlay;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding: 0 2rem;
  padding-top: 80px;
  margin-bottom: 3rem;
}

.hero-content {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  max-width: 800px;
  margin: auto;
}

.hero h1 {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  letter-spacing: 1px;
  text-shadow: 3px 3px 8px rgba(0, 0, 0, 0.5);
}
.hero p {
  font-size: 1.4rem;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
  line-height: 1.5;
}
.hero button {
  background: linear-gradient(45deg, #a8e6cf, #77dd77);
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  color: #1e3d32;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  box-shadow: 0 6px 15px rgba(0, 128, 0, 0.3);
}
.hero button:hover {
  background-color: #ffffff;
  color: #1e3d32;
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 12px 28px rgba(0, 128, 0, 0.5);
}
.hero button:active {
  transform: translateY(-2px) scale(0.98);
  box-shadow: 0 4px 10px rgba(0, 128, 0, 0.2);
}
.search-section {
  background: linear-gradient(145deg, #e8f5e9, #dcf8d8);
  padding: 3.5rem 2.5rem;
  text-align: center;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  border-radius: 30px;
  max-width: 900px;
  margin: 3rem auto;
  margin-top: 0;
  padding-top: 0;
}
.section-heading {
  font-size: 2.6rem;
  color: var(--green-dark);
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
}

.section-heading span::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 70%;
  height: 4px;
  background-color: var(--mint);
  border-radius: 2px;
}

.search-section input {
  padding: 1.1rem;
  width: 65%;
  border-radius: 30px;
  border: 2px solid #ddd;
  margin-top: 1rem;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.05);
  font-size: 1.1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
.search-section input:focus {
  outline: none;
  border-color: var(--mint);
  box-shadow: 0 0 0 4px rgba(168, 230, 207, 0.5);
}
.search-section button {
  padding: 1.1rem 1.8rem;
  background: linear-gradient(45deg, #1e5631, #3cb371);
  color: white;
  border: none;
  border-radius: 30px;
  margin-left: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
.search-section button:hover:not(:disabled) {
  background: linear-gradient(45deg, #1b4d2d, #339966);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}
.search-section button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: #ccc;
  box-shadow: none;
}
.search-section p {
  margin-top: 1rem;
  color: var(--danger);
  font-weight: 500;
  font-size: 0.95rem;
}

.consult-doctor {
  background: linear-gradient(145deg, #e8f5e9, #dcf8d8);
  padding: 3.5rem 2.5rem;
  text-align: center;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  border-radius: 30px;
  max-width: 900px;
  margin: 3rem auto;
  margin-top: 0;
  padding-top: 0;
}
.consult-doctor h2 {
  margin-top: 10px;
  color: var(--green-dark);
  font-size: 2.8rem;
  margin-bottom: 1.5rem;
  letter-spacing: 0.8px;
}
.consult-doctor p {
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
}

.doctor-button {
  background: linear-gradient(45deg, #1e5631, #3cb371);
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 30px;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}
.doctor-button:hover {
  background: linear-gradient(45deg, #1b4d2d, #339966);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}


.remedy-icons {
  margin-top: 3rem;
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}
.icon-card {
  background: linear-gradient(135deg, var(--mint), #caffca);
  padding: 1.2rem;
  border-radius: 20px;
  width: 140px;
  font-size: 1.3rem;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
.icon-card span {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--accent-dark);
}
.icon-card:hover {
  transform: translateY(-7px) scale(1.05);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.18);
  background: linear-gradient(135deg, #caffca, var(--mint));
}

.remedy-highlight-section {
  background: linear-gradient(145deg, #e8f5e9, #dcf8d8);
  padding: 3.5rem 2.5rem;
  text-align: center;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  border-radius: 30px;
  max-width: 900px;
  margin: 3rem auto;
  margin-top: 0;
  padding-top: 0;
}
.carousel-wrapper {
  display: flex;
  justify-content: center;
  overflow: visible;
  position: relative;
  height: 200px;
  perspective: 1000px;
}
.highlight-title {
  margin-top: 10px;
  text-align: center;
  font-size: 2.5rem;
  color: var(--green-dark);
  margin-bottom: 3rem;
  font-weight: 600;
  letter-spacing: 1.5px;
}

.highlight-card {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #e0f8e0, #99d79e);
  padding: 1rem 1.5rem;
  border-radius: 25px;
  box-shadow: 0 10px 30px rgba(0, 80, 0, 0.15);
  width: 95%;
  max-width: 950px;
  height: 200px;
  gap: 1.5rem;
  box-sizing: border-box;
  position: absolute;
  z-index: 1;
  transition: all 0.6s ease;
  transform-style: preserve-3d;
}

.highlight-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 100, 0, 0.3);
  background: linear-gradient(135deg, #d5f8d5, #b6f7b8);
}

.highlight-img {
  width: 250px;
  height: 150px;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.highlight-text h3 {
  font-size: 2rem;
  text-align: left;
  color: #1d392a;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.highlight-text p {
  font-size: 0.95rem;
  color: #2b2b2b;
  text-align: left;
  line-height: 1.8;
}

.slide-card-enter-active,
.slide-card-leave-active {
  transition: all 0.8s ease-in-out;
  position: absolute;
  width: 95%;
  max-width: 950px;
}
.slide-card-enter-from {
  transform: translateX(100%) scale(0.9);
  opacity: 0;
}
.slide-card-leave-to {
  transform: translateX(-100%) scale(0.9);
  opacity: 0;
}
.slide-card-enter-active,
.slide-card-leave-active {
  transition: all 0.8s ease-in-out;
  position: absolute;
  width: 95%;
  max-width: 950px;
}
.slide-card-enter-from {
  transform: translateX(100%) scale(0.9);
  opacity: 0;
}
.slide-card-leave-to {
  transform: translateX(-100%) scale(0.9);
  opacity: 0;
}
.features {
  background: linear-gradient(145deg, #e8f5e9, #dcf8d8);
  padding: 3.5rem 2.5rem;
  text-align: center;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  border-radius: 30px;
  max-width: 1100px;
  margin: 3rem auto;
  margin-top: 0;
  padding-top: 1rem;
  overflow: hidden;
}

.features h2 {
  font-size: 3rem;
  color: var(--green-dark);
  margin-bottom: 3.5rem;
  letter-spacing: 1px;
}

.hanging-card-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  position: relative;
  padding: 2rem;
  padding-top: 4rem;
}

.hanging-card {
  position: relative;
  background: linear-gradient(135deg, #ffffff, #f9fff9);
  padding: 1.5rem;
  border-radius: 25px;
  width: 250px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-bottom: 4px solid var(--mint);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  margin-top: 2rem;
}

.hanging-card:hover {
  transform: translateY(-10px) rotateZ(-2deg);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
}

.rope {
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 50px;
  background-color: #8B4513;
  border-radius: 2px;
  z-index: 0;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.card-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid var(--mint);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.hanging-card h3 {
  font-size: 2rem;
  color: var(--accent-dark);
  margin-bottom: 0;
}

.hanging-card p {
  font-size: 1.4rem;
  line-height: 1.6;
  color: #555;
}

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
  margin-bottom: 15px;
}

.emergency a {
  color: white;
  text-decoration: underline;
  font-weight: 600;
  font-size: 1.3rem;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}
@keyframes pulse-danger {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.8rem;
  }
  .hero p {
    font-size: 1.1rem;
  }
  .highlight-card {
    flex-direction: column;
    height: auto;
    width: 95%;
    padding: 1rem;
  }
  .highlight-img {
    width: 100%;
    height: 180px;
  }
  .highlight-text {
    text-align: center;
  }
  .consult-doctor, .about, .search-section, .emergency {
    margin: 2rem auto;
    padding: 2rem 1rem;
  }
  .consult-doctor h2, .about h2, .problems h2, .section-heading, .features h2, .emergency-title {
    font-size: 2rem;
  }
  .search-section input {
    width: 90%;
    margin-bottom: 1rem;
  }
  .search-section button {
    width: 90%;
    margin-left: 0;
  }
  .remedy-icons {
    flex-direction: column;
    align-items: center;
  }
  .icon-card {
    width: 80%;
  }
  .hanging-card-grid {
    flex-direction: column;
    align-items: center;
  }
  .hanging-card {
    width: 90%;
  }
  .emergency {
    flex-direction: column;
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .hero h1 {
    font-size: 2.2rem;
  }

  .hero p {
    font-size: 1rem;
  }

  .problems li {
    width: 90%;
  }
}
body.dark-theme .consult-doctor p,
body.dark-theme .consult-doctor h2,
body.dark-theme .features h2,
body.dark-theme .hanging-card p,
body.dark-theme .highlight-title{
  color:white;
}

body.dark-theme  .card-content{
  color:black;
}
body.dark-theme .consult-doctor,
body.dark-theme .features,
body.dark-theme .remedy-highlight-section{
  background:#212121;
}

body.dark-theme .hanging-card{
  background: #757575;
}

</style>