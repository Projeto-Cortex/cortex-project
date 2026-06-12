import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import api from '../services/api'

export default function DashboardPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/dashboard')
      .then(res => setData(res.data))
      .catch(() => setError('Erro ao carregar dashboard'))
      .finally(() => setLoading(false))
  }, [])

  const prox = data?.proximosEventos?.[0]

  return (
    <Layout>
      <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>

      {loading && <p className="text-gray-500 mt-6">Carregando...</p>}
      {error && <p className="text-red-600 mt-6">{error}</p>}

      {data && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="text-3xl mb-2">📦</div>
              <p className="text-sm text-gray-500">Cardápios ativos</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{data.totalCardapios}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="text-3xl mb-2">📅</div>
              <p className="text-sm text-gray-500">Eventos este mês</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{data.eventosMes}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="text-3xl mb-2">🎉</div>
              <p className="text-sm text-gray-500">Próximo evento</p>
              {prox ? (
                <>
                  <p className="text-lg font-semibold text-gray-800 mt-1">{prox.clientName}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(prox.date).toLocaleDateString('pt-BR')}
                  </p>
                </>
              ) : (
                <p className="text-lg font-semibold text-gray-800 mt-1">Nenhum</p>
              )}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Próximos eventos confirmados</h2>
            {data.proximosEventos.length === 0 ? (
              <p className="text-sm text-gray-500">Nenhum evento confirmado próximo.</p>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-500 text-left">
                    <tr>
                      <th className="px-4 py-3 font-medium">Cliente</th>
                      <th className="px-4 py-3 font-medium">Tipo</th>
                      <th className="px-4 py-3 font-medium">Data</th>
                      <th className="px-4 py-3 font-medium">Adultos</th>
                      <th className="px-4 py-3 font-medium">Crianças</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data.proximosEventos.map(ev => (
                      <tr key={ev.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-800 font-medium">{ev.clientName}</td>
                        <td className="px-4 py-3 text-gray-600">{ev.eventType}</td>
                        <td className="px-4 py-3 text-gray-600">
                          {new Date(ev.date).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-4 py-3 text-gray-600">{ev.adults}</td>
                        <td className="px-4 py-3 text-gray-600">{ev.children}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </Layout>
  )
}
