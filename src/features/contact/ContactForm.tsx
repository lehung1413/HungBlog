import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import emailjs from '@emailjs/browser'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import FacebookIcon from '@mui/icons-material/Facebook'
import EmailIcon from '@mui/icons-material/Email'
import { toast } from '@/hooks/use-toast'
import type { SocialLinks as SocialLinksType } from '@/types/models'

interface ContactFormProps {
  enabled: boolean
}

export function ContactForm({ enabled }: ContactFormProps) {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!enabled) return

    const form = e.currentTarget
    const formData = new FormData(form)

    setLoading(true)
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.get('name'),
          from_email: formData.get('email'),
          subject: formData.get('subject'),
          message: formData.get('message'),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      toast({ title: t('contact.form.success') })
      form.reset()
    } catch {
      toast({ title: t('contact.form.error'), description: 'Please try again later.' })
    } finally {
      setLoading(false)
    }
  }

  if (!enabled) return null

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2.5}>
        <TextField name="name" label={t('contact.form.name')} required fullWidth />
        <TextField name="email" label={t('contact.form.email')} type="email" required fullWidth />
        <TextField name="subject" label={t('contact.form.subject')} required fullWidth />
        <TextField name="message" label={t('contact.form.message')} multiline rows={5} required fullWidth />
        <Button type="submit" variant="contained" size="large" disabled={loading} fullWidth>
          {loading ? t('common.loading') : t('contact.form.send')}
        </Button>
      </Stack>
    </Box>
  )
}

interface SocialLinksProps {
  social: SocialLinksType
}

export function SocialLinks({ social }: SocialLinksProps) {
  const links = [
    { href: social.github, icon: GitHubIcon, label: 'GitHub' },
    { href: social.linkedin, icon: LinkedInIcon, label: 'LinkedIn' },
    { href: social.facebook, icon: FacebookIcon, label: 'Facebook' },
    { href: social.email ? `mailto:${social.email}` : undefined, icon: EmailIcon, label: 'Email' },
  ].filter((l) => l.href)

  return (
    <Stack direction="row" sx={{ flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
      {links.map(({ href, icon: Icon, label }) => (
        <Button
          key={label}
          component="a"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
          startIcon={<Icon />}
          sx={{ borderColor: 'divider' }}
        >
          {label}
        </Button>
      ))}
    </Stack>
  )
}
