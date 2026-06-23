import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Badge from '../components/ui/Badge'
import api from '../services/api'

const SquareIndicator = () => <span className="w-2.5 h-2.5 rounded-sm bg-primary inline-block flex-shrink-0" />
const CircleIndicator = () => <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block flex-shrink-0" />
const DiamondIndicator = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
    <rect x="1" y="1" width="9" height="9" rx="2" transform="rotate(45 5.5 5.5)" fill="#1f9d5b"/>
  </svg>
)

function StatCard({ label, value, sublabel, Indicator }) {
  return (
    <div className="bg-white border border-card-border rounded-xl p-5">
      <div className="flex items-start justify-between mb-3">
        <span className="text-[13px] font-medium text-ink-muted">{label}</span>
        <Indicator />
      </div>
      <p className="text-[30px] font-semibold text-ink leading-none tabular-nums">{value}</p>
      {sublabel && <p className="text-xs text-ink-muted mt-1.5">{sublabel}</p>}
    </div>
  )
}

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
      <div className="mb-7">
        <h1 className="text-2xl font-semibold text-ink tracking-tight">Dashboard</h1>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-7">
            <StatCard
              label="Total de cardápios"
              value={data.totalCardapios}
              Indicator={SquareIndicator}
            />
            <StatCard
              label="Eventos no mês"
              value={data.eventosMes}
              Indicator={CircleIndicator}
            />
            <StatCard
              label="Próximos eventos"
              value={data.proximosEventos?.length ?? 0}
              sublabel={prox
                ? `próx: ${new Date(prox.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}`
                : 'próximos 30 dias'}
              Indicator={DiamondIndicator}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[15px] font-semibold text-ink">Próximos eventos</h2>
              <a href="/admin/eventos" className="text-xs text-primary hover:text-primary-dark transition-colors font-medium">Ver todos</a>
            </div>

            {data.proximosEventos.length === 0 ? (
              <div className="bg-white border border-card-border rounded-xl p-10 text-center">
                <p className="text-sm text-ink-muted">Nenhum evento confirmado próximo.</p>
              </div>
            ) : (
              <div className="bg-white border border-card-border rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#f2f4f2]">
                      <th className="px-5 py-3 text-left text-[11px] font-medium text-ink-muted uppercase tracking-widest">Evento</th>
                      <th className="px-5 py-3 text-left text-[11px] font-medium text-ink-muted uppercase tracking-widest">Data</th>
                      <th className="px-5 py-3 text-left text-[11px] font-medium text-ink-muted uppercase tracking-widest">Convidados</th>
                      <th className="px-5 py-3 text-left text-[11px] font-medium text-ink-muted uppercase tracking-widest">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.proximosEventos.map((ev, i) => (
                      <tr
                        key={ev.id}
                        className={`hover:bg-[#fafbfa] transition-colors ${
                          i < data.proximosEventos.length - 1 ? 'border-b border-[#f2f4f2]' : ''
                        }`}
                      >
                        <td className="px-5 py-4 font-medium text-ink">{ev.clientName}</td>
                        <td className="px-5 py-4 text-ink-light">
                          {new Date(ev.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                        </td>
                        <td className="px-5 py-4 text-ink-light">{ev.adults + ev.children}</td>
                        <td className="px-5 py-4"><Badge status={ev.status} /></td>
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
