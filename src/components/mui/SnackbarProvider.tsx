import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { Snackbar, Alert, type AlertColor } from '@mui/material'

interface SnackbarMessage {
  id: number
  message: string
  description?: string
  severity: AlertColor
}

interface SnackbarContextValue {
  show: (message: string, options?: { description?: string; severity?: AlertColor }) => void
}

const SnackbarContext = createContext<SnackbarContextValue | null>(null)

let counter = 0

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [queue, setQueue] = useState<SnackbarMessage[]>([])
  const current = queue[0]

  const show = useCallback((message: string, options?: { description?: string; severity?: AlertColor }) => {
    counter += 1
    setQueue((prev) => [
      ...prev,
      { id: counter, message, description: options?.description, severity: options?.severity ?? 'info' },
    ])
  }, [])

  const handleClose = () => setQueue((prev) => prev.slice(1))

  return (
    <SnackbarContext.Provider value={{ show }}>
      {children}
      <Snackbar
        open={Boolean(current)}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        {current ? (
          <Alert onClose={handleClose} severity={current.severity} variant="filled" sx={{ width: '100%' }}>
            <strong>{current.message}</strong>
            {current.description && <div style={{ fontSize: '0.85rem', marginTop: 4 }}>{current.description}</div>}
          </Alert>
        ) : undefined}
      </Snackbar>
    </SnackbarContext.Provider>
  )
}

export function useSnackbar() {
  const ctx = useContext(SnackbarContext)
  if (!ctx) throw new Error('useSnackbar must be used within SnackbarProvider')
  return ctx
}

// Bridge for existing toast() calls
export function toast({ title, description }: { title?: string; description?: string }) {
  // Will be set by hook bridge
  globalToast?.(title ?? '', { description })
}

let globalToast: SnackbarContextValue['show'] | null = null

export function registerGlobalToast(show: SnackbarContextValue['show']) {
  globalToast = show
}
