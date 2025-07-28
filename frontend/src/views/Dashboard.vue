<template>
  <div class="profile-container">
    <!-- Top Controls: Back + Sign Out -->
    <div class="top-controls">
      <button class="back-btn" @click="$emit('close')">
        {{ $t('profile.back') }}
      </button>
      <button class="signout-btn" @click="signOut">
        {{ $t('profile.signOut') || 'Sign Out' }}
      </button>
    </div>

    <!-- Profile Header -->
    <div class="profile-header">
      <div class="profile-pic-wrapper">
        <img :src="imageUrl" alt="User" class="profile-pic" />
        <label for="fileInput" class="edit-icon">＋</label>
        <input type="file" id="fileInput" @change="handleImageUpload" accept="image/*" hidden />
      </div>
      <div class="profile-details">
        <h2>{{ userData.name || 'Guest User' }}</h2>
        <p>{{ userData.email || 'guest@example.com' }}</p>
      </div>
    </div>

    <!-- Personal Info -->
    <div class="section personal-info">
      <h3>{{ $t('profile.personalInfo') }}</h3>
      <div class="info-table">
        <div class="row">
          <div class="label">{{ $t('profile.memberSince') }}</div>
          <div class="value">{{ formattedMemberSince }}</div>
        </div>
        <div class="row">
          <div class="label">{{ $t('profile.dob') }}</div>
          <div class="value">{{ formattedDob || 'N/A' }}</div>
        </div>
        <div class="row">
          <div class="label">{{ $t('profile.gender') }}</div>
          <div class="value">{{ userData.gender || 'N/A' }}</div>
        </div>
        <div class="row">
          <div class="label">{{ $t('profile.phone') }}</div>
          <div class="value">{{ userData.phone || 'N/A' }}</div>
        </div>
      </div>
    </div>

    <!-- Dashboard Cards -->
    <div class="section dashboard">
      <div class="dashboard-col">
        <div class="card" @click="$router.push('/notification')">
          <div class="icon">🔔</div>
          <div>
            <strong>{{ $t('profile.notifications') }}</strong><br />
            {{ $t('profile.newMessage') }}
          </div>
        </div>
        <div class="card" @click="$router.push('/schedule')">
          <div class="icon">📅</div>
          <div>
            <strong>{{ $t('profile.schedule') }}</strong><br />
            {{ $t('profile.nextAppointment') }}
          </div>
        </div>
      </div>
      <div class="dashboard-col">
        <div class="card" @click="$router.push('/saved')">
          <div class="icon">💾</div>
          <div>
            <strong>{{ $t('profile.savedRemedies') }}</strong><br />
            {{ $t('profile.remediesSaved') }}
          </div>
        </div>
        <div class="card" @click="$router.push('/diet')">
          <div class="icon">📜</div>
          <div>
            <strong>{{ $t('profile.medicalHistory') }}</strong><br />
            {{ $t('profile.medicalTip') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import defaultImage from '../assets/image.png'

const imageUrl = ref(defaultImage)
const userData = ref({})

// Load saved profile image if available
const storedImage = localStorage.getItem('profileImage')
if (storedImage) {
  imageUrl.value = storedImage
}

// Load user data from localStorage
const storedUser = localStorage.getItem('user')
if (storedUser) {
  try {
    userData.value = JSON.parse(storedUser)
  } catch (e) {
    console.error("Invalid user JSON in localStorage")
  }
}

// Format date like "July 23, 2025"
function formatDate(dateStr) {
  if (!dateStr) return 'N/A'
  const date = new Date(dateStr)
  return isNaN(date.getTime())
    ? 'N/A'
    : date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
}

// Computed values
const formattedMemberSince = computed(() => formatDate(userData.value.memberSince))
const formattedDob = computed(() => formatDate(userData.value.dob))

function handleImageUpload(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      imageUrl.value = reader.result
      localStorage.setItem('profileImage', reader.result)
    }
    reader.readAsDataURL(file)
  }
}

