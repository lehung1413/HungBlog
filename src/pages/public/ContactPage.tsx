import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { PageHeadline } from '@/components/layout/PageHeadline'
import { SidebarLayout } from '@/components/layout/SidebarLayout'
import { Seo } from '@/components/Seo'
import { ContactForm, SocialLinks } from '@/features/contact/ContactForm'
import { useLocalized } from '@/hooks/useLocale'
import { getProfile, getSocialLinks } from '@/services/posts.service'

export function ContactPage() {
  const { t } = useTranslation()
  const { t: localized } = useLocalized()

  const { data: social = {} } = useQuery({
    queryKey: ['social'],
    queryFn: getSocialLinks,
  })
  const { data: profile } = useQuery({ queryKey: ['profile'], queryFn: getProfile })

  const emailJsConfigured = Boolean(
    import.meta.env.VITE_EMAILJS_SERVICE_ID &&
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID &&
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  )

  return (
    <>
      <Seo title={t('contact.title')} description={t('contact.subtitle')} />
      <PageHeadline title={t('contact.title')} />
      <SidebarLayout>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 5 }}>
            {profile?.avatar_url ? (
              <Box
                component="img"
                src={profile.avatar_url}
                alt=""
                sx={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover' }}
              />
            ) : (
              <Box
                sx={{
                  width: '100%',
                  aspectRatio: '3/4',
                  bgcolor: 'action.hover',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography color="text.secondary">{localized(profile?.full_name) ?? 'HungBlog'}</Typography>
              </Box>
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>
              {t('contact.subtitle')}
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
              {profile ? localized(profile.bio) : t('contact.subtitle')}
            </Typography>
            <Box sx={{ mb: 4 }}>
              <SocialLinks social={social} />
            </Box>
            <ContactForm enabled={emailJsConfigured} />
          </Grid>
        </Grid>
      </SidebarLayout>
    </>
  )
}
