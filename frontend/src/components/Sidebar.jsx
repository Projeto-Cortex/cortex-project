import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const IconDashboard = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <rect x="3" y="3" width="8" height="8" rx="1.5"/>
    <rect x="13" y="3" width="8" height="8" rx="1.5"/>
    <rect x="3" y="13" width="8" height="8" rx="1.5"/>
    <rect x="13" y="13" width="8" height="8" rx="1.5"/>
  </svg>
)

const IconCardapios = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M9 6h11M9 12h11M9 18h11"/>
    <circle cx="5" cy="6" r="1" fill="currentColor" stroke="none"/>
    <circle cx="5" cy="12" r="1" fill="currentColor" stroke="none"/>
    <circle cx="5" cy="18" r="1" fill="currentColor" stroke="none"/>
  </svg>
)

const IconCalculadora = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <rect x="4" y="2" width="16" height="20" rx="2"/>
    <path d="M8 7h8M8 11.5h8M8 16h5"/>
  </svg>
)

const IconEventos = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <path d="M16 2v4M8 2v4M3 10h18"/>
  </svg>
)

const IconLogout = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
    <polyline points="16,17 21,12 16,7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
)

const links = [
  { to: '/admin/dashboard',   label: 'Dashboard',   Icon: IconDashboard },
  { to: '/admin/cardapios',   label: 'Cardápios',   Icon: IconCardapios },
  { to: '/admin/calculadora', label: 'Calculadora', Icon: IconCalculadora },
  { to: '/admin/eventos',     label: 'Eventos',     Icon: IconEventos },
]

export default function Sidebar() {
  const { user, logout } = useAuth()

  return (
    <aside className="w-60 bg-sidebar flex flex-col h-screen flex-shrink-0 border-r border-sidebar-border">
      {/* Brand */}
      <div className="px-4 py-5 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0 shadow-sm">
            <span className="text-white text-sm font-bold select-none">C</span>
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-semibold leading-tight">Cortex</p>
            <p className="text-sidebar-text text-xs leading-tight mt-0.5 truncate">Limoeiro Buffet</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {links.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-sidebar-active text-white'
                  : 'text-sidebar-text hover:bg-sidebar-hover hover:text-white'
              }`
            }
          >
            <span className="flex-shrink-0"><Icon /></span>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Link para o site público */}
      <div className="px-3 pb-2">
        <a
          href="https://limoeiro-buffet-landing.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-sidebar-text hover:bg-sidebar-hover hover:text-white transition-colors"
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="flex-shrink-0">
            <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
          </svg>
          Ver site do Limoeiro
          <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="ml-auto flex-shrink-0">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
            <polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
      </div>

      {/* User */}
      <div className="px-3 py-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-2 mb-3">
          <div className="w-7 h-7 rounded-full bg-sidebar-active flex items-center justify-center flex-shrink-0 ring-1 ring-sidebar-text/30">
            <span className="text-white text-xs font-semibold select-none">
              {user?.name?.[0]?.toUpperCase()}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-white text-xs font-medium leading-tight truncate">{user?.name}</p>
            <p className="text-sidebar-text text-xs leading-tight mt-0.5">
              {user?.role === 'ADMIN' ? 'Administrador' : 'Operador'}
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-sidebar-text hover:text-red-400 hover:bg-sidebar-hover transition-colors"
        >
          <IconLogout />
          Sair da conta
        </button>
      </div>
    </aside>
  )
}
