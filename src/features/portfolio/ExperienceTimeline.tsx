import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { useLocalized } from '@/hooks/useLocale'
import { formatDate } from '@/lib/utils'
import type { Experience } from '@/types/models'

interface ExperienceTimelineProps {
  experiences: Experience[]
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  const { t, locale } = useLocalized()
  const { t: tr } = useTranslation()

  if (experiences.length === 0) return null

  return (
    <Box sx={{ position: 'relative', pl: { xs: 3, md: 0 } }}>
      <Box
        sx={{
          position: 'absolute',
          left: { xs: 8, md: '50%' },
          top: 8,
          bottom: 8,
          width: 2,
          bgcolor: 'divider',
          transform: { md: 'translateX(-50%)' },
        }}
      />
      <Stack spacing={4}>
        {experiences.map((exp, index) => (
          <Box
            key={exp.id}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: index % 2 === 0 ? 'row-reverse' : 'row' },
              gap: 2,
            }}
          >
            <Box sx={{ display: { md: 'block' }, flex: 1 }} />
            <Box
              sx={{
                flex: 1,
                position: 'relative',
                pl: { xs: 2, md: index % 2 === 0 ? 0 : 4 },
                pr: { md: index % 2 === 0 ? 4 : 0 },
                textAlign: { md: index % 2 === 0 ? 'right' : 'left' },
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  left: { xs: -19, md: '50%' },
                  top: 8,
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: 'background.default',
                  border: 2,
                  borderColor: 'primary.main',
                  transform: { md: 'translateX(-50%)' },
                }}
              />
              <Box sx={{ p: 3, border: 1, borderColor: 'divider', borderRadius: 2, bgcolor: 'background.paper' }}>
                <Typography variant="body2" color="primary.main" sx={{ fontWeight: 600 }}>
                  {t(exp.position)}
                </Typography>
                <Typography variant="h6" sx={{ mt: 0.5 }}>
                  {t(exp.company_name)}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  {formatDate(exp.start_date, locale)} — {exp.end_date ? formatDate(exp.end_date, locale) : tr('portfolio.present')}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  {t(exp.description)}
                </Typography>
                {exp.achievements.length > 0 && (
                  <Box component="ul" sx={{ mt: 2, pl: 2, m: 0 }}>
                    {exp.achievements.map((a, i) => (
                      <Typography component="li" variant="body2" color="text.secondary" key={i} sx={{ mb: 0.5 }}>
                        {t(a)}
                      </Typography>
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
