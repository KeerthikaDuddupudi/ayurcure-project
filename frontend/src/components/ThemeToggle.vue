<!-- ThemeToggle.vue -->
<template>
  <label class="switch">
    <input type="checkbox" v-model="isDark" @change="toggleTheme" />
    <span class="slider"></span>
  </label>
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
.switch {
  position: relative;
  display: inline-block;
  width: 42px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  background-color: #ccc;
  border-radius: 34px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: 0.4s;
}

.slider:before {
  content: "";
  height: 18px;
  width: 18px;
  position: absolute;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #66bb6a;
}

input:checked + .slider:before {
  transform: translateX(18px);
}
body.dark-theme {
  background-color: #121212;
  color: #f5f5f5;
}

body.dark-theme a {
  color: #a8e6cf;
}

</style>
