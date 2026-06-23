import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { AdminLayout } from '@/features/admin/AdminLayout'
import { defaultLocale } from '@/lib/supabase'
import { isLocale } from '@/lib/i18n'

const HomePage = lazy(() => import('@/pages/public/HomePage').then((m) => ({ default: m.HomePage })))
const PortfolioPage = lazy(() => import('@/pages/public/PortfolioPage').then((m) => ({ default: m.PortfolioPage })))
const BlogPage = lazy(() => import('@/pages/public/BlogPage').then((m) => ({ default: m.BlogPage })))
const BlogDetailPage = lazy(() => import('@/pages/public/BlogDetailPage').then((m) => ({ default: m.BlogDetailPage })))
const ContactPage = lazy(() => import('@/pages/public/ContactPage').then((m) => ({ default: m.ContactPage })))
const LoginPage = lazy(() => import('@/pages/admin/LoginPage').then((m) => ({ default: m.LoginPage })))
const DashboardPage = lazy(() => import('@/pages/admin/DashboardPage').then((m) => ({ default: m.DashboardPage })))
const PostsPage = lazy(() => import('@/pages/admin/PostsPage').then((m) => ({ default: m.PostsPage })))
const PostEditorPage = lazy(() => import('@/pages/admin/PostEditorPage').then((m) => ({ default: m.PostEditorPage })))
const ProjectsPage = lazy(() => import('@/pages/admin/ProjectsPage').then((m) => ({ default: m.ProjectsPage })))
const ProjectEditorPage = lazy(() => import('@/pages/admin/ProjectEditorPage').then((m) => ({ default: m.ProjectEditorPage })))
const SettingsPage = lazy(() => import('@/pages/admin/SettingsPage').then((m) => ({ default: m.SettingsPage })))

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
    </div>
  )
}

function SuspenseWrap({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>
}

function LocaleRedirect() {
  const path = window.location.pathname
  const segments = path.split('/').filter(Boolean)
  if (segments.length > 0 && isLocale(segments[0])) {
    return <Outlet />
  }
  const rest = path === '/' ? '' : path
  return <Navigate to={`/${defaultLocale}${rest}`} replace />
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LocaleRedirect />,
    children: [
      {
        path: ':lang',
        element: <PublicLayout />,
        children: [
          { index: true, element: <SuspenseWrap><HomePage /></SuspenseWrap> },
          { path: 'portfolio', element: <SuspenseWrap><PortfolioPage /></SuspenseWrap> },
          { path: 'blog', element: <SuspenseWrap><BlogPage /></SuspenseWrap> },
          { path: 'blog/:slug', element: <SuspenseWrap><BlogDetailPage /></SuspenseWrap> },
          { path: 'contact', element: <SuspenseWrap><ContactPage /></SuspenseWrap> },
        ],
      },
    ],
  },
  {
    path: '/admin/login',
    element: <SuspenseWrap><LoginPage /></SuspenseWrap>,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <SuspenseWrap><DashboardPage /></SuspenseWrap> },
      { path: 'posts', element: <SuspenseWrap><PostsPage /></SuspenseWrap> },
      { path: 'posts/:id', element: <SuspenseWrap><PostEditorPage /></SuspenseWrap> },
      { path: 'projects', element: <SuspenseWrap><ProjectsPage /></SuspenseWrap> },
      { path: 'projects/:id', element: <SuspenseWrap><ProjectEditorPage /></SuspenseWrap> },
      { path: 'settings', element: <SuspenseWrap><SettingsPage /></SuspenseWrap> },
    ],
  },
  { path: '*', element: <Navigate to={`/${defaultLocale}`} replace /> },
])
