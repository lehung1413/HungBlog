import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Seo } from '@/components/Seo'
import { useLocalized } from '@/hooks/useLocale'
import { getProjects, deleteProject } from '@/services/posts.service'
import { toast } from '@/hooks/use-toast'

export function ProjectsPage() {
  const { t } = useTranslation()
  const { t: localized } = useLocalized()
  const queryClient = useQueryClient()

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: () => getProjects(),
  })

  const handleDelete = async (id: string) => {
    if (!confirm(t('common.confirmDelete'))) return
    try {
      await deleteProject(id)
      void queryClient.invalidateQueries({ queryKey: ['admin-projects'] })
      toast({ title: 'Project deleted' })
    } catch {
      toast({ title: t('common.error') })
    }
  }

  return (
    <>
      <Seo title={t('admin.projects')} />
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t('admin.projects')}</h1>
        <Button asChild>
          <Link to="/admin/projects/new">
            <Plus className="h-4 w-4" />
            {t('common.create')}
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">{t('common.loading')}</p>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
            >
              <div>
                <p className="font-medium">{localized(project.name)}</p>
                <p className="text-sm text-muted-foreground">
                  {project.featured ? '★ Featured' : ''} · /{project.slug}
                </p>
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline" size="icon">
                  <Link to={`/admin/projects/${project.id}`}>
                    <Pencil className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="destructive" size="icon" onClick={() => void handleDelete(project.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
