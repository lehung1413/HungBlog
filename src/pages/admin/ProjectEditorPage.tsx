import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQueryClient } from '@tanstack/react-query'
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
import { slugify } from '@/lib/utils'
import { upsertProject } from '@/services/posts.service'
import { toast } from '@/hooks/use-toast'
import type { LocalizedText, ProjectStatus } from '@/types/models'
import { supabase } from '@/lib/supabase'

const emptyLocalized = (): LocalizedText => ({ en: '', vi: '' })

export function ProjectEditorPage() {
  const { id } = useParams<{ id: string }>()
  const isNew = id === 'new'
  const { t } = useTranslation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [name, setName] = useState<LocalizedText>(emptyLocalized())
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState<LocalizedText>(emptyLocalized())
  const [role, setRole] = useState<LocalizedText>(emptyLocalized())
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null)
  const [githubUrl, setGithubUrl] = useState('')
  const [demoUrl, setDemoUrl] = useState('')
  const [techStack, setTechStack] = useState('')
  const [status, setStatus] = useState<ProjectStatus>('completed')
  const [featured, setFeatured] = useState(false)
  const [sortOrder, setSortOrder] = useState(0)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (isNew || !id) return

    void (async () => {
      const { data } = await supabase.from('projects').select('*').eq('id', id).single()
      if (!data) return

      setName(data.name as LocalizedText)
      setSlug(data.slug)
      setDescription(data.description as LocalizedText)
      setRole(data.role as LocalizedText)
      setThumbnailUrl(data.thumbnail_url)
      setGithubUrl(data.github_url ?? '')
      setDemoUrl(data.demo_url ?? '')
      setTechStack((data.tech_stack ?? []).join(', '))
      setStatus(data.status)
      setFeatured(data.featured)
      setSortOrder(data.sort_order)
    })()
  }, [id, isNew])

  useEffect(() => {
    if (isNew && name.en && !slug) {
      setSlug(slugify(name.en))
    }
  }, [name.en, isNew, slug])

  const handleSave = async () => {
    if (!slug.trim()) {
      toast({ title: 'Slug is required' })
      return
    }
    setSaving(true)
    try {
      await upsertProject(
        {
          name,
          slug,
          description,
          role,
          thumbnail_url: thumbnailUrl,
          github_url: githubUrl || null,
          demo_url: demoUrl || null,
          tech_stack: techStack.split(',').map((s) => s.trim()).filter(Boolean),
          status,
          featured,
          sort_order: sortOrder,
        },
        isNew ? undefined : id,
      )
      void queryClient.invalidateQueries({ queryKey: ['admin-projects'] })
      toast({ title: 'Project saved' })
      navigate('/admin/projects')
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
          <Button variant="outline" onClick={() => navigate('/admin/projects')}>
            {t('common.cancel')}
          </Button>
          <Button onClick={() => void handleSave()} disabled={saving}>
            {saving ? t('common.loading') : t('common.save')}
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-2xl space-y-4">
        <BilingualField label={t('admin.projectEditor.name')} value={name} onChange={setName} />
        <div>
          <Label>{t('admin.projectEditor.slug')}</Label>
          <Input value={slug} onChange={(e) => setSlug(e.target.value)} className="mt-1" />
        </div>
        <BilingualField label={t('admin.projectEditor.description')} value={description} onChange={setDescription} multiline />
        <BilingualField label={t('admin.projectEditor.role')} value={role} onChange={setRole} />
        <ImageUploader bucket="project-images" value={thumbnailUrl} onChange={setThumbnailUrl} />
        <div>
          <Label>{t('admin.projectEditor.techStack')}</Label>
          <Input value={techStack} onChange={(e) => setTechStack(e.target.value)} placeholder="React, TypeScript, ..." className="mt-1" />
        </div>
        <div>
          <Label>{t('admin.projectEditor.github')}</Label>
          <Input value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label>{t('admin.projectEditor.demo')}</Label>
          <Input value={demoUrl} onChange={(e) => setDemoUrl(e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label>{t('admin.projectEditor.status')}</Label>
          <Select value={status} onValueChange={(v) => setStatus(v as ProjectStatus)}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="completed">{t('projectStatus.completed')}</SelectItem>
              <SelectItem value="in_progress">{t('projectStatus.in_progress')}</SelectItem>
              <SelectItem value="archived">{t('projectStatus.archived')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
            {t('admin.projectEditor.featured')}
          </label>
          <div className="flex items-center gap-2">
            <Label>{t('admin.projectEditor.sortOrder')}</Label>
            <Input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} className="w-20" />
          </div>
        </div>
      </div>
    </>
  )
}
