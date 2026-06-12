import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useAuth } from '../context/AuthContext'

const PAGE_TITLES = {
  '/admin/dashboard':   'Dashboard',
  '/admin/cardapios':   'Cardápios',
  '/admin/calculadora': 'Calculadora',
  '/admin/eventos':     'Eventos',
}

export default function Layout({ children }) {
  const location = useLocation()
  const { user } = useAuth()
  const title = PAGE_TITLES[location.pathname] || 'Cortex'

  return (
    <div className="flex h-screen bg-canvas">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-12 bg-white border-b border-card-border flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-ink-muted">Limoeiro</span>
            <span className="text-ink-muted">/</span>
            <span className="font-medium text-ink">{title}</span>
          </div>
          <div className="w-7 h-7 rounded-full bg-primary-subtle flex items-center justify-center">
            <span className="text-primary text-xs font-semibold select-none">
              {user?.name?.[0]?.toUpperCase()}
            </span>
          </div>
        </header>
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
