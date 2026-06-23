import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import type { SxProps, Theme } from '@mui/material/styles'

interface PageContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'default' | 'narrow' | 'wide'
  sx?: SxProps<Theme>
}

const maxWidthMap = {
  default: 'lg' as const,
  narrow: 'md' as const,
  wide: 'xl' as const,
}

export function PageContainer({ children, size = 'default', sx, className }: PageContainerProps) {
  return (
    <Container maxWidth={maxWidthMap[size]} className={className} sx={{ px: { xs: 2, md: 3 }, ...sx }}>
      {children}
    </Container>
  )
}

// Legacy alias
export { PageContainer as Container }

export function WideContainer({ children, sx }: { children: React.ReactNode; sx?: SxProps<Theme> }) {
  return (
    <Box sx={{ width: '100%', maxWidth: 1400, mx: 'auto', px: { xs: 2, md: 4 }, ...sx }}>
      {children}
    </Box>
  )
}
