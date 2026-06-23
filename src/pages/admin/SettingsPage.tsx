import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Seo } from '@/components/Seo'
import { BilingualField } from '@/features/admin/BilingualField'
import { getHeroSettings, getSocialLinks, updateSettings } from '@/services/posts.service'
import { toast } from '@/hooks/use-toast'
import type { LocalizedText, SocialLinks } from '@/types/models'

const emptyLocalized = (): LocalizedText => ({ en: '', vi: '' })

export function SettingsPage() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const [heroTitle, setHeroTitle] = useState<LocalizedText>(emptyLocalized())
  const [heroDescription, setHeroDescription] = useState<LocalizedText>(emptyLocalized())
  const [resumeUrl, setResumeUrl] = useState('')
  const [social, setSocial] = useState<SocialLinks>({})
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    void (async () => {
      try {
        const [hero, socialLinks] = await Promise.all([getHeroSettings(), getSocialLinks()])
        setHeroTitle(hero.title)
        setHeroDescription(hero.description)
        setResumeUrl(hero.resume_url ?? '')
        setSocial(socialLinks)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateSettings('hero', {
        title: heroTitle,
        description: heroDescription,
        resume_url: resumeUrl,
      })
      await updateSettings('social', social)
      void queryClient.invalidateQueries({ queryKey: ['hero'] })
      void queryClient.invalidateQueries({ queryKey: ['social'] })
      toast({ title: 'Settings saved' })
    } catch {
      toast({ title: t('common.error') })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="text-muted-foreground">{t('common.loading')}</p>
  }

  return (
    <>
      <Seo title={t('admin.settings')} />
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t('admin.settings')}</h1>
        <Button onClick={() => void handleSave()} disabled={saving}>
          {saving ? t('common.loading') : t('common.save')}
        </Button>
      </div>

      <div className="mx-auto max-w-2xl space-y-6">
        <BilingualField label={t('admin.settingsForm.heroTitle')} value={heroTitle} onChange={setHeroTitle} />
        <BilingualField label={t('admin.settingsForm.heroDescription')} value={heroDescription} onChange={setHeroDescription} multiline />
        <div>
          <Label>{t('admin.settingsForm.resumeUrl')}</Label>
          <Input value={resumeUrl} onChange={(e) => setResumeUrl(e.target.value)} className="mt-1" />
        </div>

        <h2 className="text-xl font-semibold">{t('admin.settingsForm.socialLinks')}</h2>
        <div>
          <Label>GitHub</Label>
          <Input value={social.github ?? ''} onChange={(e) => setSocial({ ...social, github: e.target.value })} className="mt-1" />
        </div>
        <div>
          <Label>LinkedIn</Label>
          <Input value={social.linkedin ?? ''} onChange={(e) => setSocial({ ...social, linkedin: e.target.value })} className="mt-1" />
        </div>
        <div>
          <Label>Facebook</Label>
          <Input value={social.facebook ?? ''} onChange={(e) => setSocial({ ...social, facebook: e.target.value })} className="mt-1" />
        </div>
        <div>
          <Label>Email</Label>
          <Input value={social.email ?? ''} onChange={(e) => setSocial({ ...social, email: e.target.value })} className="mt-1" />
        </div>
      </div>
    </>
  )
}
