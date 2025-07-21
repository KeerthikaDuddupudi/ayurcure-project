<template>
  <div class="notify-container">
    <div class="notify-wrapper">
      <h1 class="notify-title" style="margin-top:80px;">Notifications</h1>

      <div class="notify-grid">
        <div
          v-for="(notif, index) in notifications"
          :key="notif._id"
          class="notify-card"
        >
          <div class="notify-image-wrapper">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4086/4086679.png"
              alt="Notification"
              class="notify-image"
            />
            <button @click="removeNotification(index)" class="notify-close">✖</button>
          </div>
          <div class="notify-content">
            <p class="notify-time">{{ formatTime(notif.createdAt || notif.date || notif.time) }}</p>
            <h2 class="notify-heading">New Update</h2>
            <p class="notify-desc">{{ notif.message }}</p>
            <button class="notify-read">Mark as Read</button>
          </div>
        </div>
      </div>

      <div v-if="notifications.length === 0" class="notify-empty">
        No notifications yet.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watchEffect } from 'vue'
import axios from 'axios'

const notifications = ref([])
const email = localStorage.getItem('userEmail')

let interval = null

const fetchNotifications = async () => {
  if (!email) {
    console.warn("⚠️ No user email found in localStorage.")
    return
  }

  try {
    console.log("📧 Fetching notifications for email:", email)
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/notifications/${email}`)
    notifications.value = res.data
    console.log("✅ Fetched notifications:", res.data)
  } catch (err) {
    console.error("❌ Error fetching notifications", err)
  }
}

const removeNotification = (index) => {
  notifications.value.splice(index, 1)
}

const formatTime = (time) => {
  if (!time) return 'N/A'
  return new Date(time).toLocaleString()
}

onMounted(() => {
  if (!email) {
    alert("⚠️ User email not found. Please book an appointment first.")
    return
  }

  fetchNotifications()
  interval = setInterval(fetchNotifications, 10000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>


<style scoped>
/* 🌿 [Style code stays unchanged — your current style is great] */
.notify-container {
  background-color: #f0fdf4;
  min-height: 100vh;
  padding: 2rem 1.5rem;
  font-family: 'Segoe UI', sans-serif;
}
.notify-wrapper {
  max-width: 1280px;
  margin: 0 auto;
}
.notify-title {
  font-size: 37px;
  font-weight: bold;
  color: #15803d;
  text-align: center;
  margin-bottom: 2rem;
}
.notify-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 3rem;
  justify-items: center;
  margin-top: 50px;
  margin-left: 50px;
  margin-right: 50px;
}
.notify-card {
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
.notify-card:hover {
  transform: translateY(-4px) scale(1.03);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.1);
  border: 1px solid #86efac;
}
.notify-image-wrapper {
  position: relative;
}
.notify-image {
  width: 100%;
  height: 210px;
  object-fit: cover;
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
  transition: transform 0.3s ease;
}
.notify-card:hover .notify-image {
  transform: scale(1.025);
}
.notify-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  border-radius: 9999px;
  width: 28px;
  height: 28px;
  font-size: 18px;
  color: #dc2626;
  border: none;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  transition: background 0.2s ease, transform 0.2s ease;
}
.notify-close:hover {
  background-color: #fee2e2;
  transform: scale(1.2);
}
.notify-content {
  padding: 1rem;
}
.notify-time {
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
}
.notify-heading {
  font-size: 1.1rem;
  font-weight: 600;
  color: #047857;
}
.notify-desc {
  font-size: 0.95rem;
  color: #374151;
  margin-top: 0.25rem;
}
.notify-read {
  display: inline-block;
  margin-top: 0.75rem;
  font-size: 0.85rem;
  color: #047857;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
}
.notify-read:hover {
  color: #065f46;
}
.notify-empty {
  text-align: center;
  margin-top: 3rem;
  font-size: 1rem;
  color: #6b7280;
}

/* dark mode */
body.dark-theme .notify-container {
  background-color: #121212;
}
body.dark-theme .notify-title {
  color: #f5f5f5;
}
body.dark-theme .notify-card {
  background-color: #1e1e1e;
  border: 1px solid #333;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.05);
}
body.dark-theme .notify-card:hover {
  border: 1px solid #4ade80;
  box-shadow: 0 8px 18px rgba(255, 255, 255, 0.08);
}
body.dark-theme .notify-time,
body.dark-theme .notify-desc,
body.dark-theme .notify-empty {
  color: #ccc;
}
body.dark-theme .notify-heading {
  color: #34d399;
}
body.dark-theme .notify-close {
  background: #333;
  color: #f87171;
}
body.dark-theme .notify-close:hover {
  background-color: #7f1d1d;
}
body.dark-theme .notify-read {
  color: #4ade80;
}
body.dark-theme .notify-read:hover {
  color: #22c55e;
}
</style>
