import TextField from '@mui/material/TextField'
import type { TextFieldProps } from '@mui/material/TextField'

export type InputProps = Omit<TextFieldProps, 'variant'> & {
  className?: string
}

export const Input = ({ className, sx, ...props }: InputProps) => (
  <TextField
    variant="outlined"
    size="small"
    fullWidth
    className={className}
    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 }, ...sx }}
    {...props}
  />
)
