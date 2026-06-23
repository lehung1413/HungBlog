import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { WideContainer } from '@/components/layout/Container'
import { SiteSidebar } from '@/components/layout/SiteSidebar'

interface SidebarLayoutProps {
  children: React.ReactNode
  showSidebar?: boolean
  onSidebarSearch?: (query: string) => void
}

export function SidebarLayout({ children, showSidebar = true, onSidebarSearch }: SidebarLayoutProps) {
  return (
    <WideContainer sx={{ py: { xs: 3, md: 5 } }}>
      <Grid container spacing={{ xs: 4, md: 6 }}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <Box sx={{ maxWidth: showSidebar ? '100%' : 900, mx: showSidebar ? 0 : 'auto' }}>
            {children}
          </Box>
        </Grid>
        {showSidebar && (
          <Grid size={{ xs: 12, lg: 3 }}>
            <SiteSidebar onSearch={onSidebarSearch} />
          </Grid>
        )}
      </Grid>
    </WideContainer>
  )
}
