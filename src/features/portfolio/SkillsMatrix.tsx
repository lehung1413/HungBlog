import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import LinearProgress from '@mui/material/LinearProgress'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import type { Skill, SkillGroup } from '@/types/models'
import { useLocalized } from '@/hooks/useLocale'

const GROUPS: SkillGroup[] = [
  'backend', 'frontend', 'database', 'devops', 'cloud', 'management', 'soft_skills',
]

interface SkillsSummaryProps {
  skills: Skill[]
}

export function SkillsSummary({ skills }: SkillsSummaryProps) {
  const { t: tr } = useTranslation()
  const { t } = useLocalized()

  const grouped = GROUPS.map((group) => ({
    group,
    items: skills.filter((s) => s.skill_group === group).slice(0, 5),
  })).filter((g) => g.items.length > 0)

  if (grouped.length === 0) return null

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.paper', borderTop: 1, borderColor: 'divider' }}>
      <Typography variant="h2" sx={{ mb: 6, textAlign: 'center', fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
        {tr('home.skillsSummary')}
      </Typography>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 3 } }}>
        <Grid container spacing={4}>
          {grouped.map(({ group, items }) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={group}>
              <Typography variant="overline" color="primary.main" sx={{ fontWeight: 700, letterSpacing: '0.1em' }}>
                {tr(`skills.${group}`)}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                {items.map((skill) => (
                  <Chip key={skill.id} label={t(skill.name)} size="small" sx={{ bgcolor: 'action.hover' }} />
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export function SkillsMatrix({ skills }: SkillsSummaryProps) {
  const { t: tr } = useTranslation()
  const { t } = useLocalized()

  return (
    <Grid container spacing={3}>
      {GROUPS.map((group) => {
        const items = skills.filter((s) => s.skill_group === group)
        if (items.length === 0) return null
        return (
          <Grid size={{ xs: 12, md: 6 }} key={group}>
            <Box sx={{ p: 3, border: 1, borderColor: 'divider', borderRadius: 2, bgcolor: 'background.paper', height: '100%' }}>
              <Typography variant="h6" color="primary.main" gutterBottom>
                {tr(`skills.${group}`)}
              </Typography>
              <Stack spacing={2} sx={{ mt: 2 }}>
                {items.map((skill) => (
                  <Box key={skill.id}>
                    <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2">{t(skill.name)}</Typography>
                      <Typography variant="caption" color="text.secondary">{skill.proficiency}%</Typography>
                    </Stack>
                    <LinearProgress variant="determinate" value={skill.proficiency} sx={{ height: 6, borderRadius: 3, bgcolor: 'action.hover' }} />
                  </Box>
                ))}
              </Stack>
            </Box>
          </Grid>
        )
      })}
    </Grid>
  )
}
