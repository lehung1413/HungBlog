import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'

interface MarkdownContentProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <Box
      sx={{
        '& h1, & h2, & h3, & h4': { fontWeight: 700, letterSpacing: '-0.02em', mt: 4, mb: 2 },
        '& h1': { fontSize: '2rem' },
        '& h2': { fontSize: '1.5rem' },
        '& p': { lineHeight: 1.8, mb: 2, color: 'text.primary' },
        '& a': { color: 'primary.main', textDecoration: 'underline' },
        '& blockquote': {
          borderLeft: 4,
          borderColor: 'primary.main',
          pl: 2,
          ml: 0,
          fontStyle: 'italic',
          color: 'text.secondary',
        },
        '& code': {
          bgcolor: 'action.hover',
          px: 0.75,
          py: 0.25,
          borderRadius: 0.5,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.9em',
        },
        '& pre': {
          bgcolor: 'background.paper',
          p: 2,
          borderRadius: 2,
          overflow: 'auto',
          border: 1,
          borderColor: 'divider',
        },
        '& pre code': { bgcolor: 'transparent', p: 0 },
        '& img': { maxWidth: '100%', borderRadius: 2, my: 2 },
        '& table': { width: '100%', borderCollapse: 'collapse', my: 3 },
        '& th, & td': { border: 1, borderColor: 'divider', p: 1.5, textAlign: 'left' },
        '& th': { bgcolor: 'action.hover' },
        '& ul, & ol': { pl: 3, mb: 2 },
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          img: ({ src, alt }) => (
            <Box component="img" src={src} alt={alt ?? ''} loading="lazy" sx={{ maxWidth: '100%', borderRadius: 2 }} />
          ),
          a: ({ href, children }) => (
            <Typography component="a" href={href} target="_blank" rel="noopener noreferrer" color="primary.main">
              {children}
            </Typography>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  )
}
