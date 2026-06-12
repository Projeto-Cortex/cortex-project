import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/cardapios', label: 'Cardápios' },
  { to: '/admin/calculadora', label: 'Calculadora' },
  { to: '/admin/eventos', label: 'Eventos' }
]

export default function Sidebar() {
  const { user, logout } = useAuth()

  return (
    <aside className="w-60 bg-sidebar flex flex-col h-screen flex-shrink-0">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-white font-bold text-xl">Cortex</h1>
        <p className="text-sidebar-text text-sm mt-1">Limoeiro Buffet</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-sidebar-hover text-sidebar-active'
                  : 'text-sidebar-text hover:bg-sidebar-hover hover:text-white'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <p className="text-white text-sm font-medium mb-2">{user?.name}</p>
        <button
          onClick={logout}
          className="w-full text-left text-sm text-red-400 hover:text-red-300 transition-colors"
        >
          Sair
        </button>
      </div>
    </aside>
  )
}
