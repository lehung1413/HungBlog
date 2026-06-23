// Placeholder for vite env types
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_ADMIN_EMAIL: string
  readonly VITE_SITE_URL: string
  readonly VITE_DEFAULT_LOCALE: string
  readonly VITE_EMAILJS_SERVICE_ID: string
  readonly VITE_EMAILJS_TEMPLATE_ID: string
  readonly VITE_EMAILJS_PUBLIC_KEY: string
  readonly VITE_GISCUS_REPO: string
  readonly VITE_GISCUS_REPO_ID: string
  readonly VITE_GISCUS_CATEGORY_ID: string
  readonly VITE_GISCUS_CATEGORY: string
  readonly VITE_USE_DUMMY_DATA?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
