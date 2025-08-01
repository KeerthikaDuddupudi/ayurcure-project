<!-- ThemeToggle.vue -->
<template>
  <button class="theme-toggle" @click="toggleTheme" :aria-label="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
    <span v-if="isDark" class="icon">🌙</span>
    <span v-else class="icon">🌞</span>
  </button>
</template>

<script>
export default {
  name: "ThemeToggle",
  data() {
    return {
      isDark: false,
    };
  },
  mounted() {
    // Load saved theme from localStorage
    this.isDark = localStorage.getItem("theme") === "dark";
    this.applyTheme();
  },
  methods: {
    toggleTheme() {
      this.isDark = !this.isDark;
      this.applyTheme();
      localStorage.setItem("theme", this.isDark ? "dark" : "light");
    },
    applyTheme() {
      document.body.classList.toggle("dark-theme", this.isDark);
    },
  },
};
</script>

<style scoped>
.theme-toggle {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 26px;
  padding: 6px;
  border-radius: 50%;
  transition: background-color 0.3s ease, transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover {
  background-color: rgba(0, 0, 0, 0.08);
  transform: scale(1.1);
}

.icon {
  display: inline-block;
}

/* Optional: Match dark mode toggle button styles more closely */
body.dark-theme .theme-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
