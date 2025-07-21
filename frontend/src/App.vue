<template>
  <div id="app">
    <!-- Show NavBar only if not on landing page or auth routes -->
    <NavBar v-if="showNavBar" />
    
    <router-view />
    
    <Footer />
  </div>
</template>

<script>
import { io } from "socket.io-client";
import { useRoute } from "vue-router";
import { computed } from "vue";

import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    Footer
  },
  setup() {
    const route = useRoute();

    // Hide NavBar on landing page ('/') and any '/auth' route
    const showNavBar = computed(() => {
      return route.path !== '/' && !route.path.startsWith('/auth');
    });

    return {
      showNavBar
    };
  },
  mounted() {
    // Connect to Socket.IO server
    this.socket = io(import.meta.env.VITE_API_URL || "http://localhost:5000");

    // Listen for 'appointmentConfirmed' event
    this.socket.on("appointmentConfirmed", (data) => {
      console.log("📩 Appointment Confirmed:", data);
      alert(`Your appointment with Dr. ${data.doctorName} is confirmed for ${data.timeSlot}`);
    });
  },
  beforeUnmount() {
    // Clean up socket connection
    if (this.socket) {
      this.socket.disconnect();
    }
  }
};
</script>

<style>
body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f9f9f9;
}
</style>
