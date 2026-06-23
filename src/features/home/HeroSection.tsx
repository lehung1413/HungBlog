import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import DescriptionIcon from '@mui/icons-material/Description'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import { WideContainer } from '@/components/layout/Container'
import { editorialStyles } from '@/lib/theme'
import { useLocalized, useLocalizedPath } from '@/hooks/useLocale'
import { formatDate } from '@/lib/utils'
import { getHeroSettings, getLatestPosts, getProfile } from '@/services/posts.service'

export function HeroSection() {
  const { t, locale } = useLocalized()
  const { t: tr } = useTranslation()
  const { localizedPath } = useLocalizedPath()

  const { data: profile } = useQuery({ queryKey: ['profile'], queryFn: getProfile })
  const { data: hero } = useQuery({ queryKey: ['hero'], queryFn: getHeroSettings })
  const { data: latestPosts = [] } = useQuery({ queryKey: ['hero-post'], queryFn: () => getLatestPosts(1) })

  const featuredPost = latestPosts[0]
  const name = profile ? t(profile.full_name) : t(hero?.title ?? { en: 'Hung', vi: 'Hung' })
  const jobTitle = profile ? t(profile.job_title) : ''
  const bio = profile ? t(profile.bio) : t(hero?.description ?? { en: '', vi: '' })

  // Dark template: full-width hero slider with featured post
  if (featuredPost?.thumbnail_url) {
    return (
      <Box
        component="section"
        sx={{
          position: 'relative',
          minHeight: { xs: 480, md: 620 },
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={featuredPost.thumbnail_url}
          alt={t(featuredPost.title)}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <Box sx={{ position: 'absolute', inset: 0, ...editorialStyles.heroOverlay }} />
        <WideContainer sx={{ position: 'relative', zIndex: 1, pb: { xs: 6, md: 10 }, pt: 20 }}>
          {featuredPost.category && (
            <Box component="span" sx={editorialStyles.categoryBadge}>
              {t(featuredPost.category.name)}
            </Box>
          )}
          <Typography
            component={Link}
            to={localizedPath(`/blog/${featuredPost.slug}`)}
            variant="h1"
            sx={{
              mt: 2,
              maxWidth: 900,
              fontSize: { xs: '2rem', sm: '2.75rem', md: '3.5rem' },
              color: 'text.primary',
              textDecoration: 'none',
              '&:hover': { color: 'primary.main' },
              transition: 'color 0.2s',
            }}
          >
            {t(featuredPost.title)}
          </Typography>
          <Box sx={{ ...editorialStyles.postMeta, mt: 3 }}>
            {featuredPost.published_at && <span>{formatDate(featuredPost.published_at, locale)}</span>}
            <span>·</span>
            <span>{tr('common.minsRead', { count: featuredPost.reading_time_minutes })}</span>
          </Box>
        </WideContainer>
      </Box>
    )
  }

  // Fallback: profile hero + featured boxes row (Dark "featured-boxes" style)
  return (
    <Box component="section" sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(180deg, rgba(12,177,199,0.06) 0%, transparent 60%)',
        }}
      >
        <WideContainer>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={5} sx={{ alignItems: { xs: 'center', md: 'flex-start' } }}>
            <Avatar
              src={profile?.avatar_url ?? undefined}
              sx={{
                width: { xs: 140, md: 180 },
                height: { xs: 140, md: 180 },
                border: 2,
                borderColor: 'primary.main',
                fontSize: '3rem',
                bgcolor: 'background.paper',
              }}
            >
              {name.charAt(0)}
            </Avatar>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' }, flex: 1 }}>
              <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
                {name}
              </Typography>
              {jobTitle && (
                <Typography variant="h5" color="primary.main" sx={{ mt: 1.5, fontWeight: 500 }}>
                  {jobTitle}
                </Typography>
              )}
              {bio && (
                <Typography variant="body1" color="text.secondary" sx={{ mt: 3, maxWidth: 640, lineHeight: 1.8 }}>
                  {bio}
                </Typography>
              )}
              <Stack direction="row" spacing={2} useFlexGap sx={{ mt: 4, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                {hero?.resume_url && (
                  <Button
                    variant="contained"
                    size="large"
                    href={hero.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<DescriptionIcon />}
                  >
                    {tr('home.hero.viewResume')}
                  </Button>
                )}
                <Button
                  variant="outlined"
                  size="large"
                  component={Link}
                  to={localizedPath('/blog')}
                  startIcon={<MenuBookIcon />}
                >
                  {tr('home.hero.readBlog')}
                </Button>
              </Stack>
            </Box>
          </Stack>
        </WideContainer>
      </Box>
    </Box>
  )
}
