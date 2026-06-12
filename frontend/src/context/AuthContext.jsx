import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { login as loginService, getMe } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('cortex_token')
    if (!token) { setLoading(false); return }
    getMe()
      .then(res => setUser(res.data))
      .catch(() => localStorage.removeItem('cortex_token'))
      .finally(() => setLoading(false))
  }, [])

  async function login(email, password) {
    const res = await loginService(email, password)
    localStorage.setItem('cortex_token', res.data.token)
    setUser(res.data.user)
    navigate('/admin/dashboard')
  }

  function logout() {
    localStorage.removeItem('cortex_token')
    setUser(null)
    navigate('/admin/login')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
