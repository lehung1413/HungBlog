import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '@/locales/en.json'
import vi from '@/locales/vi.json'
import { defaultLocale } from '@/lib/supabase'

export const supportedLocales = ['en', 'vi'] as const
export type Locale = (typeof supportedLocales)[number]

export function isLocale(value: string): value is Locale {
  return supportedLocales.includes(value as Locale)
}

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    vi: { translation: vi },
  },
  lng: defaultLocale,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export default i18n
