import MuiCard from '@mui/material/Card'
import MuiCardContent from '@mui/material/CardContent'
import MuiCardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import type { CardProps } from '@mui/material/Card'
import type { CardContentProps } from '@mui/material/CardContent'
import type { CardHeaderProps } from '@mui/material/CardHeader'

export function Card({ children, sx, ...props }: CardProps) {
  return (
    <MuiCard elevation={0} sx={{ overflow: 'hidden', ...sx }} {...props}>
      {children}
    </MuiCard>
  )
}

export function CardHeader({ title, subheader, sx, ...props }: CardHeaderProps) {
  return (
    <MuiCardHeader
      title={typeof title === 'string' ? <Typography variant="h6" sx={{ fontWeight: 600 }}>{title}</Typography> : title}
      subheader={typeof subheader === 'string' ? <Typography variant="body2" color="text.secondary">{subheader}</Typography> : subheader}
      sx={{ pb: 1, ...sx }}
      {...props}
    />
  )
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Typography variant="h6" sx={{ fontWeight: 600 }} className={className} gutterBottom>
      {children}
    </Typography>
  )
}

export function CardDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Typography variant="body2" color="text.secondary" className={className}>
      {children}
    </Typography>
  )
}

export function CardContent({ children, sx, ...props }: CardContentProps) {
  return (
    <MuiCardContent sx={{ pt: 0, '&:last-child': { pb: 2 }, ...sx }} {...props}>
      {children}
    </MuiCardContent>
  )
}
