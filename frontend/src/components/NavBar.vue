<template>
  <div>
    <!-- NAVBAR -->
    <nav class="navbar">
      <div class="navbar-left">
        <button class="menu-btn" @click="toggleMenu">☰</button>
        <span class="logo" @click="$router.push('/')">
          Ayur<span class="highlight">Cure</span>
        </span>
      </div>

      <div class="right-controls">
        <ThemeToggle />
        <LanguageSelectors />

        <!-- 🔔 Notifications -->
        <div class="dropdown-wrapper">
          <button class="icon-btn" @click="toggleNotifications" title="Notifications">
            🔔
            <span v-if="unreadCount > 0" class="notif-badge">{{ unreadCount }}</span>
          </button>

          <div v-if="showNotifications" class="notification-dropdown">
            <div class="notif-header">
              <h3 class="dropdown-title">Notifications</h3>
              <div>
                <button @click="fetchNotifications" class="refresh-btn">🔁</button>
                <button class="close-notif-btn" @click="showNotifications = false">✕</button>
              </div>
            </div>

            <div class="notif-scroll">
              <div v-for="(notif, index) in notifications" :key="index" class="notif-card">
                <div class="notif-time">{{ notif.time }}</div>
                <div class="notif-icon">{{ notif.icon }}</div>
                <h4 class="notif-title">{{ notif.title }}</h4>
                <p class="notif-desc">{{ notif.description }}</p>
                <a :href="notif.link" class="notif-cta">{{ notif.cta }}</a>
              </div>
              <div v-if="notifications.length === 0" style="text-align:center; color:#888;">
                No notifications yet.
              </div>
            </div>
          </div>
        </div>

        <!-- 👤 Profile -->
        <div class="dropdown-wrapper profile-wrapper">
          <img
            class="profile-avatar"
            :src="profileImage || defaultAvatar"
            alt="User Avatar"
            @click="toggleProfile"
          />
          <div v-if="showProfile" class="dropdown profile-dropdown">
            <UserProfile @close="showProfile = false" />
          </div>
        </div>
      </div>
    </nav>

    <!-- SIDEBAR -->
    <transition name="slide-left">
      <aside class="sidebar" v-if="isOpen">
        <div class="sidebar-header">
          <span class="sidebar-logo">Ayur<span class="highlight">Cure</span></span>
          <button class="close-btn" @click="toggleMenu">✕</button>
        </div>
        <ul class="sidebar-menu">
          <li><router-link to="/home" @click="toggleMenu">🏠 {{ $t('navbar.home') }}</router-link></li>
          <li><router-link to="/remedies" @click="toggleMenu">🌿 {{ $t('navbar.remedies') }}</router-link></li>
          <li><router-link to="/doctors" @click="toggleMenu">👨‍⚕️ {{ $t('navbar.doctors') }}</router-link></li>
          <li><router-link to="/contact" @click="toggleMenu">📞 {{ $t('contact') }}</router-link></li>
        </ul>
      </aside>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import ThemeToggle from './ThemeToggle.vue'
import LanguageSelectors from './LanguageSelectors.vue'
import UserProfile from '../views/Dashboard.vue'

export default {
  name: 'NavBar',
  components: { ThemeToggle, LanguageSelectors, UserProfile },
  setup() {
    const isOpen = ref(false)
    const showNotifications = ref(false)
    const showProfile = ref(false)
    const profileImage = ref(localStorage.getItem('profileImage'))
    const defaultAvatar = 'https://www.w3schools.com/howto/img_avatar.png'
    const notifications = ref([])
    const unreadCount = ref(0)

    // Function to customize notification look
    const enhanceNotification = (notif) => {
      let icon = '🔔'
      let title = 'Notification'
      let link = '/'
      let cta = 'View Details'

      const message = notif.message.toLowerCase()

      if (message.includes('remedy')) {
        icon = '🌿'
        title = 'New Remedy Saved'
        link = '/saved-remedies'
        cta = 'View Remedy'
      } else if (message.includes('appointment')) {
        icon = '📅'
        title = 'Appointment Reminder'
        link = '/appointments'
        cta = 'View Appointment'
      } else if (message.includes('cancel')) {
        icon = '❌'
        title = 'Appointment Cancelled'
        link = '/appointments'
        cta = 'View Cancellation'
      }

      return {
        icon,
        time: new Date(notif.createdAt).toLocaleString(),
        title,
        description: notif.message,
        link,
        cta
      }
    }

    // Fetch notifications from backend
    const fetchNotifications = async () => {
      const email = localStorage.getItem('userEmail')
      if (!email) return

      try {
        const res = await axios.get(`http://localhost:5000/api/notifications/${email}`)
        notifications.value = [...res.data].reverse().map(enhanceNotification)

        unreadCount.value = notifications.value.length
      } catch (err) {
        console.error("❌ Error fetching notifications:", err)
      }
    }

    const syncProfileImage = () => {
      profileImage.value = localStorage.getItem('profileImage')
    }

    const toggleMenu = () => isOpen.value = !isOpen.value
    const toggleNotifications = () => {
      showNotifications.value = !showNotifications.value
      showProfile.value = false
      if (showNotifications.value) fetchNotifications()
    }
    const toggleProfile = () => {
      showProfile.value = !showProfile.value
      showNotifications.value = false
    }

    onMounted(() => {
      window.addEventListener('storage', syncProfileImage)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('storage', syncProfileImage)
    })

    return {
      isOpen,
      showNotifications,
      showProfile,
      profileImage,
      defaultAvatar,
      notifications,
      unreadCount,
      toggleMenu,
      toggleNotifications,
      toggleProfile,
      fetchNotifications
    }
  }
}
</script>




