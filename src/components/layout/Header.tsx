import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import FacebookIcon from '@mui/icons-material/Facebook'
import EmailIcon from '@mui/icons-material/Email'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'
import { SearchDialog } from '@/components/layout/SearchDialog'
import { useLocalizedPath } from '@/hooks/useLocale'
import { WideContainer } from '@/components/layout/Container'
import { getSocialLinks } from '@/services/posts.service'

function NavLinkItem({ to, label, end, onClick }: { to: string; label: string; end?: boolean; onClick?: () => void }) {
  return (
    <NavLink to={to} end={end} onClick={onClick} className={({ isActive }) => `yaffo-nav-link${isActive ? ' active' : ''}`}>
      {label}
    </NavLink>
  )
}

export function Header() {
  const { t } = useTranslation()
  const { localizedPath } = useLocalizedPath()
  const location = useLocation()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [sticky, setSticky] = useState(false)

  const { data: social } = useQuery({ queryKey: ['social'], queryFn: getSocialLinks })

  const links = [
    { to: localizedPath('/'), label: t('nav.home'), end: true },
    { to: localizedPath('/portfolio'), label: t('nav.portfolio') },
    { to: localizedPath('/blog'), label: t('nav.blog') },
    { to: localizedPath('/contact'), label: t('nav.contact') },
  ]

  const pageTitle = (() => {
    const path = location.pathname.replace(/^\/(en|vi)/, '') || '/'
    if (path === '/portfolio') return t('nav.portfolio')
    if (path === '/blog') return t('nav.blog')
    if (path.startsWith('/blog/')) return t('nav.blog')
    if (path === '/contact') return t('nav.contact')
    return null
  })()

  const isHome = !pageTitle

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 120)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const socialIcons = [
    { href: social?.github, icon: GitHubIcon, label: 'GitHub' },
    { href: social?.linkedin, icon: LinkedInIcon, label: 'LinkedIn' },
    { href: social?.facebook, icon: FacebookIcon, label: 'Facebook' },
    { href: social?.email ? `mailto:${social.email}` : undefined, icon: EmailIcon, label: 'Email' },
  ]

  return (
    <>
      <Box
        component="header"
        className="yaffo-header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1100,
          bgcolor: 'rgba(10,10,11,0.95)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Row 1: top navigation */}
        <Box className="yaffo-header-row" sx={{ display: { xs: 'none', md: 'block' }, py: 1.25 }}>
          <WideContainer>
            <Stack direction="row" sx={{ justifyContent: 'center', gap: 0.5 }}>
              {links.map((link) => (
                <NavLinkItem key={link.to} to={link.to} label={link.label} end={link.end} />
              ))}
            </Stack>
          </WideContainer>
        </Box>

        {/* Row 2: main header */}
        <Box className="yaffo-header-row" sx={{ py: { xs: 1.5, md: 2 }, display: sticky ? 'none' : 'block' }}>
          <WideContainer>
            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <IconButton color="inherit" onClick={() => setDrawerOpen(true)} aria-label="Open menu" sx={{ color: 'text.primary' }}>
                <MenuIcon />
              </IconButton>

              <Stack direction="row" sx={{ alignItems: 'baseline', gap: 2 }}>
                <Link to={localizedPath('/')} className="yaffo-logo">
                  Hung's Blog
                </Link>
                {pageTitle && !isHome && (
                  <Box
                    component="span"
                    sx={{
                      display: { xs: 'none', sm: 'inline' },
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'text.secondary',
                    }}
                  >
                    {pageTitle}
                  </Box>
                )}
              </Stack>

              <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}>
                <LanguageSwitcher />
                <IconButton color="inherit" onClick={() => setSearchOpen(true)} aria-label="Search">
                  <SearchIcon />
                </IconButton>
              </Stack>
            </Stack>
          </WideContainer>
        </Box>

        {/* Row 3: sticky compact header */}
        <Box
          className="yaffo-header-row"
          sx={{
            py: 1.25,
            display: sticky ? 'block' : 'none',
          }}
        >
          <WideContainer>
            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
              <Stack direction="row" sx={{ alignItems: 'center', gap: 1, flex: 1, minWidth: 0 }}>
                <IconButton color="inherit" onClick={() => setDrawerOpen(true)} aria-label="Open menu" size="small">
                  <MenuIcon fontSize="small" />
                </IconButton>
                <Stack direction="row" sx={{ display: { xs: 'none', lg: 'flex' }, gap: 0.25, overflow: 'hidden' }}>
                  {links.map((link) => (
                    <NavLinkItem key={link.to} to={link.to} label={link.label} end={link.end} />
                  ))}
                </Stack>
              </Stack>

              <Link to={localizedPath('/')} className="yaffo-logo" style={{ fontSize: '1.25rem' }}>
                Hung's Blog
              </Link>

              <Stack direction="row" sx={{ alignItems: 'center', gap: 0.25, flex: 1, justifyContent: 'flex-end' }}>
                {socialIcons.map(
                  ({ href, icon: Icon, label }) =>
                    href && (
                      <IconButton
                        key={label}
                        component="a"
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                        aria-label={label}
                        sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                      >
                        <Icon sx={{ fontSize: 18 }} />
                      </IconButton>
                    ),
                )}
                <IconButton color="inherit" onClick={() => setSearchOpen(true)} size="small" aria-label="Search">
                  <SearchIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>
          </WideContainer>
        </Box>
      </Box>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{
          paper: { sx: { width: 320, bgcolor: 'background.default', borderRight: 1, borderColor: 'divider', display: 'flex', flexDirection: 'column' } },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Link to={localizedPath('/')} className="yaffo-logo" onClick={() => setDrawerOpen(false)}>
            Hung's Blog
          </Link>
        </Box>
        <Divider />
        <List sx={{ px: 1 }}>
          {links.map((link) => (
            <ListItemButton
              key={link.to}
              component={NavLink}
              to={link.to}
              end={link.end}
              onClick={() => setDrawerOpen(false)}
              sx={{ borderRadius: 1, mb: 0.5 }}
            >
              <ListItemText
                primary={link.label}
                slotProps={{
                  primary: { sx: { fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', fontSize: '0.85rem' } },
                }}
              />
            </ListItemButton>
          ))}
        </List>
        <Box sx={{ mt: 'auto', p: 3 }}>
          <Divider sx={{ mb: 2 }} />
          <Stack direction="row" spacing={1}>
            {socialIcons.map(
              ({ href, icon: Icon, label }) =>
                href && (
                  <IconButton
                    key={label}
                    component="a"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    sx={{ color: 'text.secondary' }}
                  >
                    <Icon />
                  </IconButton>
                ),
            )}
          </Stack>
        </Box>
      </Drawer>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
