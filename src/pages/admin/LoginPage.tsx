import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { Seo } from '@/components/Seo'
import { useAuth } from '@/hooks/useAuth'
import { toast } from '@/hooks/use-toast'

export function LoginPage() {
  const { t } = useTranslation()
  const { signIn, isAdmin, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!loading && isAdmin) {
    return <Navigate to="/admin" replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await signIn(email, password)
    } catch (err) {
      toast({
        title: t('common.error'),
        description: err instanceof Error ? err.message : 'Login failed',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Seo title={t('admin.loginTitle')} />
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2, bgcolor: 'background.default' }}>
        <Card elevation={0} sx={{ width: '100%', maxWidth: 420 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }} gutterBottom>
              {t('admin.loginTitle')}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Stack spacing={2.5}>
                <TextField
                  label={t('common.email')}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                />
                <TextField
                  label={t('common.password')}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                />
                <Button type="submit" variant="contained" size="large" disabled={submitting} fullWidth>
                  {submitting ? t('common.loading') : t('common.login')}
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}
