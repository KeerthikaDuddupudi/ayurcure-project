<template>
  <div class="container">
    <h2 class="title">{{ $t('savedRemedies.title') }}</h2>

    <TransitionGroup name="fade" tag="div" class="grid-container">
      <div
        v-for="(remedy, index) in savedRemedies"
        :key="remedy.title + index"
        class="card relative"
      >
        <!-- ❌ Remove Button -->
        <button
          class="remove-btn"
          @click="toggleSave(index)"
          :title="$t('savedRemedies.removeTitle')"
        >
          &times;
        </button>

        <!-- Remedy Image -->
        <img :src="remedy.image" alt="Remedy Image" class="remedy-image" />

        <!-- Remedy Content -->
        <div class="p-4 flex flex-col flex-grow">
          <div class="flex-grow">
            <h3 class="rem-title">{{ remedy.title }}</h3>
            <p class="description">{{ remedy.description }}</p>
          </div>

          <!-- Save Icon -->
          <div class="mt-4 flex justify-end">
            <button
              @click="toggleSave(index)"
              class="save-btn"
              :title="$t('savedRemedies.removeFromSaved')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="currentColor"
                :class="remedy.saved ? 'text-black' : 'text-gray-400'"
                viewBox="0 0 24 24"
              >
                <path d="M5 3a2 2 0 00-2 2v16l9-4 9 4V5a2 2 0 00-2-2H5z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </TransitionGroup>

    <!-- No Remedies Message -->
    <div v-if="savedRemedies.length === 0" class="text-center text-gray-500 mt-10">
      {{ $t('savedRemedies.noRemedies') }}
    </div>
  </div>
</template>


<script setup>
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import save1 from '@/assets/save1.jpg'
import save2 from '@/assets/save2.jpg'
import save3 from '@/assets/save3.jpg'

const savedRemedies = ref([])
const { t } = useI18n()

onMounted(() => {
  savedRemedies.value = [
    {
      title: t('savedRemedies.remedy1.title'),
      description: t('savedRemedies.remedy1.description'),
      image: save2,
      saved: true
    },
    {
      title: t('savedRemedies.remedy2.title'),
      description: t('savedRemedies.remedy2.description'),
      image: save3,
      saved: true
    },
    {
      title: t('savedRemedies.remedy3.title'),
      description: t('savedRemedies.remedy3.description'),
      image: save1,
      saved: true
    }
  ]
})
</script>


<style scoped>
/* Container */
.container {
  padding: 1.5rem;
  background-color: #f0fdf4; /* Tailwind green-50 */
  min-height: 100vh;
}

/* Title Styling */
.title {
  margin-top: 80px;
  font-size: 37px;
  font-weight: bold;
  color: #15803d; /* Tailwind green-700 */
  text-align: center;
  margin-bottom: 2rem;
}

/* Fade animation for item removal */
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Grid: 3 cards per row */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 3rem;
  justify-items: center;
  margin-top: 50px;
  margin-left: 50px;
  margin-right: 50px;
}

/* Remedy Card */
.card {
  background-color: #ffffff;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 370px;
  width: 100%;
  min-height: 380px;
  position: relative;
}
.card:hover {
  transform: translateY(-4px) scale(1.03);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.1);
  border: 1px solid #86efac;
}


.remove-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 24px;
  color: #dc2626; /* Tailwind red-600 */
  font-weight: bold;
  cursor: pointer;
  z-index: 10;
  transition: transform 0.2s ease, color 0.2s ease;
}
.remove-btn:hover {
  transform: scale(1.2);
  color: #b91c1c; /* Tailwind red-700 */
}

/* Remedy Image */
.remedy-image {
  width: 100%;
  height: 210px;
  object-fit: cover;
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}
.card:hover .remedy-image {
  transform: scale(1.025);
}

/* Title & Description */
.rem-title {
  font-size: 23px;
}
.description {
  margin-top: 5px;
  font-size: 18px;
  line-height: 30px;
  color: rgb(46, 46, 46);
}

/* Save Icon */
.save-btn svg {
  transition: transform 0.2s ease;
}
.save-btn:hover svg {
  transform: scale(1.15);
}
/* 🌙 DARK THEME STYLES */
body.dark-theme .container {
  background-color: #121212;
}

body.dark-theme .title {
  color: #f5f5f5;
}

body.dark-theme .card {
  background-color: #1f1f1f;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.05);
  border: 1px solid #2e2e2e;
}

body.dark-theme .card:hover {
  border: 1px solid #4ade80;
  box-shadow: 0 8px 18px rgba(255, 255, 255, 0.08);
}

body.dark-theme .rem-title {
  color: #ffffff;
}

body.dark-theme .description {
  color: #cccccc;
}

body.dark-theme .remove-btn {
  color: #f87171;
}
body.dark-theme .remove-btn:hover {
  color: #ef4444;
}

body.dark-theme .save-btn svg.text-black {
  color: #ffffff !important;
}

</style>
