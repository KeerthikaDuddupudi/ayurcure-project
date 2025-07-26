<template>
  <div>
    <nav class="navbar">
      <div class="navbar-left">
        <span class="logo" @click="$router.push('/')">
          Ayur<span class="highlight">Cure</span>
        </span>
      </div>

      <div class="right-controls">
        <ThemeToggle />
        <LanguageSelectors />
      </div>
    </nav>
  </div>
</template>

<script>
import ThemeToggle from './ThemeToggle.vue'
import LanguageSelectors from './LanguageSelectors.vue'

export default {
  name: 'HomeNav',
  components: {
    ThemeToggle,
    LanguageSelectors
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
  left: 0;
  right: 0;
  z-index: 9999;
  width: 100%;
  height: 64px;
  background: #124c33;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.navbar-left {
  display: flex;
  align-items: center;
}

.right-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-right: 1rem;
}

.logo {
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s ease;
}

.logo .highlight {
  color: #a8e6cf;
}
</style>