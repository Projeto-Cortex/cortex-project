import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Button from '../components/ui/Button'

const DiamondMark = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="26" height="26" rx="6" transform="rotate(45 18 18)" fill="#0d1a12"/>
    <rect x="9" y="9" width="18" height="18" rx="4" transform="rotate(45 18 18)" fill="#1f9d5b"/>
    <rect x="14" y="9" width="9" height="18" rx="2" transform="rotate(45 18 18)" fill="#1a8a50"/>
  </svg>
)

const inputCls = "w-full border border-card-border rounded-lg px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted bg-white focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/[.14] transition-all"

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
      <div className="w-full max-w-[380px]">
        {/* Marca */}
        <div className="text-center mb-5">
          <div className="flex justify-center mb-5">
            <DiamondMark />
          </div>
          <h1 className="text-2xl font-semibold text-ink tracking-tight">Cortex</h1>
          <p className="text-[13px] text-ink-muted mt-1">Limoeiro Buffet — Painel Administrativo</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-card-border rounded-xl shadow-sm px-9 py-10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            <div>
              <label className="block text-[13px] font-medium text-ink mb-1.5">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="e-mail"
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-ink mb-1.5">Senha</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="senha"
                className={inputCls}
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 text-[13px] text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="flex-shrink-0 mt-0.5">
                  <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
                </svg>
                {error}
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full mt-1 py-2.5">
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </div>

        <p className="text-xs text-ink-muted text-center mt-6">
          Limoeiro Buffet &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  )
}
