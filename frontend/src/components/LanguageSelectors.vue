<template>
  <div class="language-dropdown">
    <button @click="toggleDropdown" class="lang-btn" aria-label="Select Language">
      🌐
    </button>
    <div v-if="open" class="dropdown">
      <button
        v-for="(langName, langCode) in languages"
        :key="langCode"
        @click="selectLanguage(langCode)"
        :class="{ selected: current === langCode }"
      >
        {{ langName }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LanguageSelectors',
  data() {
    return {
      open: false,
      current: localStorage.getItem('lang') || 'en',
      languages: {
        en: "English",
        hi: "हिंदी",
        te: "తెలుగు",
      },
    };
  },
  methods: {
    toggleDropdown() {
      this.open = !this.open;
    },
    selectLanguage(code) {
      this.current = code;
      localStorage.setItem('lang', code);
      this.$i18n.locale = code;
      this.open = false;
    },
  },
};
</script>

<style scoped>
.language-dropdown {
  position: relative;
}

.lang-btn {
  font-size: 1.8rem; /* 🌐 size */
  background: transparent;
  border: none;
  cursor: pointer;
  color: white;
  transition: transform 0.2s ease;
}

.lang-btn:hover {
  transform: scale(1.15);
}

/* Dropdown Styling */
.dropdown {
  position: absolute;
  top: 120%; /* ⬇ below the navbar */
  right: 0;
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  padding: 0.8rem 0.6rem;
  z-index: 1001;
  min-width: 180px;
}

.dropdown button {
  width: 100%;
  padding: 10px 14px;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  background: transparent;
  border: none;
  text-align: left;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  color: #333;
}

.dropdown button:hover {
  background-color: #f0fdf4;
}

.selected {
  background-color: #dcfce7;
  font-weight: bold;
  color: #124c33;
}
</style>
