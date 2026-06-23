import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Button from '../components/ui/Button'

export default function LoginPage() {
  const { user, login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (user) return <Navigate to="/admin/dashboard" replace />

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
    } catch (err) {
      setError(err.response?.data?.error || 'E-mail ou senha incorretos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-canvas flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-sidebar mx-auto mb-4 flex items-center justify-center shadow-xl">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white text-sm font-bold select-none">C</span>
          </div>
        </div>
        <h1 className="text-xl font-semibold text-ink">Cortex</h1>
        <p className="text-sm text-ink-muted mt-1">Limoeiro Buffet — Painel Administrativo</p>
      </div>

      {/* Card */}
      <div className="w-full max-w-sm bg-white border border-card-border rounded-xl shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="e-mail"
              className="w-full border border-card-border rounded-lg px-3 py-2 text-sm text-ink placeholder:text-ink-muted bg-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Senha</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="senha"
              className="w-full border border-card-border rounded-lg px-3 py-2 text-sm text-ink placeholder:text-ink-muted bg-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {error && (
            <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="flex-shrink-0 mt-0.5">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
              </svg>
              {error}
            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full mt-1">
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </div>

      <p className="text-xs text-ink-muted mt-6">
        Limoeiro Buffet &copy; {new Date().getFullYear()}
      </p>
    </div>
  )
}
