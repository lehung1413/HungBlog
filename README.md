# HungBlog

A modern bilingual (EN/VI) personal Portfolio + Blog built with React, TypeScript, TailwindCSS, and Supabase. Deployed on Vercel free tier.

## Tech Stack

- **Frontend:** Vite + React 19 + TypeScript + TailwindCSS + shadcn/ui
- **Backend:** Supabase (Auth, PostgreSQL, Storage)
- **Deployment:** Vercel
- **Analytics:** Vercel Analytics
- **Comments:** Giscus
- **Contact:** EmailJS

## Getting Started

### Prerequisites

- Node.js 20+
- Supabase account (free)
- Vercel account (free)

### 1. Clone and install

```bash
git clone https://github.com/lehung1413/HungBlog.git
cd HungBlog
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

### 3. Set up Supabase

1. Create a project at [supabase.com/dashboard](https://supabase.com/dashboard)
2. Run migrations from `supabase/migrations/` via SQL Editor or CLI:

```bash
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase db push
```

3. Run seed data: paste `supabase/seed.sql` in SQL Editor
4. Create storage buckets (or use migration): `avatars`, `blog-images`, `project-images` (all public)
5. Enable Email auth in Authentication settings
6. Add admin user in Authentication → Users
7. Promote admin:

```sql
UPDATE profiles SET is_admin = true WHERE id = 'YOUR_USER_UUID';
```

### 4. Run locally

```bash
npm run dev
```

Visit `http://localhost:5173/en` or `http://localhost:5173/vi`

## Project Structure

```
src/
├── app/           # Router, providers, App shell
├── pages/         # Route pages (public + admin)
├── components/    # UI primitives and layout
├── features/      # Domain components
├── services/      # Supabase data access
├── hooks/         # React hooks
├── lib/           # Utilities, i18n, supabase client
├── types/         # TypeScript types
└── locales/       # UI translations (en.json, vi.json)
```

## Admin

- URL: `/admin/login`
- Only the email matching `VITE_ADMIN_EMAIL` can be promoted to admin
- Single-admin enforced at DB level via trigger

## Deployment (Vercel)

1. Push to GitHub
2. Import project in Vercel (Framework: Vite)
3. Add all `VITE_*` environment variables
4. Deploy
5. Add production URL to Supabase Auth redirect URLs
6. Enable Vercel Analytics in project settings

## Optional Services

### EmailJS

1. Create account at [emailjs.com](https://www.emailjs.com)
2. Set up service + template with `{{from_name}}`, `{{from_email}}`, `{{message}}`
3. Add IDs to `.env.local`

### Giscus

1. Enable Discussions on your GitHub repo
2. Configure at [giscus.app](https://giscus.app)
3. Add repo/category IDs to `.env.local`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build + sitemap |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## License

MIT
