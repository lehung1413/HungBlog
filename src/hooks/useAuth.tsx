import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase, adminEmail } from '@/lib/supabase'
import { promoteAdminIfEligible } from '@/services/posts.service'

interface AuthContextValue {
  user: User | null
  session: Session | null
  isAdmin: boolean
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  const checkAdmin = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', userId)
      .maybeSingle()

    if (error) {
      console.error(error)
      return false
    }
    return data?.is_admin ?? false
  }, [])

  useEffect(() => {
    void supabase.auth.getSession().then(async ({ data: { session: s } }) => {
      setSession(s)
      setUser(s?.user ?? null)
      if (s?.user) {
        setIsAdmin(await checkAdmin(s.user.id))
      }
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, s) => {
      setSession(s)
      setUser(s?.user ?? null)
      if (s?.user) {
        setIsAdmin(await checkAdmin(s.user.id))
      } else {
        setIsAdmin(false)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [checkAdmin])

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error

    if (data.user && adminEmail && data.user.email?.toLowerCase() === adminEmail.toLowerCase()) {
      await promoteAdminIfEligible(data.user.id, data.user.email)
      setIsAdmin(await checkAdmin(data.user.id))
    } else if (data.user) {
      const admin = await checkAdmin(data.user.id)
      if (!admin) {
        await supabase.auth.signOut()
        throw new Error('Unauthorized: admin access only')
      }
      setIsAdmin(admin)
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    setIsAdmin(false)
  }

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
