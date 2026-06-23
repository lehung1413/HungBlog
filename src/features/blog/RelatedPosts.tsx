import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { PostCard } from '@/features/home/LatestPosts'
import type { Post } from '@/types/models'

interface RelatedPostsProps {
  posts: Post[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  const { t } = useTranslation()

  if (posts.length === 0) return null

  return (
    <Box component="section" sx={{ mt: 8, pt: 6, borderTop: 1, borderColor: 'divider' }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 4 }}>
        {t('blog.relatedPosts')}
      </Typography>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid size={{ xs: 12, md: 4 }} key={post.id}>
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
