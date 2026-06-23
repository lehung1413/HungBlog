import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { WideContainer } from '@/components/layout/Container'
import { editorialStyles } from '@/lib/theme'
import { getHeroSettings } from '@/services/posts.service'

const HERO_IMAGE_PLACEHOLDER = 'https://picsum.photos/seed/hungblog-life-quote/1400/900'

export function HeroSection() {
  const { t } = useTranslation()
  const { data: hero } = useQuery({ queryKey: ['hero'], queryFn: getHeroSettings })

  const imageUrl = hero?.image_url || HERO_IMAGE_PLACEHOLDER

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: { xs: 480, md: 620 },
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
      }}
    >
      <Box
        component="img"
        src={imageUrl}
        alt=""
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <Box sx={{ position: 'absolute', inset: 0, ...editorialStyles.heroOverlay }} />
      <WideContainer sx={{ position: 'relative', zIndex: 1, pb: { xs: 6, md: 10 }, pt: 20 }}>
        <Box component="span" sx={editorialStyles.categoryBadge}>
          {t('home.hero.label')}
        </Box>
        <Typography
          component="blockquote"
          variant="h1"
          sx={{
            mt: 2,
            maxWidth: 900,
            fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' },
            fontWeight: 600,
            fontStyle: 'italic',
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
            color: 'text.primary',
            border: 'none',
            m: 0,
            p: 0,
          }}
        >
          {t('home.hero.quote')}
        </Typography>
      </WideContainer>
    </Box>
  )
}
