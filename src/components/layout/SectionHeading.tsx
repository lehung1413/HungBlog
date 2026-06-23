import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  sx?: SxProps<Theme>
}

export function SectionHeading({ title, subtitle, sx }: SectionHeadingProps) {
  return (
    <Box sx={{ mb: 5, ...sx }}>
      <Typography variant="h2" component="h2" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  )
}
