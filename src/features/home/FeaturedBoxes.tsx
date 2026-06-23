import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import Stack from '@mui/material/Stack'
import PersonIcon from '@mui/icons-material/Person'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import EmailIcon from '@mui/icons-material/Email'
import { WideContainer } from '@/components/layout/Container'
import { useLocalizedPath } from '@/hooks/useLocale'
import { getProfile } from '@/services/posts.service'

const boxes = [
  { key: 'blog', icon: MenuBookIcon, path: '/blog', labelKey: 'nav.blog' as const },
  { key: 'contact', icon: EmailIcon, path: '/contact', labelKey: 'nav.contact' as const },
]

export function FeaturedBoxes() {
  const { t } = useTranslation()
  const { localizedPath } = useLocalizedPath()
  const { data: profile } = useQuery({ queryKey: ['profile'], queryFn: getProfile })

  return (
    <Box sx={{ bgcolor: 'background.paper' }}>
      <WideContainer>
        <div className="yaffo-featured-boxes">
          <Card elevation={0} sx={{ overflow: 'hidden' }}>
            <CardActionArea component={Link} to={localizedPath('/portfolio')} sx={{ p: 0 }}>
              {profile?.avatar_url ? (
                <Box component="img" src={profile.avatar_url} alt="About" sx={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
              ) : (
                <Box sx={{ aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'action.hover' }}>
                  <PersonIcon sx={{ fontSize: 48, color: 'text.secondary' }} />
                </Box>
              )}
              <Stack direction="row" sx={{ alignItems: 'center', p: 2 }} spacing={1}>
                <PersonIcon fontSize="small" color="primary" />
                <Typography sx={{ fontWeight: 600 }}>{t('nav.portfolio')}</Typography>
              </Stack>
            </CardActionArea>
          </Card>
          {boxes.map(({ key, icon: Icon, path, labelKey }) => (
            <Card key={key} elevation={0}>
              <CardActionArea component={Link} to={localizedPath(path)} sx={{ p: 3, minHeight: 160, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                <Icon sx={{ fontSize: 36, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {t(labelKey)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {t('common.viewAll')} →
                </Typography>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </WideContainer>
    </Box>
  )
}
