import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './en.json'
import sr from './sr.json'

export const languages = ['sr', 'en'] as const
export type Language = (typeof languages)[number]

export const STORAGE_KEY = 'luft.lang'

function initialLanguage(): Language {
  if (typeof window === 'undefined') return 'sr'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return languages.includes(stored as Language) ? (stored as Language) : 'sr'
}

void i18n.use(initReactI18next).init({
  resources: {
    sr: { translation: sr },
    en: { translation: en },
  },
  lng: initialLanguage(),
  fallbackLng: 'sr',
  interpolation: { escapeValue: false },
})

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng
  try {
    window.localStorage.setItem(STORAGE_KEY, lng)
  } catch {
    // Private-mode browsers can refuse storage; the toggle still works per-session.
  }
})

document.documentElement.lang = i18n.language

export default i18n
