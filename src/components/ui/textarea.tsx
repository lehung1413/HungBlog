import TextField from '@mui/material/TextField'
import type { TextFieldProps } from '@mui/material/TextField'

export type TextareaProps = Omit<TextFieldProps, 'variant'> & {
  className?: string
}

export const Textarea = ({ className, rows = 4, sx, ...props }: TextareaProps) => (
  <TextField
    variant="outlined"
    multiline
    rows={rows}
    fullWidth
    className={className}
    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 }, ...sx }}
    {...props}
  />
)
