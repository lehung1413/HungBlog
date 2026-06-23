import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { useLocalizedPath } from '@/hooks/useLocale'
import type { Locale } from '@/lib/i18n'

export function LanguageSwitcher() {
  const { locale, switchLocale } = useLocalizedPath()

  const handleChange = (_: React.MouseEvent<HTMLElement>, value: Locale | null) => {
    if (value) switchLocale(value)
  }

  return (
    <ToggleButtonGroup
      value={locale}
      exclusive
      onChange={handleChange}
      size="small"
      sx={{
        '& .MuiToggleButton-root': {
          px: 1.5,
          py: 0.25,
          fontSize: '0.75rem',
          fontWeight: 600,
          borderColor: 'divider',
          color: 'text.secondary',
          '&.Mui-selected': { bgcolor: 'primary.main', color: 'primary.contrastText', '&:hover': { bgcolor: 'primary.dark' } },
        },
      }}
    >
      <ToggleButton value="en">EN</ToggleButton>
      <ToggleButton value="vi">VI</ToggleButton>
    </ToggleButtonGroup>
  )
}
