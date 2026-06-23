import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { PageContainer } from '@/components/layout/Container'
import { Seo } from '@/components/Seo'
import { HeroSection } from '@/features/home/HeroSection'
import { FeaturedProjects } from '@/features/home/FeaturedProjects'
import { LatestPosts } from '@/features/home/LatestPosts'
import { SkillsSummary } from '@/features/portfolio/SkillsMatrix'
import { FeaturedBoxes } from '@/features/home/FeaturedBoxes'
import { useLocalizedPath } from '@/hooks/useLocale'
import { getLatestPosts, getProjects, getSkills } from '@/services/posts.service'

export function HomePage() {
  const { t } = useTranslation()
  const { localizedPath } = useLocalizedPath()

  const { data: projects = [] } = useQuery({ queryKey: ['featured-projects'], queryFn: () => getProjects(true) })
  const { data: posts = [] } = useQuery({ queryKey: ['latest-posts'], queryFn: () => getLatestPosts(6) })
  const { data: skills = [] } = useQuery({ queryKey: ['skills'], queryFn: getSkills })

  return (
    <>
      <Seo title="HungBlog" description="Personal portfolio and blog" />
      <HeroSection />
      <FeaturedBoxes />
      <PageContainer>
        <FeaturedProjects projects={projects} />
        <LatestPosts posts={posts} />
      </PageContainer>
      <SkillsSummary skills={skills} />
      <Box sx={{ py: { xs: 8, md: 12 }, textAlign: 'center', borderTop: 1, borderColor: 'divider' }}>
        <PageContainer>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' }, mb: 2 }}>
            {t('home.contactCta')}
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            {t('contact.subtitle')}
          </Typography>
          <Button component={Link} to={localizedPath('/contact')} variant="contained" size="large">
            {t('nav.contact')}
          </Button>
        </PageContainer>
      </Box>
    </>
  )
}
