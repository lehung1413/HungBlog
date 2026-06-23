import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ArticleIcon from '@mui/icons-material/Article'
import FolderIcon from '@mui/icons-material/Folder'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import { useAuth } from '@/hooks/useAuth'

const DRAWER_WIDTH = 260

const navItems = [
  { to: '/admin', icon: DashboardIcon, labelKey: 'admin.dashboard', end: true },
  { to: '/admin/posts', icon: ArticleIcon, labelKey: 'admin.posts' },
  { to: '/admin/projects', icon: FolderIcon, labelKey: 'admin.projects' },
  { to: '/admin/settings', icon: SettingsIcon, labelKey: 'admin.settings' },
]

export function AdminSidebar() {
  const { t } = useTranslation()
  const { signOut } = useAuth()
  const location = useLocation()

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box', borderRight: 1, borderColor: 'divider' },
      }}
    >
      <Box sx={{ p: 2.5, borderBottom: 1, borderColor: 'divider' }}>
        <Typography component={Link} to="/admin" variant="h6" color="primary.main" sx={{ fontWeight: 800, textDecoration: 'none' }}>
          HungBlog Admin
        </Typography>
      </Box>
      <List sx={{ flex: 1, px: 1, py: 2 }}>
        {navItems.map(({ to, icon: Icon, labelKey, end }) => {
          const active = end ? location.pathname === to : location.pathname.startsWith(to)
          return (
            <ListItemButton
              key={to}
              component={Link}
              to={to}
              selected={active}
              sx={{ borderRadius: 1, mb: 0.5 }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Icon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={t(labelKey)} />
            </ListItemButton>
          )
        })}
      </List>
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Button fullWidth startIcon={<LogoutIcon />} onClick={() => void signOut()} color="inherit">
          {t('common.logout')}
        </Button>
      </Box>
    </Drawer>
  )
}

export const adminDrawerWidth = DRAWER_WIDTH
