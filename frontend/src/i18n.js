import { createI18n } from 'vue-i18n'

import en from './locales/en.json'
import hi from './locales/hi.json'
import te from './locales/te.json'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    hi,
    te
  }
})

export default i18n
