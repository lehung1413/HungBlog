import type { LocalizedText } from '@/types/models'

export function parseLocalized(value: unknown): LocalizedText {
  if (!value || typeof value !== 'object') {
    return { en: '', vi: '' }
  }
  const obj = value as Record<string, string>
  return {
    en: obj.en ?? '',
    vi: obj.vi ?? '',
  }
}

export function parseLocalizedArray(value: unknown): LocalizedText[] {
  if (!Array.isArray(value)) return []
  return value.map((item) => parseLocalized(item))
}

export function toLocalizedJson(text: LocalizedText): LocalizedText {
  return { en: text.en, vi: text.vi }
}
