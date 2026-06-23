import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { PageContainer } from '@/components/layout/Container'
import { Seo } from '@/components/Seo'
import { MarkdownContent } from '@/features/blog/MarkdownContent'
import { GiscusComments } from '@/features/blog/GiscusComments'
import { RelatedPosts } from '@/features/blog/RelatedPosts'
import { editorialStyles } from '@/lib/theme'
import { useLocalized, useLocalizedPath } from '@/hooks/useLocale'
import { formatDate } from '@/lib/utils'
import { getPostBySlug, getRelatedPosts } from '@/services/posts.service'

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { t, locale } = useLocalized()
  const { t: tr } = useTranslation()
  const { localizedPath } = useLocalizedPath()

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => getPostBySlug(slug!),
    enabled: !!slug,
  })

  const { data: related = [] } = useQuery({
    queryKey: ['related', post?.id, post?.category_id],
    queryFn: () => getRelatedPosts(post!.category_id, post!.id),
    enabled: !!post,
  })

  if (isLoading) {
    return (
      <PageContainer sx={{ py: 12, textAlign: 'center' }}>
        <Typography color="text.secondary">{tr('common.loading')}</Typography>
      </PageContainer>
    )
  }

  if (error || !post) {
    return (
      <PageContainer sx={{ py: 12, textAlign: 'center' }}>
        <Typography color="error">{tr('common.error')}</Typography>
        <Button component={Link} to={localizedPath('/blog')} sx={{ mt: 2 }}>
          {tr('common.back')}
        </Button>
      </PageContainer>
    )
  }

  return (
    <>
      <Seo
        title={t(post.title)}
        description={t(post.excerpt)}
        image={post.thumbnail_url ?? undefined}
        path={localizedPath(`/blog/${post.slug}`)}
      />
      <PageContainer size="narrow" sx={{ py: { xs: 6, md: 10 } }}>
        <Button
          component={Link}
          to={localizedPath('/blog')}
          startIcon={<ArrowBackIcon />}
          color="inherit"
          sx={{ mb: 4, color: 'text.secondary' }}
        >
          {tr('common.back')}
        </Button>

        {post.thumbnail_url && (
          <Box
            component="img"
            src={post.thumbnail_url}
            alt={t(post.title)}
            loading="eager"
            sx={{ width: '100%', aspectRatio: '2/1', objectFit: 'cover', borderRadius: 2, mb: 4 }}
          />
        )}

        {post.category && (
          <Box component="span" sx={{ ...editorialStyles.categoryBadge, mb: 2, display: 'inline-block' }}>
            {t(post.category.name)}
          </Box>
        )}

        <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, mt: 2 }}>
          {t(post.title)}
        </Typography>

        <Stack direction="row" spacing={2} sx={{ ...editorialStyles.postMeta, mt: 2 }}>
          {post.published_at && <span>{formatDate(post.published_at, locale)}</span>}
          <span>·</span>
          <span>{tr('common.minsRead', { count: post.reading_time_minutes })}</span>
        </Stack>

        {post.tags && post.tags.length > 0 && (
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1, mt: 3 }}>
            {post.tags.map((tag) => (
              <Chip key={tag.id} label={t(tag.name)} size="small" variant="outlined" />
            ))}
          </Stack>
        )}

        <Box sx={{ mt: 5 }}>
          <MarkdownContent content={t(post.content)} />
        </Box>

        <GiscusComments slug={post.slug} />
        <RelatedPosts posts={related} />
      </PageContainer>
    </>
  )
}
