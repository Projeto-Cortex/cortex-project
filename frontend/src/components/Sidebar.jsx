import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const DiamondMark = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="4" transform="rotate(45 12 12)" fill="#15261a"/>
    <rect x="5" y="5" width="14" height="14" rx="3" transform="rotate(45 12 12)" fill="#1f9d5b"/>
    <rect x="9" y="5" width="7" height="14" rx="2" transform="rotate(45 12 12)" fill="#1a8a50"/>
  </svg>
)

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
  { to: '/admin/eventos',     label: 'Eventos',     Icon: IconEventos },
  { to: '/admin/calculadora', label: 'Calculadora', Icon: IconCalculadora },
]

export default function Sidebar() {
  const { user, logout } = useAuth()

  return (
    <aside className="w-[236px] bg-sidebar flex flex-col h-screen flex-shrink-0 border-r border-sidebar-border">
      {/* Brand */}
      <div className="px-4 py-5 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5">
          <DiamondMark />
          <div className="min-w-0">
            <p className="text-white text-sm font-semibold leading-tight">Cortex</p>
            <p className="text-sidebar-text text-xs leading-tight mt-0.5 truncate">Limoeiro Buffet</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-0.5">
        {links.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-sidebar-active text-white font-medium'
                  : 'text-sidebar-text font-normal hover:bg-sidebar-hover hover:text-white'
              }`
            }
          >
            <span className="flex-shrink-0 opacity-80"><Icon /></span>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Link para o site público */}
      <div className="px-2 pb-2">
        <a
          href="https://limoeiro-buffet-landing.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-sidebar-text hover:bg-sidebar-hover hover:text-white transition-colors"
        >
          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="flex-shrink-0">
            <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
          </svg>
          Ver site do Limoeiro
          <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="ml-auto flex-shrink-0 opacity-50">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
            <polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
      </div>

      {/* User */}
      <div className="px-2 py-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2.5 px-3 mb-2">
          <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 ring-1 ring-primary/30">
            <span className="text-primary text-xs font-semibold select-none">
              {user?.name?.[0]?.toUpperCase()}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-white text-xs font-medium leading-tight truncate">{user?.name}</p>
            <p className="text-sidebar-text text-[11px] leading-tight mt-0.5">
              {user?.role === 'ADMIN' ? 'Administrador' : 'Operador'}
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-sidebar-text hover:text-red-400 hover:bg-sidebar-hover transition-colors"
        >
          <IconLogout />
          Sair da conta
        </button>
      </div>
    </aside>
  )
}
