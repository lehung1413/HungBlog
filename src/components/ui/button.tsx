import MuiButton from '@mui/material/Button'
import type { ButtonProps as MuiButtonProps } from '@mui/material/Button'
import { Link } from 'react-router-dom'

type Variant = 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link'
type Size = 'default' | 'sm' | 'lg' | 'icon'

interface CustomButtonProps extends Omit<MuiButtonProps, 'variant' | 'size'> {
  variant?: Variant
  size?: Size
  asChild?: boolean
}

const variantMap: Record<Variant, MuiButtonProps['variant']> = {
  default: 'contained',
  secondary: 'contained',
  outline: 'outlined',
  ghost: 'text',
  destructive: 'contained',
  link: 'text',
}

const sizeMap: Record<Size, MuiButtonProps['size']> = {
  default: 'medium',
  sm: 'small',
  lg: 'large',
  icon: 'small',
}

export function Button({
  variant = 'default',
  size = 'default',
  asChild,
  children,
  sx,
  ...props
}: CustomButtonProps) {
  const muiVariant = variantMap[variant]
  const muiColor = variant === 'destructive' ? 'error' : variant === 'secondary' ? 'secondary' : 'primary'

  if (asChild && children && typeof children === 'object' && 'props' in (children as object)) {
    const child = children as React.ReactElement<Record<string, unknown>>
    const isRouterLink = child.type === Link
    const isAnchor = child.type === 'a'

    return (
      <MuiButton
        variant={muiVariant}
        size={sizeMap[size]}
        color={muiColor}
        component={isRouterLink ? Link : isAnchor ? 'a' : 'span'}
        to={isRouterLink ? (child.props.to as string) : undefined}
        href={isAnchor ? (child.props.href as string) : undefined}
        target={isAnchor ? (child.props.target as string) : undefined}
        rel={isAnchor ? (child.props.rel as string) : undefined}
        sx={{ minWidth: size === 'icon' ? 40 : undefined, ...sx }}
        {...props}
      >
        {child.props.children as React.ReactNode}
      </MuiButton>
    )
  }

  return (
    <MuiButton
      variant={muiVariant}
      size={sizeMap[size]}
      color={muiColor}
      sx={{
        minWidth: size === 'icon' ? 40 : undefined,
        ...(variant === 'link' && { textDecoration: 'underline' }),
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiButton>
  )
}

export { type MuiButtonProps as ButtonProps }
