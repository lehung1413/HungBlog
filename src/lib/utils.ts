import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function formatDate(date: string | Date, locale: string): string {
  return new Intl.DateTimeFormat(locale === 'vi' ? 'vi-VN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

export function getLocalizedContent(
  value: Record<string, string> | string | null | undefined,
  locale: string,
): string {
  if (!value) return ''
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value) as Record<string, string>
      return parsed[locale] ?? parsed.en ?? ''
    } catch {
      return value
    }
  }
  return value[locale] ?? value.en ?? ''
}
