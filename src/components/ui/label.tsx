import FormLabel from '@mui/material/FormLabel'
import type { FormLabelProps } from '@mui/material/FormLabel'

export function Label({ children, sx, ...props }: FormLabelProps) {
  return (
    <FormLabel sx={{ display: 'block', mb: 0.5, fontSize: '0.875rem', fontWeight: 500, color: 'text.primary', ...sx }} {...props}>
      {children}
    </FormLabel>
  )
}
