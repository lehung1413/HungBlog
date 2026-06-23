import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MuiSelect, { type SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Children, isValidElement, type ReactElement, type ReactNode } from 'react'

interface SelectItemProps {
  value: string
  children: ReactNode
}

interface SelectValueProps {
  placeholder?: string
}

function isSelectItem(child: ReactNode): child is ReactElement<SelectItemProps> {
  return isValidElement(child) && child.type === SelectItem
}

interface SelectTriggerProps {
  children?: ReactNode
  className?: string
}

interface SelectContentProps {
  children: ReactNode
}

interface SelectLabelProps {
  children: ReactNode
}

function collectSelectParts(children: ReactNode) {
  let items: ReactElement<SelectItemProps>[] = []
  let placeholder: string | undefined
  let label: ReactNode
  let className: string | undefined

  Children.forEach(children, (child) => {
    if (!isValidElement<SelectTriggerProps | SelectContentProps | SelectLabelProps>(child)) return

    if (child.type === SelectTrigger) {
      const props = child.props as SelectTriggerProps
      className = props.className
      Children.forEach(props.children, (grandChild) => {
        if (isValidElement<SelectValueProps>(grandChild) && grandChild.type === SelectValue) {
          placeholder = grandChild.props.placeholder
        }
      })
    }

    if (child.type === SelectContent) {
      const props = child.props as SelectContentProps
      Children.forEach(props.children, (item) => {
        if (isSelectItem(item)) items.push(item)
      })
    }

    if (child.type === SelectLabel) {
      label = (child.props as SelectLabelProps).children
    }
  })

  return { items, placeholder, label, className }
}

export function Select({
  value,
  onValueChange,
  children,
}: {
  value?: string
  onValueChange?: (v: string) => void
  children: ReactNode
}) {
  const { items, placeholder, label, className } = collectSelectParts(children)
  const labelId = label ? 'select-label' : undefined

  const handleChange = (event: SelectChangeEvent) => {
    onValueChange?.(event.target.value)
  }

  const renderValue = (selected: string) => {
    if (!selected) return placeholder ?? '—'
    const match = items.find((item) => item.props.value === selected)
    return match?.props.children ?? selected
  }

  return (
    <FormControl fullWidth size="small" className={className}>
      {label && <InputLabel id={labelId}>{label}</InputLabel>}
      <MuiSelect
        labelId={labelId}
        label={label ? String(label) : undefined}
        value={value ?? ''}
        onChange={handleChange}
        displayEmpty
        renderValue={renderValue}
      >
        {items.map((item) => (
          <MenuItem key={item.props.value} value={item.props.value}>
            {item.props.children}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  )
}

/** Marker components — parsed by Select, not rendered directly */
export function SelectTrigger(_props: { children?: ReactNode; className?: string }) {
  return null
}

export function SelectValue(_props: SelectValueProps) {
  return null
}

export function SelectContent(_props: { children: ReactNode }) {
  return null
}

export function SelectItem(_props: SelectItemProps) {
  return null
}

export function SelectLabel(_props: SelectLabelProps) {
  return null
}
