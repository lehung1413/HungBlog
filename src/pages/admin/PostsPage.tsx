import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Seo } from '@/components/Seo'
import { useLocalized } from '@/hooks/useLocale'
import { getPosts, deletePost } from '@/services/posts.service'
import { toast } from '@/hooks/use-toast'
import { useQueryClient } from '@tanstack/react-query'

export function PostsPage() {
  const { t } = useTranslation()
  const { t: localized } = useLocalized()
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['admin-posts'],
    queryFn: () => getPosts({ pageSize: 100 }, true),
  })

  const handleDelete = async (id: string) => {
    if (!confirm(t('common.confirmDelete'))) return
    try {
      await deletePost(id)
      void queryClient.invalidateQueries({ queryKey: ['admin-posts'] })
      toast({ title: 'Post deleted' })
    } catch {
      toast({ title: t('common.error') })
    }
  }

  return (
    <>
      <Seo title={t('admin.posts')} />
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t('admin.posts')}</h1>
        <Button asChild>
          <Link to="/admin/posts/new">
            <Plus className="h-4 w-4" />
            {t('common.create')}
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">{t('common.loading')}</p>
      ) : (
        <div className="space-y-3">
          {data?.posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
            >
              <div>
                <p className="font-medium">{localized(post.title)}</p>
                <p className="text-sm text-muted-foreground">
                  {post.status === 'published' ? t('common.published') : t('common.draft')} · /{post.slug}
                </p>
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline" size="icon">
                  <Link to={`/admin/posts/${post.id}`}>
                    <Pencil className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="destructive" size="icon" onClick={() => void handleDelete(post.id)}>
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
