import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import { useLocalized, useLocalizedPath } from '@/hooks/useLocale'
import { formatDate } from '@/lib/utils'
import { getCategories, getLatestPosts } from '@/services/posts.service'

interface SiteSidebarProps {
  onSearch?: (query: string) => void
}

export function SiteSidebar({ onSearch }: SiteSidebarProps) {
  const { t } = useTranslation()
  const { t: localized, locale } = useLocalized()
  const { localizedPath } = useLocalizedPath()
  const [search, setSearch] = useState('')

  const { data: popular = [] } = useQuery({
    queryKey: ['sidebar-popular'],
    queryFn: () => getLatestPosts(4),
  })
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const handleSearch = (value: string) => {
    setSearch(value)
    onSearch?.(value)
  }

  return (
    <aside>
      <div className="yaffo-widget">
        <h5 className="yaffo-widget-title"><span>{t('blog.searchPlaceholder')}</span></h5>
        <TextField
          fullWidth
          size="small"
          placeholder={t('blog.searchPlaceholder')}
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
      </div>

      <div className="yaffo-widget">
        <h5 className="yaffo-widget-title"><span>Most Popular</span></h5>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {popular.map((post) => (
            <Link
              key={post.id}
              to={localizedPath(`/blog/${post.slug}`)}
              style={{ textDecoration: 'none', color: 'inherit', display: 'flex', gap: 12 }}
            >
              {post.thumbnail_url && (
                <Box
                  component="img"
                  src={post.thumbnail_url}
                  alt=""
                  sx={{ width: 72, height: 72, objectFit: 'cover', flexShrink: 0 }}
                />
              )}
              <Box>
                <Box sx={{ fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.35, '&:hover': { color: 'primary.main' } }}>
                  {localized(post.title)}
                </Box>
                {post.published_at && (
                  <Box sx={{ fontSize: '0.7rem', color: 'text.secondary', mt: 0.5, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {formatDate(post.published_at, locale)}
                  </Box>
                )}
              </Box>
            </Link>
          ))}
        </Box>
      </div>

      <div className="yaffo-widget">
        <h5 className="yaffo-widget-title"><span>{t('blog.allCategories')}</span></h5>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`${localizedPath('/blog')}?category=${cat.slug}`}
              className="yaffo-nav-link"
              style={{ padding: '0.25rem 0', letterSpacing: '0.06em' }}
            >
              {localized(cat.name)}
            </Link>
          ))}
        </Box>
      </div>
    </aside>
  )
}
