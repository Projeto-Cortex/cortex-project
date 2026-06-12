import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import CalculadoraPage from './pages/CalculadoraPage'
import CardapiosPage from './pages/CardapiosPage'
import EventosPage from './pages/EventosPage'

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/login" replace />} />
      <Route path="/admin/login" element={<LoginPage />} />
      <Route path="/admin/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/admin/calculadora" element={<ProtectedRoute><CalculadoraPage /></ProtectedRoute>} />
      <Route path="/admin/cardapios" element={<ProtectedRoute><CardapiosPage /></ProtectedRoute>} />
      <Route path="/admin/eventos" element={<ProtectedRoute><EventosPage /></ProtectedRoute>} />
    </Routes>
  )
}
