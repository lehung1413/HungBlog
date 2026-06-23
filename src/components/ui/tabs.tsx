import { createContext, useContext, useState } from 'react'
import MuiTabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

interface TabsContextValue {
  value: string
  setValue: (v: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

export function Tabs({ defaultValue, children, className }: { defaultValue?: string; children: React.ReactNode; className?: string }) {
  const [value, setValue] = useState(defaultValue ?? '')
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <Box className={className}>{children}</Box>
    </TabsContext.Provider>
  )
}

export function TabsList({ children, className }: { children: React.ReactNode; className?: string }) {
  const ctx = useContext(TabsContext)
  if (!ctx) return null
  return (
    <MuiTabs value={ctx.value} onChange={(_e, v: string) => ctx.setValue(v)} sx={{ minHeight: 40, mb: 1 }} className={className}>
      {children}
    </MuiTabs>
  )
}

export function TabsTrigger({ value, children }: { value: string; children: React.ReactNode }) {
  return <Tab label={children} value={value} sx={{ minHeight: 40, py: 0 }} />
}

export function TabsContent({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  const ctx = useContext(TabsContext)
  if (!ctx || ctx.value !== value) return null
  return <Box className={className}>{children}</Box>
}
