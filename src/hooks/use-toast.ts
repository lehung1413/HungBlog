import { useEffect } from 'react'
import { registerGlobalToast, useSnackbar } from '@/components/mui/SnackbarProvider'

export type ToastProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function toast({ title, description }: { title?: string; description?: string }) {
  globalShow?.(title ?? '', { description })
}

let globalShow: ((message: string, options?: { description?: string }) => void) | null = null

export function useToast() {
  const { show } = useSnackbar()

  useEffect(() => {
    registerGlobalToast(show)
    globalShow = show
  }, [show])

  return {
    toasts: [],
    toast,
    dismiss: () => undefined,
  }
}

export function Toaster() {
  return null
}
