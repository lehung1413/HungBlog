import { Outlet, Navigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { AdminSidebar, adminDrawerWidth } from '@/features/admin/AdminSidebar'
import { useAuth } from '@/hooks/useAuth'

export function AdminLayout() {
  const { isAdmin, loading } = useAuth()

  if (loading) {
    return (
      <Box sx={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress color="primary" />
      </Box>
    )
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AdminSidebar />
      <Box component="main" sx={{ flex: 1, p: { xs: 2, md: 4 }, width: `calc(100% - ${adminDrawerWidth}px)` }}>
        <Outlet />
      </Box>
    </Box>
  )
}

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { isAdmin, loading } = useAuth()

  if (loading) {
    return (
      <Box sx={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />
  }

  return <>{children}</>
}
