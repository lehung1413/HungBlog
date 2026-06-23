import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase = createClient<Database>(
  supabaseUrl ?? 'https://placeholder.supabase.co',
  supabaseAnonKey ?? 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  },
)

export const adminEmail = import.meta.env.VITE_ADMIN_EMAIL ?? ''
export const siteUrl = import.meta.env.VITE_SITE_URL ?? 'http://localhost:5173'
export const defaultLocale = import.meta.env.VITE_DEFAULT_LOCALE ?? 'en'
