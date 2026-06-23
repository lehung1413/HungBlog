import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { isLocale, type Locale } from '@/lib/i18n'
import { getLocalizedContent } from '@/lib/utils'
import type { LocalizedText } from '@/types/models'

export function useLocale(): Locale {
  const { lang } = useParams<{ lang: string }>()
  return lang && isLocale(lang) ? lang : 'en'
}

export function useLocalizedPath() {
  const locale = useLocale()
  const navigate = useNavigate()
  const location = useLocation()

  const localizedPath = (path: string) => {
    const clean = path.startsWith('/') ? path : `/${path}`
    return `/${locale}${clean === '/' ? '' : clean}`
  }

  const switchLocale = (newLocale: Locale) => {
    const segments = location.pathname.split('/').filter(Boolean)
    if (segments.length > 0 && isLocale(segments[0])) {
      segments[0] = newLocale
    } else {
      segments.unshift(newLocale)
    }
    const newPath = `/${segments.join('/')}${location.search}`
    navigate(newPath)
  }

  return { locale, localizedPath, switchLocale }
}

export function useLocalized() {
  const locale = useLocale()

  return {
    locale,
    t: (value: LocalizedText | null | undefined) => getLocalizedContent(value, locale),
  }
}

export function useSyncI18n() {
  const locale = useLocale()
  const { i18n } = useTranslation()

  if (i18n.language !== locale) {
    void i18n.changeLanguage(locale)
  }
}
