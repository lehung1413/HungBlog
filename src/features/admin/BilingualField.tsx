import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import type { LocalizedText } from '@/types/models'

interface BilingualFieldProps {
  label: string
  value: LocalizedText
  onChange: (value: LocalizedText) => void
  multiline?: boolean
}

export function BilingualField({ label, value, onChange, multiline = false }: BilingualFieldProps) {
  return (
    <Box>
      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
        {label}
      </Typography>
      <Tabs defaultValue="en">
        <TabsList>
          <TabsTrigger value="en">EN</TabsTrigger>
          <TabsTrigger value="vi">VI</TabsTrigger>
        </TabsList>
        <TabsContent value="en">
          <TextField
            value={value.en}
            onChange={(e) => onChange({ ...value, en: e.target.value })}
            multiline={multiline}
            rows={multiline ? 4 : undefined}
            fullWidth
            size="small"
          />
        </TabsContent>
        <TabsContent value="vi">
          <TextField
            value={value.vi}
            onChange={(e) => onChange({ ...value, vi: e.target.value })}
            multiline={multiline}
            rows={multiline ? 4 : undefined}
            fullWidth
            size="small"
          />
        </TabsContent>
      </Tabs>
    </Box>
  )
}