<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@500;700&display=swap');

* {
  font-family: 'Quicksand', sans-serif;
  box-sizing: border-box;
}

.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  height: 64px;
  background: #124c33;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.right-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-right: 1rem;
}

.menu-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
}

.logo {
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s ease;
}

.logo .highlight,
.sidebar-logo .highlight {
  color: #a8e6cf;
}
.notif-icon {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 0.5rem;
}

/* Sidebar */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  height: 100vh;
  background: #1f4037;
  color: white;
  padding: 1rem;
  z-index: 999;
  box-shadow: 3px 0 12px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar-logo {
  font-size: 1.4rem;
  font-weight: bold;
}

.close-btn {
  background: transparent;
  border: none;
  color: #ffaaaa;
  font-size: 1.5rem;
  cursor: pointer;
}

.sidebar-menu {
  list-style: none;
  padding: 1.5rem 0 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
}

.sidebar-menu li a {
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.sidebar-menu li a:hover {
  color: #a8e6cf;
  transform: translateX(5px);
}

/* Transitions */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease;
}
.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
}

/* Icon Buttons */
.icon-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 1.4rem;
  cursor: pointer;
  transition: transform 0.2s ease, color 0.3s ease;
}
.icon-btn:hover {
  color: #a8e6cf;
  transform: scale(1.1);
}

/* Dropdowns */
.dropdown-wrapper {
  position: relative;
  margin-right:0px;
}
.dropdown {
  position: absolute;
  top: 50px;
  right: 0;
  background-color: white;
  color: #124c33;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 200px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 999;
  padding: 10px 0;
  animation: dropdown-fade 0.3s ease;
}
.dropdown-item {
  display: block;
  padding: 10px 20px;
  font-size: 14px;
  text-decoration: none;
  color: #124c33;
  transition: background 0.3s ease;
}
.dropdown-item:hover {
  background-color: #f1f8e9;
}

/* Full Profile Dropdown */
.profile-dropdown {
  width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 0;
  border-radius: 14px;
  background-color: #dcf2e1;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 50px;
  right: 0;
  z-index: 2000;
}

.profile-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #a8e6cf;
  object-fit: cover;
}

/* Notification Dropdown */
.notification-dropdown {
  position: absolute;
  top: 50px;
  right: 0;
  width: 360px;
  max-height: 80vh;
  background: #ffffff;
  color: #124c33;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  overflow-y: auto;
  z-index: 1500;
  animation: dropdown-fade 0.3s ease;
  padding: 0.75rem;
}

.notif-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.dropdown-title {
  font-weight: 700;
  font-size: 16px;
  color: #124c33;
}

.close-notif-btn {
  background: transparent;
  border: none;
  font-size: 1.2rem;
  color: #888;
  cursor: pointer;
}

.notif-scroll {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.notif-card {
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 0.75rem;
  background: #f8fff8;
}

.notif-time {
  font-size: 0.8rem;
  color: #888;
  margin-bottom: 4px;
}

.notif-image {
  width: 100%;
  border-radius: 8px;
  margin: 0.5rem 0;
}

.notif-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.notif-desc {
  font-size: 0.875rem;
  margin-bottom: 6px;
}

.notif-cta {
  font-weight: bold;
  font-size: 0.85rem;
  color: #0b6d3c;
  text-decoration: underline;
}
.notif-cta:hover {
  text-decoration: none;
}

@keyframes dropdown-fade {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 🌙 DARK THEME STYLES */


body.dark-theme .logo,
body.dark-theme .menu-btn,
body.dark-theme .icon-btn {
  color: #f5f5f5;
}

body.dark-theme .logo .highlight,
body.dark-theme .sidebar-logo .highlight {
  color: #7bed9f;
}

body.dark-theme .sidebar {
  background: #121212;
  color: #e0e0e0;
  box-shadow: 3px 0 12px rgba(255, 255, 255, 0.1);
}

body.dark-theme .sidebar-menu li a {
  color: #f5f5f5;
}
body.dark-theme .sidebar-menu li a:hover {
  color: #7bed9f;
}

body.dark-theme .dropdown,
body.dark-theme .notification-dropdown,
body.dark-theme .profile-dropdown {
  background-color: #1e1e1e;
  color: #f5f5f5;
  border: 1px solid #333;
  box-shadow: 0 8px 20px rgba(255, 255, 255, 0.05);
}

body.dark-theme .dropdown-title,
body.dark-theme .notif-title {
  color: #a0f0c0;
}

body.dark-theme .dropdown-item {
  color: #f5f5f5;
}
body.dark-theme .dropdown-item:hover {
  background-color: #2c2c2c;
}

body.dark-theme .notif-card {
  background: #232323;
  border: 1px solid #333;
}

body.dark-theme .notif-time,
body.dark-theme .notif-desc {
  color: #ccc;
}

body.dark-theme .notif-cta {
  color: #76f5c4;
}

body.dark-theme .profile-dropdown {
  background-color: #222;
}

body.dark-theme .close-notif-btn {
  color: #aaa;
}

body.dark-theme .profile-avatar {
  border-color: #76f5c4;
}
.notif-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background: red;
  color: white;
  font-size: 11px;
  border-radius: 50%;
  padding: 2px 6px;
  font-weight: bold;
}

/* Refresh Button Styling */
.refresh-btn {
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #124c33;
  margin-right: 0.5rem;
}

.refresh-btn:hover {
  color: #0b6d3c;
}

body.dark-theme .refresh-btn {
  color: #ccc;
}
body.dark-theme .refresh-btn:hover {
  color: #76f5c4;
}
</style>
