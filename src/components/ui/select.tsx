import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MuiSelect from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { createContext, useContext } from 'react'

interface SelectContextValue {
  value?: string
  onValueChange?: (v: string) => void
  label?: string
}

const SelectContext = createContext<SelectContextValue>({})

export function Select({ value, onValueChange, children }: { value?: string; onValueChange?: (v: string) => void; children: React.ReactNode }) {
  return (
    <SelectContext.Provider value={{ value, onValueChange }}>
      <FormControl fullWidth size="small">{children}</FormControl>
    </SelectContext.Provider>
  )
}

export function SelectTrigger({ children, className }: { children?: React.ReactNode; className?: string }) {
  const { value, onValueChange } = useContext(SelectContext)
  return (
    <MuiSelect value={value ?? ''} onChange={(e) => onValueChange?.(e.target.value as string)} displayEmpty className={className}>
      {children}
    </MuiSelect>
  )
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const { value } = useContext(SelectContext)
  return <>{value || placeholder}</>
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  return <MenuItem value={value}>{children}</MenuItem>
}

export function SelectLabel({ children }: { children: React.ReactNode }) {
  return <InputLabel>{children}</InputLabel>
}
