import Box from '@mui/material/Box'
import { Outlet } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BackToTop } from '@/components/layout/BackToTop'
import { DemoDataBanner } from '@/components/layout/DemoDataBanner'
import { useSyncI18n } from '@/hooks/useLocale'

export function PublicLayout() {
  useSyncI18n()

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column', bgcolor: 'background.default' }}>
      <Header />
      <DemoDataBanner />
      <Box component="main" sx={{ flex: 1 }}>
        <Outlet />
      </Box>
      <Footer />
      <BackToTop />
    </Box>
  )
}
