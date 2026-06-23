import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import SearchIcon from '@mui/icons-material/Search'
import { useLocalized, useLocalizedPath } from '@/hooks/useLocale'
import { getPosts } from '@/services/posts.service'

interface SearchDialogProps {
  open: boolean
  onClose: () => void
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('')
  const { t: localized } = useLocalized()
  const { localizedPath } = useLocalizedPath()

  const { data } = useQuery({
    queryKey: ['search', query],
    queryFn: () => getPosts({ search: query, page: 1, pageSize: 6 }),
    enabled: open && query.length >= 2,
  })

  const handleClose = () => {
    setQuery('')
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      slotProps={{ paper: { sx: { bgcolor: 'background.paper', mt: 8, alignSelf: 'flex-start' } } }}
    >
      <DialogContent sx={{ pt: 3 }}>
        <TextField
          autoFocus
          fullWidth
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        {query.length >= 2 && (
          <Box sx={{ mt: 2 }}>
            {data?.posts.length === 0 && (
              <Typography color="text.secondary" variant="body2">No results</Typography>
            )}
            {data?.posts.map((post) => (
              <Box
                key={post.id}
                component={Link}
                to={localizedPath(`/blog/${post.slug}`)}
                onClick={handleClose}
                sx={{
                  display: 'block',
                  py: 1.5,
                  borderBottom: 1,
                  borderColor: 'divider',
                  textDecoration: 'none',
                  color: 'text.primary',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                <Typography sx={{ fontWeight: 600 }}>{localized(post.title)}</Typography>
              </Box>
            ))}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  )
}