function signOut() {
  if (confirm("Are you sure you want to sign out?")) {
    localStorage.removeItem('user')
    localStorage.removeItem('profileImage')
    window.location.href = '/' // redirect to landing page
  }
}
</script>

<style>
:root {
  --dark-green: #1c3c2e;
  --light-green: #b2f0c0;
  --lightest-green: #dcf2e1;
  --neon-green: #00e676;
  --bg: #fefdfb;
  --white: #ffffff;
  --shadow: rgba(0, 0, 0, 0.06);
}
.profile-container {
  max-width: 960px;
  margin: 4rem auto;
  padding: 2.5rem;
  background: var(--lightest-green);
  border-radius: 20px;
  box-shadow: 0 12px 28px var(--shadow);
  font-family: 'Segoe UI', sans-serif;
  color: var(--dark-green);
  position: relative;
}
.top-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}
.back-btn,
.signout-btn {
  margin-top: -60px;
  background: transparent;
  color: var(--dark-green);
  border: 2px solid transparent;
  font-size: 15.5px;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.3s ease;

}
.back-btn::before {
  content: "←";
  font-size: 16px;
  display: inline-block;
  margin-right: 6px;
}
.back-btn:hover {
  background-color: #a8e6cf;
  color: var(--dark-green);
  border-color: #00e676;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
.signout-btn:hover {
  background-color: #ffdddd;
  color: #d32f2f;
  border-color: #f44336;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
.profile-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2.5rem;
}
.profile-pic-wrapper {
  position: relative;
  width: 130px;
  height: 130px;
}
.profile-pic {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid var(--light-green);
}
.edit-icon {
  position: absolute;
  bottom: -5px;
  right: -5px;
  background: var(--neon-green);
  color: white;
  font-size: 18px;
  padding: 5px 9px;
  border-radius: 50%;
  border: 2px solid white;
  cursor: pointer;
  transition: 0.3s;
}
.edit-icon:hover {
  background: var(--dark-green);
}
.profile-details h2 {
  font-size: 26px;
  font-weight: bold;
  margin: 0;
}
.profile-details p {
  color: #555;
  margin-top: 6px;
}
.section h3 {
  font-size: 20px;
  margin-bottom: 1.5rem;
  font-weight: bold;
}
.personal-info {
  border-bottom: 1px solid #ddd;
  padding-bottom: 1.5rem;
  margin-bottom: 2rem;
}
.info-table {
  display: grid;
  row-gap: 1rem;
  column-gap: 2rem;
  grid-template-columns: auto auto;
}
.row {
  display: contents;
}
.label {
  font-size: 16px;
  font-weight: 500;
  color: #555;
}
.value {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
}
.dashboard {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}
.dashboard-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.card {
  background: var(--white);
  padding: 1rem 1.4rem;
  border-left: 5px solid var(--neon-green);
  border-radius: 14px;
  box-shadow: 0 6px 12px var(--shadow);
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  font-size: 14.5px;
  cursor: pointer;
  transition: 0.2s;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}
.card .icon {
  font-size: 22px;
  margin-top: 3px;
}

body.dark-theme .profile-container {
  background: #1e1e1e;
  color: #f5f5f5;
}
body.dark-theme .back-btn,
body.dark-theme .signout-btn {
  color: #ffffff;
  border-color: #00e676;
}
body.dark-theme .back-btn:hover,
body.dark-theme .signout-btn:hover {
  background-color: #333;
  color: #a8e6cf;
  border-color: #00e676;
}
body.dark-theme .profile-details p {
  color: #ccc;
}
body.dark-theme .label {
  color: #cccccc;
}
body.dark-theme .value {
  color: #ffffff;
}
body.dark-theme .card {
  background: #2a2a2a;
  color: #f5f5f5;
  border-left-color: #00e676;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.3);
}
body.dark-theme .card:hover {
  background: #333333;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.45);
}
body.dark-theme .edit-icon {
  background: #00e676;
  border-color: #2a2a2a;
}
body.dark-theme .section h3 {
  color: #f5f5f5;
}
</style>
