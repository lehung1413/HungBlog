import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { Seo } from '@/components/Seo'
import { StatsCards } from '@/features/admin/StatsCards'
import { getDashboardStats } from '@/services/posts.service'

export function DashboardPage() {
  const { t } = useTranslation()

  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: getDashboardStats,
  })

  return (
    <>
      <Seo title={t('admin.dashboard')} />
      <h1 className="mb-8 text-3xl font-bold">{t('admin.dashboard')}</h1>
      {isLoading ? (
        <p className="text-muted-foreground">{t('common.loading')}</p>
      ) : stats ? (
        <StatsCards
          stats={stats}
          labels={{
            totalPosts: t('admin.stats.totalPosts'),
            totalProjects: t('admin.stats.totalProjects'),
            draftPosts: t('admin.stats.draftPosts'),
            publishedPosts: t('admin.stats.publishedPosts'),
          }}
        />
      ) : null}
    </>
  )
}
