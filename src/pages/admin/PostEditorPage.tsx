import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import MDEditor from '@uiw/react-md-editor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Seo } from '@/components/Seo'
import { BilingualField } from '@/features/admin/BilingualField'
import { ImageUploader } from '@/features/admin/ImageUploader'
import { MarkdownContent } from '@/features/blog/MarkdownContent'
import { slugify } from '@/lib/utils'
import {
  getCategories,
  getTags,
  upsertPost,
} from '@/services/posts.service'
import { toast } from '@/hooks/use-toast'
import type { LocalizedText, PostStatus } from '@/types/models'
import { supabase } from '@/lib/supabase'

const emptyLocalized = (): LocalizedText => ({ en: '', vi: '' })

export function PostEditorPage() {
  const { id } = useParams<{ id: string }>()
  const isNew = id === 'new'
  const { t } = useTranslation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [title, setTitle] = useState<LocalizedText>(emptyLocalized())
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState<LocalizedText>(emptyLocalized())
  const [content, setContent] = useState<LocalizedText>(emptyLocalized())
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null)
  const [categoryId, setCategoryId] = useState<string>('')
  const [tagIds, setTagIds] = useState<string[]>([])
  const [status, setStatus] = useState<PostStatus>('draft')
  const [contentLang, setContentLang] = useState<'en' | 'vi'>('en')
  const [saving, setSaving] = useState(false)

  const { data: categories = [] } = useQuery({ queryKey: ['categories'], queryFn: getCategories })
  const { data: tags = [] } = useQuery({ queryKey: ['tags'], queryFn: getTags })

  useEffect(() => {
    if (isNew || !id) return

    void (async () => {
      const { data } = await supabase.from('posts').select('*').eq('id', id).single()
      if (!data) return

      setTitle(data.title as LocalizedText)
      setSlug(data.slug)
      setExcerpt(data.excerpt as LocalizedText)
      setContent(data.content as LocalizedText)
      setThumbnailUrl(data.thumbnail_url)
      setCategoryId(data.category_id ?? '')
      setStatus(data.status)

      const { data: postTags } = await supabase.from('post_tags').select('tag_id').eq('post_id', id)
      setTagIds((postTags ?? []).map((pt) => pt.tag_id))
    })()
  }, [id, isNew])

  useEffect(() => {
    if (isNew && title.en && !slug) {
      setSlug(slugify(title.en))
    }
  }, [title.en, isNew, slug])

  const toggleTag = (tagId: string) => {
    setTagIds((prev) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId],
    )
  }

  const handleSave = async () => {
    if (!slug.trim()) {
      toast({ title: 'Slug is required' })
      return
    }
    setSaving(true)
    try {
      await upsertPost(
        {
          title,
          slug,
          excerpt,
          content,
          thumbnail_url: thumbnailUrl,
          category_id: categoryId || null,
          status,
          tagIds,
        },
        isNew ? undefined : id,
      )
      void queryClient.invalidateQueries({ queryKey: ['admin-posts'] })
      toast({ title: 'Post saved' })
      navigate('/admin/posts')
    } catch (err) {
      toast({ title: t('common.error'), description: err instanceof Error ? err.message : undefined })
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <Seo title={isNew ? t('common.create') : t('common.edit')} />
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{isNew ? t('common.create') : t('common.edit')}</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/admin/posts')}>
            {t('common.cancel')}
          </Button>
          <Button onClick={() => void handleSave()} disabled={saving}>
            {saving ? t('common.loading') : t('common.save')}
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <BilingualField label={t('admin.postEditor.title')} value={title} onChange={setTitle} />
          <div>
            <Label>{t('admin.postEditor.slug')}</Label>
            <Input value={slug} onChange={(e) => setSlug(e.target.value)} className="mt-1" />
          </div>
          <BilingualField label={t('admin.postEditor.excerpt')} value={excerpt} onChange={setExcerpt} multiline />
          <ImageUploader bucket="blog-images" value={thumbnailUrl} onChange={setThumbnailUrl} label={t('admin.postEditor.thumbnail')} />

          <div>
            <Label>{t('admin.postEditor.category')}</Label>
            <Select value={categoryId || 'none'} onValueChange={(v) => setCategoryId(v === 'none' ? '' : v)}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">—</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.name.en}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>{t('admin.postEditor.tags')}</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => toggleTag(tag.id)}
                  className={`rounded-full border px-3 py-1 text-xs ${
                    tagIds.includes(tag.id) ? 'border-accent bg-accent/10 text-accent' : 'border-border'
                  }`}
                >
                  {tag.name.en}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label>{t('admin.postEditor.status')}</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as PostStatus)}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">{t('common.draft')}</SelectItem>
                <SelectItem value="published">{t('common.published')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="mb-2 flex gap-2">
              <Button type="button" variant={contentLang === 'en' ? 'default' : 'outline'} size="sm" onClick={() => setContentLang('en')}>EN</Button>
              <Button type="button" variant={contentLang === 'vi' ? 'default' : 'outline'} size="sm" onClick={() => setContentLang('vi')}>VI</Button>
            </div>
            <Label>{t('admin.postEditor.content')}</Label>
            <div className="mt-1" data-color-mode="dark">
              <MDEditor
                value={content[contentLang]}
                onChange={(v) => setContent({ ...content, [contentLang]: v ?? '' })}
                height={400}
              />
            </div>
          </div>
        </div>

        <div>
          <Label>{t('admin.postEditor.preview')}</Label>
          <div className="mt-2 rounded-lg border border-border bg-card p-6">
            <MarkdownContent content={content[contentLang]} />
          </div>
        </div>
      </div>
    </>
  )
}
