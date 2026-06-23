import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { SidebarLayout } from '@/components/layout/SidebarLayout'
import { Seo } from '@/components/Seo'
import { ExperienceTimeline } from '@/features/portfolio/ExperienceTimeline'
import { SkillsMatrix } from '@/features/portfolio/SkillsMatrix'
import { ProjectCard } from '@/features/home/FeaturedProjects'
import { useLocalized } from '@/hooks/useLocale'
import { getExperiences, getProfile, getProjects, getSkills } from '@/services/posts.service'

export function PortfolioPage() {
  const { t } = useTranslation()
  const { t: localized } = useLocalized()

  const { data: profile } = useQuery({ queryKey: ['profile'], queryFn: getProfile })
  const { data: experiences = [] } = useQuery({ queryKey: ['experiences'], queryFn: getExperiences })
  const { data: skills = [] } = useQuery({ queryKey: ['skills'], queryFn: getSkills })
  const { data: projects = [] } = useQuery({ queryKey: ['projects'], queryFn: () => getProjects() })

  const name = profile ? localized(profile.full_name) : 'Hung'
  const bio = profile ? localized(profile.bio) : ''

  return (
    <>
      <Seo title={t('nav.portfolio')} description={bio || t('nav.portfolio')} />
      <SidebarLayout>
        <Box sx={{ mb: 5 }}>
          {profile?.avatar_url && (
            <Box
              component="img"
              src={profile.avatar_url}
              alt={name}
              sx={{
                width: '100%',
                maxHeight: 520,
                objectFit: 'cover',
                mb: 4,
                display: 'block',
              }}
            />
          )}
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, mb: 2, letterSpacing: '-0.02em' }}>
            {name}
          </Typography>
          {profile?.job_title && (
            <Typography variant="h6" color="primary.main" sx={{ mb: 3, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase', fontSize: '0.85rem' }}>
              {localized(profile.job_title)}
            </Typography>
          )}
          {bio && (
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9, fontSize: '1.05rem', whiteSpace: 'pre-line' }}>
              {bio}
            </Typography>
          )}
        </Box>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', mb: 3, color: 'text.secondary' }}>
            {t('portfolio.experience')}
          </Typography>
          <ExperienceTimeline experiences={experiences} />
        </Box>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', mb: 3, color: 'text.secondary' }}>
            {t('portfolio.skills')}
          </Typography>
          <SkillsMatrix skills={skills} />
        </Box>

        {projects.length > 0 && (
          <Box>
            <Typography variant="h4" sx={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', mb: 3, color: 'text.secondary' }}>
              {t('portfolio.projects')}
            </Typography>
            <Grid container spacing={3}>
              {projects.map((project) => (
                <Grid size={{ xs: 12, md: 6 }} key={project.id}>
                  <ProjectCard project={project} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </SidebarLayout>
    </>
  )
}
