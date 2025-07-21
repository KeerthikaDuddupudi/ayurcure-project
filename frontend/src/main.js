import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './style.css'

// 🌙 Restore theme on reload
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-theme")
}

// 🚀 Create and mount Vue app in one line
createApp(App).use(router).use(i18n).mount('#app')
