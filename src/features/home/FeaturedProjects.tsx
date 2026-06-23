import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import GitHubIcon from '@mui/icons-material/GitHub'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { useLocalized, useLocalizedPath } from '@/hooks/useLocale'
import type { Project } from '@/types/models'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useLocalized()
  const { t: tr } = useTranslation()

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        overflow: 'hidden',
        '&:hover': { transform: 'translateY(-4px)' },
        '&:hover .project-thumb': { transform: 'scale(1.04)' },
      }}
    >
      <Box sx={{ aspectRatio: '16/10', overflow: 'hidden', bgcolor: 'background.paper' }}>
        {project.thumbnail_url ? (
          <Box
            component="img"
            className="project-thumb"
            src={project.thumbnail_url}
            alt={t(project.name)}
            loading="lazy"
            sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.35s ease' }}
          />
        ) : (
          <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.secondary' }}>
            {t(project.name)}
          </Box>
        )}
      </Box>
      <CardContent sx={{ p: 2.5 }}>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {t(project.name)}
          </Typography>
          <Chip label={tr(`projectStatus.${project.status}`)} size="small" color="primary" variant="outlined" sx={{ height: 22, fontSize: '0.65rem' }} />
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {t(project.description)}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1.5, display: 'block' }}>
          {t(project.role)}
        </Typography>
        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.75, mb: 2 }}>
          {project.tech_stack.map((tech) => (
            <Chip key={tech} label={tech} size="small" sx={{ height: 22, fontSize: '0.7rem', bgcolor: 'action.hover' }} />
          ))}
        </Stack>
        <Stack direction="row" spacing={2}>
          {project.github_url && (
            <Typography component="a" href={project.github_url} target="_blank" rel="noopener noreferrer" variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, '&:hover': { color: 'primary.main' } }}>
              <GitHubIcon sx={{ fontSize: 16 }} /> GitHub
            </Typography>
          )}
          {project.demo_url && (
            <Typography component="a" href={project.demo_url} target="_blank" rel="noopener noreferrer" variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, '&:hover': { color: 'primary.main' } }}>
              <OpenInNewIcon sx={{ fontSize: 16 }} /> Demo
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}

interface FeaturedProjectsProps {
  projects: Project[]
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const { t: tr } = useTranslation()
  const { localizedPath } = useLocalizedPath()

  if (projects.length === 0) return null

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-end', mb: 5 }}>
        <Typography variant="h2" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
          {tr('home.featuredProjects')}
        </Typography>
        <Typography component={Link} to={localizedPath('/portfolio')} variant="body2" color="primary.main" sx={{ fontWeight: 600 }}>
          {tr('common.viewAll')} →
        </Typography>
      </Stack>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </Box>
    </Box>
  )
}
