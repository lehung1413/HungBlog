import { useTranslation } from 'react-i18next'
import Alert from '@mui/material/Alert'
import { shouldUseDummyData } from '@/lib/fallback-data'

export function DemoDataBanner() {
  const { t } = useTranslation()

  if (!shouldUseDummyData()) return null

  return (
    <Alert severity="info" sx={{ borderRadius: 0, justifyContent: 'center' }}>
      {t('common.demoDataNotice')}
    </Alert>
  )
}
