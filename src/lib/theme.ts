import { createTheme, alpha } from '@mui/material/styles'

// Inspired by Yaffo Dark (nebotheme) — editorial magazine dark theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0CB1C7',
      light: '#3dd4e8',
      dark: '#0891a3',
      contrastText: '#0A0A0B',
    },
    secondary: {
      main: '#FFCC00',
      light: '#ffe066',
      dark: '#cc9900',
      contrastText: '#0A0A0B',
    },
    background: {
      default: '#0A0A0B',
      paper: '#141416',
    },
    text: {
      primary: '#FAFAFA',
      secondary: '#A1A1AA',
    },
    divider: '#2A2A2E',
    error: { main: '#EF4444' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, letterSpacing: '-0.02em', fontSize: '3.5rem' },
    h2: { fontWeight: 700, letterSpacing: '-0.02em', fontSize: '2.25rem' },
    h3: { fontWeight: 600, letterSpacing: '-0.02em', fontSize: '1.5rem' },
    h4: { fontWeight: 600, letterSpacing: '-0.01em' },
    subtitle1: { color: '#A1A1AA', lineHeight: 1.7 },
    body1: { lineHeight: 1.75 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#0A0A0B',
          scrollbarColor: '#2A2A2E #0A0A0B',
        },
        a: { color: 'inherit', textDecoration: 'none' },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '10px 24px',
        },
        outlined: {
          borderColor: alpha('#FAFAFA', 0.2),
          '&:hover': {
            borderColor: '#0CB1C7',
            backgroundColor: alpha('#0CB1C7', 0.08),
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#141416',
          border: '1px solid #2A2A2E',
          transition: 'transform 0.2s ease, border-color 0.2s ease',
          '&:hover': {
            borderColor: alpha('#0CB1C7', 0.4),
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: alpha('#0A0A0B', 0.85),
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #2A2A2E',
          boxShadow: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 500 },
        filled: {
          backgroundColor: alpha('#FFCC00', 0.12),
          color: '#FFCC00',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#141416',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#141416',
          borderRight: '1px solid #2A2A2E',
        },
      },
    },
  },
})

export const editorialStyles = {
  heroOverlay: {
    background: 'linear-gradient(to top, rgba(10,10,11,0.95) 0%, rgba(10,10,11,0.4) 50%, rgba(10,10,11,0.2) 100%)',
  },
  categoryBadge: {
    display: 'inline-block',
    px: 1.5,
    py: 0.5,
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    color: '#FFCC00',
    backgroundColor: alpha('#FFCC00', 0.1),
    borderRadius: 1,
  },
  postMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    color: '#A1A1AA',
    fontSize: '0.8rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.04em',
  },
}
