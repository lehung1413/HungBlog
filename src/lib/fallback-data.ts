import { isSupabaseConfigured } from '@/lib/supabase'

/** Use placeholder content when Supabase is missing or returned empty public data. */
export function shouldUseDummyData(): boolean {
  return import.meta.env.VITE_USE_DUMMY_DATA === 'true' || !isSupabaseConfigured
}

export function withFallback<T>(value: T | null | undefined, fallback: T): T {
  if (value === null || value === undefined) return fallback
  if (Array.isArray(value) && value.length === 0) return fallback
  return value
}

export async function queryWithDummy<T>(
  query: () => Promise<T>,
  fallback: T,
  isEmpty?: (result: T) => boolean,
): Promise<T> {
  if (shouldUseDummyData()) return fallback

  try {
    const result = await query()
    if (isEmpty?.(result)) return fallback
    return result
  } catch {
    return fallback
  }
}
