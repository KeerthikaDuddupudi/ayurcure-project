<template>
  <div>
    <section class="doctors-page">
      <h1 class="title">{{ $t('doctors.title') }}</h1>

      <!-- Search -->
      <div class="search-wrapper">
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="$t('doctors.searchPlaceholder')"
        />
      </div>

      <!-- Cards Grid -->
      <div class="doctor-grid">
        <div
          v-for="doc in filteredDoctors"
          :key="doc._id"
          class="doctor-card"
        >
          <img :src="getDoctorImage(doc._id)" alt="doctor" class="photo" />
          <div class="content">
            <h3 class="name">{{ doc.name }}</h3>
            <p class="degree">{{ doc.degree }}</p>
            <p class="specialization">
              <strong>{{ $t('doctors.specialization') }}:</strong>
              {{ doc.specialization }}
            </p>
            <p class="location">
              <strong>{{ $t('doctors.location') }}:</strong> {{ doc.location }}
            </p>
            <p class="phone">{{ doc.phone }}</p>
            <button class="book-btn" @click="goToAppointment(doc)">
              {{ $t('doctors.book') }}
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

// Import local images
import anjali from "../assets/doctor1.jpg";
import neha from "../assets/doctor.png";
import rajesh from "../assets/doctor1.jpg";
import amit from "../assets/doctor1.jpg";
import defaultImg from "../assets/doctor.png";

// Image mapping
const doctorImages = {
  "687b5a8cb6e84cd1e45e4791": anjali,
  "687b5a8cb6e84cd1e45e4792": neha,
  "687b5a8cb6e84cd1e45e4793": rajesh,
  "687b5a8cb6e84cd1e45e4794": amit,
};

const getDoctorImage = (id) => {
  return doctorImages[id] || defaultImg;
};

const router = useRouter();
const searchQuery = ref("");
const doctors = ref([]);
const apiBase = import.meta.env.VITE_API_URL;

onMounted(async () => {
  try {
    const response = await axios.get(`${apiBase}/api/doctors`);
    doctors.value = response.data;
  } catch (error) {
    console.error("Failed to load doctors:", error);
  }
});

const filteredDoctors = computed(() => {
  const q = searchQuery.value.toLowerCase().trim();
  return q
    ? doctors.value.filter((doc) =>
        doc.specialization.toLowerCase().includes(q)
      )
    : doctors.value;
});

function goToAppointment(doc) {
  router.push({
    path: "/appointment",
    query: {
      doctor: doc.name,
      doctorId: doc._id,
    },
  });
}
</script>

<style scoped>
/* 🔽 Existing styles unchanged, just keep them */
:root {
  --green-dark: #1e5245;
  --green-light: #e9fcee;
  --green-mid: #74c69d;
  --white: #ffffff;
  --glass-bg: rgba(255, 255, 255, 0.2);
  --glass-border: rgba(255, 255, 255, 0.3);
  --glow: 0 0 15px rgba(116, 198, 157, 0.4);
}
.doctors-page {
  min-height: 100vh;
  padding: 2.5rem 1rem 4rem;
  font-family: "Segoe UI", sans-serif;
  background: #ffffff;
  background-attachment: fixed;
  position: relative;
  overflow: hidden;
}
.title {
  text-align: center;
  font-size: 45px;
  font-weight: 800;
  color: #1e5245;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1),
    0 4px 10px rgba(91, 214, 160, 0.3);
  margin-bottom: 2rem;
  margin-top: 60px;
}
.title::after {
  content: "";
  display: block;
  width: 80px;
  height: 4px;
  background: linear-gradient(to right, #5bd6a0, #1e5245);
  margin: 10px auto 0;
  border-radius: 2px;
}
.search-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 2.5rem;
  position: relative;
}
.search-wrapper input {
  width: 90%;
  max-width: 600px;
  padding: 12px 16px 12px 44px;
  border: 2px solid var(--green-mid);
  border-radius: 10px;
  font-size: 1rem;
  background-color: #ffffff;
  color: #1a1a1a;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 8px rgba(0, 100, 80, 0.05);
}
.search-wrapper input:focus {
  outline: none;
  border-color: var(--green-dark);
  box-shadow: 0 0 8px var(--green-mid);
}
.doctor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 28px;
  max-width: 900px;
  margin: auto;
  justify-items: center;
}
.doctor-card {
  display: flex;
  background: rgba(116, 198, 157, 0.1);
  border: 1px solid rgba(116, 198, 157, 0.3);
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 70, 50, 0.08);
  overflow: hidden;
  width: 100%;
  max-width: 460px;
  min-height: 200px;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.doctor-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(0, 100, 80, 0.2);
}
.photo {
  width: 150px;
  height: 100%;
  object-fit: cover;
  border-right: 2px solid var(--green-mid);
}
.content {
  padding: 16px 20px 16px 60px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #222;
}
.name {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--green-dark);
  margin-bottom: 4px;
}
.degree {
  font-style: italic;
  color: #666;
  font-size: 0.85rem;
  margin-bottom: 6px;
}
.content p {
  margin: 2px 0;
  font-size: 0.86rem;
  line-height: 1.3;
}
.phone {
  font-weight: 600;
  color: var(--green-dark);
}
.book-btn {
  background: linear-gradient(to right, #1e5245, #2f7e6a);
  color: var(--white);
  border: none;
  padding: 8px 14px;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 8px;
  align-self: flex-start;
  transition: all 0.3s ease-in-out;
}
.book-btn:hover {
  background: linear-gradient(to right, #2f7e6a, #1e5245);
  transform: scale(1.03);
}
@media (max-width: 600px) {
  .title {
    font-size: 2rem;
  }
  .photo {
    width: 100px;
  }
  .content {
    padding: 12px 16px;
  }
  .name {
    font-size: 1rem;
  }
  .degree,
  .content p {
    font-size: 0.8rem;
  }
  .book-btn {
    font-size: 0.8rem;
    padding: 6px 10px;
  }
}
body.dark-theme .title {
  color: #f5f5f5;
}
body.dark-theme .doctors-page {
  background: #121212;
  color: #f5f5f5;
}
body.dark-theme .doctor-card {
  background: rgba(255, 255, 255, 0.05);
  color: #f5f5f5;
}
body.dark-theme .doctor-card .name {
  color: #a8e6cf;
}
body.dark-theme .book-btn {
  background: linear-gradient(to right, #388e3c, #2e7d32);
}
body.dark-theme .book-btn:hover {
  background: linear-gradient(to right, #2e7d32, #388e3c);
}
body.dark-theme .degree {
  color: #ccc;
}
body.dark-theme .specialization,
body.dark-theme .location,
body.dark-theme .phone {
  color: white;
}
</style>
