import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import type { DashboardStats } from '@/types/models'

interface StatsCardsProps {
  stats: DashboardStats
  labels: {
    totalPosts: string
    totalProjects: string
    draftPosts: string
    publishedPosts: string
  }
}

export function StatsCards({ stats, labels }: StatsCardsProps) {
  const items = [
    { label: labels.totalPosts, value: stats.totalPosts },
    { label: labels.totalProjects, value: stats.totalProjects },
    { label: labels.draftPosts, value: stats.draftPosts },
    { label: labels.publishedPosts, value: stats.publishedPosts },
  ]

  return (
    <Grid container spacing={2}>
      {items.map((item) => (
        <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={item.label}>
          <Card elevation={0}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {item.label}
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                {item.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
