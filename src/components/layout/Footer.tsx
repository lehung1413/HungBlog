import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import FacebookIcon from '@mui/icons-material/Facebook'
import EmailIcon from '@mui/icons-material/Email'
import { WideContainer } from '@/components/layout/Container'
import { useLocalizedPath } from '@/hooks/useLocale'
import { getSocialLinks } from '@/services/posts.service'

export function Footer() {
  const { t } = useTranslation()
  const { localizedPath } = useLocalizedPath()
  const { data: social } = useQuery({ queryKey: ['social'], queryFn: getSocialLinks })

  const links = [
    { to: localizedPath('/'), label: t('nav.home'), end: true },
    { to: localizedPath('/portfolio'), label: t('nav.portfolio') },
    { to: localizedPath('/blog'), label: t('nav.blog') },
    { to: localizedPath('/contact'), label: t('nav.contact') },
  ]

  const icons = [
    { href: social?.github, icon: GitHubIcon, label: 'GitHub' },
    { href: social?.linkedin, icon: LinkedInIcon, label: 'LinkedIn' },
    { href: social?.facebook, icon: FacebookIcon, label: 'Facebook' },
    { href: social?.email ? `mailto:${social.email}` : undefined, icon: EmailIcon, label: 'Email' },
  ]

  return (
    <Box component="footer" className="yaffo-footer">
      <WideContainer>
        <Stack spacing={3} sx={{ alignItems: 'center' }}>
          <Stack direction="row" spacing={1}>
            {icons.map(
              ({ href, icon: Icon, label }) =>
                href && (
                  <IconButton
                    key={label}
                    component="a"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    sx={{
                      color: 'text.secondary',
                      border: 1,
                      borderColor: 'divider',
                      '&:hover': { color: 'primary.main', borderColor: 'primary.main' },
                    }}
                  >
                    <Icon fontSize="small" />
                  </IconButton>
                ),
            )}
          </Stack>

          <Typography variant="body2" color="text.secondary" sx={{ letterSpacing: '0.04em' }}>
            © {new Date().getFullYear()} HungBlog. All rights reserved.
          </Typography>

          <nav className="yaffo-footer-nav" aria-label="Footer">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <Link to={localizedPath('/')} className="yaffo-logo" style={{ fontSize: '1.5rem' }}>
            HungBlog
          </Link>
        </Stack>
      </WideContainer>
    </Box>
  )
}
