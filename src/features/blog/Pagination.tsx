import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'center', mt: 6 }} spacing={2}>
      <IconButton onClick={() => onPageChange(page - 1)} disabled={page <= 1} aria-label="Previous page">
        <ChevronLeftIcon />
      </IconButton>
      <Typography variant="body2" color="text.secondary">
        {page} / {totalPages}
      </Typography>
      <IconButton onClick={() => onPageChange(page + 1)} disabled={page >= totalPages} aria-label="Next page">
        <ChevronRightIcon />
      </IconButton>
    </Stack>
  )
}
