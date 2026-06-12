import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Badge from '../components/ui/Badge'
import api from '../services/api'

function StatCard({ label, value, sublabel, icon }) {
  return (
    <div className="bg-white border border-card-border rounded-xl p-5">
      <div className="flex items-start justify-between mb-4">
        <span className="text-xs font-medium text-ink-muted uppercase tracking-wide">{label}</span>
        <div className="w-8 h-8 rounded-lg bg-primary-subtle flex items-center justify-center text-primary flex-shrink-0">
          {icon}
        </div>
      </div>
      {typeof value === 'string' && value.length > 8 ? (
        <>
          <p className="text-lg font-bold text-ink leading-snug">{value}</p>
          {sublabel && <p className="text-xs text-ink-muted mt-1">{sublabel}</p>}
        </>
      ) : (
        <>
          <p className="text-4xl font-bold text-ink">{value}</p>
          {sublabel && <p className="text-xs text-ink-muted mt-1">{sublabel}</p>}
        </>
      )}
    </div>
  )
}

const IconMenu = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M9 6h11M9 12h11M9 18h11"/>
    <circle cx="5" cy="6" r="1" fill="currentColor" stroke="none"/>
    <circle cx="5" cy="12" r="1" fill="currentColor" stroke="none"/>
    <circle cx="5" cy="18" r="1" fill="currentColor" stroke="none"/>
  </svg>
)

const IconCalendar = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <path d="M16 2v4M8 2v4M3 10h18"/>
  </svg>
)

const IconClock = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2"/>
  </svg>
)

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
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-ink">Visão geral</h1>
        <p className="text-sm text-ink-muted mt-1">Resumo operacional do Limoeiro Buffet</p>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-sm text-ink-muted">
          <div className="w-4 h-4 border-2 border-card-border border-t-primary rounded-full animate-spin" />
          Carregando...
        </div>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {data && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <StatCard
              label="Cardápios ativos"
              value={data.totalCardapios}
              icon={<IconMenu />}
            />
            <StatCard
              label="Eventos este mês"
              value={data.eventosMes}
              icon={<IconCalendar />}
            />
            <StatCard
              label="Próximo evento"
              value={prox ? prox.clientName : '—'}
              sublabel={
                prox
                  ? new Date(prox.date).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })
                  : undefined
              }
              icon={<IconClock />}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-ink">Próximos eventos confirmados</h2>
              <span className="text-xs text-ink-muted">{data.proximosEventos.length} evento(s)</span>
            </div>

            {data.proximosEventos.length === 0 ? (
              <div className="bg-white border border-card-border rounded-xl p-10 text-center">
                <p className="text-sm text-ink-muted">Nenhum evento confirmado próximo.</p>
              </div>
            ) : (
              <div className="bg-white border border-card-border rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-card-border bg-canvas">
                      <th className="px-5 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wide">Cliente</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wide">Tipo</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wide">Data</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wide">Convidados</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.proximosEventos.map((ev, i) => (
                      <tr
                        key={ev.id}
                        className={`hover:bg-canvas transition-colors ${
                          i < data.proximosEventos.length - 1 ? 'border-b border-card-border' : ''
                        }`}
                      >
                        <td className="px-5 py-3.5 font-medium text-ink">{ev.clientName}</td>
                        <td className="px-5 py-3.5 text-ink-light">{ev.eventType}</td>
                        <td className="px-5 py-3.5 text-ink-light">
                          {new Date(ev.date).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-5 py-3.5 text-ink-light">
                          {ev.adults + ev.children} ({ev.adults}A + {ev.children}C)
                        </td>
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
