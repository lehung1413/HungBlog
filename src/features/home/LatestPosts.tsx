import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { editorialStyles } from '@/lib/theme'
import { useLocalized, useLocalizedPath } from '@/hooks/useLocale'
import { formatDate } from '@/lib/utils'
import type { Post } from '@/types/models'

interface PostCardProps {
  post: Post
  variant?: 'grid' | 'overlay'
}

export function PostCard({ post, variant = 'grid' }: PostCardProps) {
  const { t, locale } = useLocalized()
  const { t: tr } = useTranslation()
  const { localizedPath } = useLocalizedPath()

  if (variant === 'overlay' && post.thumbnail_url) {
    return (
      <Card
        component={Link}
        to={localizedPath(`/blog/${post.slug}`)}
        elevation={0}
        sx={{
          position: 'relative',
          display: 'block',
          width: '100%',
          aspectRatio: '4/5',
          overflow: 'hidden',
          textDecoration: 'none',
          '&:hover img': { transform: 'scale(1.05)' },
        }}
      >
        <Box
          component="img"
          src={post.thumbnail_url}
          alt={t(post.title)}
          loading="lazy"
          sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
        />
        <Box sx={{ position: 'absolute', inset: 0, ...editorialStyles.heroOverlay }} />
        <CardContent sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 1 }}>
          {post.category && (
            <Box component="span" sx={{ ...editorialStyles.categoryBadge, mb: 1, display: 'inline-block' }}>
              {t(post.category.name)}
            </Box>
          )}
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', mt: 1 }}>
            {t(post.title)}
          </Typography>
          <Box sx={{ ...editorialStyles.postMeta, mt: 1.5 }}>
            {post.published_at && <span>{formatDate(post.published_at, locale)}</span>}
            <span>·</span>
            <span>{tr('common.minsRead', { count: post.reading_time_minutes })}</span>
          </Box>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      component={Link}
      to={localizedPath(`/blog/${post.slug}`)}
      elevation={0}
      sx={{
        display: 'block',
        width: '100%',
        textDecoration: 'none',
        '&:hover': { transform: 'translateY(-4px)' },
        '&:hover .post-image': { transform: 'scale(1.04)' },
      }}
    >
      <Box sx={{ aspectRatio: '16/10', overflow: 'hidden', bgcolor: 'background.paper' }}>
        {post.thumbnail_url ? (
          <Box
            component="img"
            className="post-image"
            src={post.thumbnail_url}
            alt={t(post.title)}
            loading="lazy"
            sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.35s ease' }}
          />
        ) : (
          <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3, color: 'text.secondary' }}>
            {t(post.title)}
          </Box>
        )}
      </Box>
      <CardContent sx={{ p: 2.5 }}>
        {post.category && (
          <Chip label={t(post.category.name)} size="small" color="secondary" sx={{ mb: 1.5, height: 24, fontSize: '0.7rem' }} />
        )}
        <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.35, '&:hover': { color: 'primary.main' } }}>
          {t(post.title)}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {t(post.excerpt)}
        </Typography>
        <Stack direction="row" spacing={1.5} sx={{ ...editorialStyles.postMeta, mt: 2 }}>
          {post.published_at && <span>{formatDate(post.published_at, locale)}</span>}
          <span>·</span>
          <span>{tr('common.minsRead', { count: post.reading_time_minutes })}</span>
        </Stack>
      </CardContent>
    </Card>
  )
}

interface LatestPostsProps {
  posts: Post[]
}

export function LatestPosts({ posts }: LatestPostsProps) {
  const { t: tr } = useTranslation()
  const { localizedPath } = useLocalizedPath()

  if (posts.length === 0) return null

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-end', mb: 5 }}>
        <Typography variant="h2" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
          {tr('home.latestPosts')}
        </Typography>
        <Typography component={Link} to={localizedPath('/blog')} variant="body2" color="primary.main" sx={{ fontWeight: 600 }}>
          {tr('common.viewAll')} →
        </Typography>
      </Stack>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
          gap: 3,
        }}
      >
        {posts.map((post) => (
          <PostCard key={post.id} post={post} variant="grid" />
        ))}
      </Box>
    </Box>
  )
}
