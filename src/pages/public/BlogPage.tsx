import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import { PageHeadline } from '@/components/layout/PageHeadline'
import { SidebarLayout } from '@/components/layout/SidebarLayout'
import { Seo } from '@/components/Seo'
import { PostCard } from '@/features/home/LatestPosts'
import { Pagination } from '@/features/blog/Pagination'
import { useLocalized } from '@/hooks/useLocale'
import { getCategories, getPosts, getTags } from '@/services/posts.service'

const PAGE_SIZE = 9

export function BlogPage() {
  const { t } = useTranslation()
  const { t: localized } = useLocalized()
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [tagId, setTagId] = useState('')
  const [page, setPage] = useState(1)

  const { data: categories = [] } = useQuery({ queryKey: ['categories'], queryFn: getCategories })
  const { data: tags = [] } = useQuery({ queryKey: ['tags'], queryFn: getTags })

  useEffect(() => {
    const slug = searchParams.get('category')
    if (slug && categories.length > 0) {
      const match = categories.find((c) => c.slug === slug)
      if (match) setCategoryId(match.id)
    }
  }, [searchParams, categories])

  const { data, isLoading, error } = useQuery({
    queryKey: ['posts', search, categoryId, tagId, page],
    queryFn: () => getPosts({ search, categoryId, tagId, page, pageSize: PAGE_SIZE }),
  })

  const totalPages = Math.ceil((data?.total ?? 0) / PAGE_SIZE)

  return (
    <>
      <Seo title={t('blog.title')} description={t('blog.title')} />
      <PageHeadline title={t('blog.title')} />
      <SidebarLayout onSidebarSearch={(q) => { setSearch(q); setPage(1) }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
          <TextField
            placeholder={t('blog.searchPlaceholder')}
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            size="small"
            fullWidth
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
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>{t('blog.allCategories')}</InputLabel>
            <Select label={t('blog.allCategories')} value={categoryId || 'all'} onChange={(e) => { setCategoryId(e.target.value === 'all' ? '' : e.target.value); setPage(1) }}>
              <MenuItem value="all">{t('blog.allCategories')}</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>{localized(cat.name)}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>{t('blog.allTags')}</InputLabel>
            <Select label={t('blog.allTags')} value={tagId || 'all'} onChange={(e) => { setTagId(e.target.value === 'all' ? '' : e.target.value); setPage(1) }}>
              <MenuItem value="all">{t('blog.allTags')}</MenuItem>
              {tags.map((tag) => (
                <MenuItem key={tag.id} value={tag.id}>{localized(tag.name)}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        {isLoading && <Typography color="text.secondary" sx={{ textAlign: 'center' }}>{t('common.loading')}</Typography>}
        {error && <Typography color="error" sx={{ textAlign: 'center' }}>{t('common.error')}</Typography>}
        {!isLoading && data?.posts.length === 0 && (
          <Typography color="text.secondary" sx={{ textAlign: 'center' }}>{t('common.noResults')}</Typography>
        )}
        <div className="yaffo-masonry">
          {data?.posts.map((post, i) => (
            <div key={post.id} className="yaffo-masonry-item">
              <PostCard post={post} variant={i % 4 === 0 ? 'overlay' : 'grid'} />
            </div>
          ))}
        </div>
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </SidebarLayout>
    </>
  )
}
