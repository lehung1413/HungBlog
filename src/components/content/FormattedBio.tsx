import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { splitBioParagraphs } from '@/lib/utils'

interface FormattedBioProps {
  text: string
}

export function FormattedBio({ text }: FormattedBioProps) {
  const paragraphs = splitBioParagraphs(text)

  if (paragraphs.length === 0) return null

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {paragraphs.map((paragraph, index) => (
        <Typography
          key={index}
          variant="body1"
          color="text.secondary"
          sx={{ lineHeight: 1.9, fontSize: '1.05rem', m: 0 }}
        >
          {paragraph}
        </Typography>
      ))}
    </Box>
  )
}
