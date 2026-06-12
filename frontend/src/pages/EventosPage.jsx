import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import Modal from '../components/ui/Modal'
import api from '../services/api'

const inputCls = "w-full border border-card-border rounded-lg px-3 py-2 text-sm text-ink placeholder:text-ink-muted bg-white focus:outline-none focus:border-primary transition-colors"

const STATUS_LABELS = { TODOS: 'Todos', PENDING: 'Pendente', CONFIRMED: 'Confirmado', CANCELLED: 'Cancelado' }
const STATUS_LIST = ['TODOS', 'PENDING', 'CONFIRMED', 'CANCELLED']

const emptyForm = {
  clientName: '', eventType: '', date: '', adults: 0,
  children: 0, cardapioId: '', notes: '', status: 'PENDING'
}

function toDateInput(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toISOString().split('T')[0]
}

export default function EventosPage() {
  const [eventos, setEventos] = useState([])
  const [filtroStatus, setFiltroStatus] = useState('TODOS')
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState({ tipo: null, evento: null })
  const [form, setForm] = useState(emptyForm)
  const [cardapios, setCardapios] = useState([])
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  async function carregarEventos() {
    setLoading(true)
    try {
      const res = await api.get('/events')
      setEventos(res.data)
    } catch {
      // silent
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarEventos()
    api.get('/cardapios').then(res => setCardapios(res.data)).catch(() => {})
  }, [])

  function abrirCriar() {
    setForm(emptyForm)
    setFormError('')
    setModal({ tipo: 'criar', evento: null })
  }

  function abrirEditar(evento) {
    setForm({
      clientName: evento.clientName,
      eventType: evento.eventType,
      date: toDateInput(evento.date),
      adults: evento.adults,
      children: evento.children,
      cardapioId: evento.cardapioId ?? '',
      notes: evento.notes ?? '',
      status: evento.status
    })
    setFormError('')
    setModal({ tipo: 'editar', evento })
  }

  function fecharModal() { setModal({ tipo: null, evento: null }) }

  function handleFormChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleSalvar() {
    setSaving(true)
    setFormError('')
    try {
      const payload = {
        clientName: form.clientName,
        eventType: form.eventType,
        date: form.date,
        adults: parseInt(form.adults) || 0,
        children: parseInt(form.children) || 0,
        cardapioId: form.cardapioId || null,
        notes: form.notes || null
      }
      await api.post('/events', payload)
      fecharModal()
      await carregarEventos()
    } catch (err) {
      setFormError(err.response?.data?.error || 'Erro ao criar evento')
    } finally {
      setSaving(false)
    }
  }

  async function handleAtualizar() {
    setSaving(true)
    setFormError('')
    try {
      const payload = {
        clientName: form.clientName,
        eventType: form.eventType,
        date: form.date,
        adults: parseInt(form.adults) || 0,
        children: parseInt(form.children) || 0,
        cardapioId: form.cardapioId || null,
        notes: form.notes || null,
        status: form.status
      }
      await api.put(`/events/${modal.evento.id}`, payload)
      fecharModal()
      await carregarEventos()
    } catch (err) {
      setFormError(err.response?.data?.error || 'Erro ao atualizar evento')
    } finally {
      setSaving(false)
    }
  }

  async function handleExcluir(id) {
    if (!confirm('Tem certeza que deseja remover este evento?')) return
    try {
      await api.delete(`/events/${id}`)
      await carregarEventos()
    } catch (err) {
      alert(err.response?.data?.error || 'Erro ao remover evento')
    }
  }

  const eventosFiltrados = filtroStatus === 'TODOS'
    ? eventos
    : eventos.filter(e => e.status === filtroStatus)

  return (
    <Layout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Eventos</h1>
          <p className="text-sm text-ink-muted mt-1">Gerencie os eventos e reservas do buffet</p>
        </div>
        <Button onClick={abrirCriar}>+ Novo evento</Button>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 mb-5">
        {STATUS_LIST.map(s => (
          <button
            key={s}
            onClick={() => setFiltroStatus(s)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
              filtroStatus === s
                ? 'bg-primary text-white border-primary shadow-sm'
                : 'bg-white text-ink-light border-card-border hover:bg-canvas hover:text-ink'
            }`}
          >
            {STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-ink-muted">
          <div className="w-4 h-4 border-2 border-card-border border-t-primary rounded-full animate-spin" />
          Carregando...
        </div>
      ) : (
        <div className="bg-white border border-card-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-card-border bg-canvas">
                <th className="px-5 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wide">Cliente</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wide">Tipo</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wide">Data</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wide">Adultos</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wide">Crianças</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wide">Cardápio</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wide">Status</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wide">Ações</th>
              </tr>
            </thead>
            <tbody>
              {eventosFiltrados.length === 0 && (
                <tr>
                  <td colSpan="8" className="px-5 py-10 text-center text-sm text-ink-muted">
                    Nenhum evento encontrado.
                  </td>
                </tr>
              )}
              {eventosFiltrados.map((ev, i) => (
                <tr
                  key={ev.id}
                  className={`hover:bg-canvas transition-colors ${
                    i < eventosFiltrados.length - 1 ? 'border-b border-card-border' : ''
                  }`}
                >
                  <td className="px-5 py-3.5 font-medium text-ink">{ev.clientName}</td>
                  <td className="px-5 py-3.5 text-ink-light">{ev.eventType}</td>
                  <td className="px-5 py-3.5 text-ink-light">
                    {new Date(ev.date).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-5 py-3.5 text-ink-light">{ev.adults}</td>
                  <td className="px-5 py-3.5 text-ink-light">{ev.children}</td>
                  <td className="px-5 py-3.5 text-ink-light">{ev.cardapio?.nome ?? '—'}</td>
                  <td className="px-5 py-3.5"><Badge status={ev.status} /></td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm" onClick={() => abrirEditar(ev)}>
                        Editar
                      </Button>
                      {ev.status === 'PENDING' && (
                        <Button variant="danger" size="sm" onClick={() => handleExcluir(ev.id)}>
                          Excluir
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={modal.tipo !== null}
        onClose={fecharModal}
        title={modal.tipo === 'criar' ? 'Novo Evento' : 'Editar Evento'}
      >
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Nome do cliente</label>
            <input name="clientName" value={form.clientName} onChange={handleFormChange} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Tipo do evento</label>
            <input name="eventType" value={form.eventType} onChange={handleFormChange} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Data</label>
            <input type="date" name="date" value={form.date} onChange={handleFormChange} className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Adultos</label>
              <input type="number" name="adults" min="0" value={form.adults} onChange={handleFormChange} className={inputCls} />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Crianças</label>
              <input type="number" name="children" min="0" value={form.children} onChange={handleFormChange} className={inputCls} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Cardápio</label>
            <select name="cardapioId" value={form.cardapioId} onChange={handleFormChange} className={inputCls}>
              <option value="">Sem cardápio</option>
              {cardapios.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Observação</label>
            <input name="notes" value={form.notes} onChange={handleFormChange} className={inputCls} />
          </div>
          {modal.tipo === 'editar' && (
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Status</label>
              <select name="status" value={form.status} onChange={handleFormChange} className={inputCls}>
                <option value="PENDING">Pendente</option>
                <option value="CONFIRMED">Confirmado</option>
                <option value="CANCELLED">Cancelado</option>
              </select>
            </div>
          )}

          {formError && (
            <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="flex-shrink-0 mt-0.5">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
              </svg>
              {formError}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-5">
          <Button variant="secondary" onClick={fecharModal}>Cancelar</Button>
          <Button onClick={modal.tipo === 'criar' ? handleSalvar : handleAtualizar} disabled={saving}>
            {saving ? 'Salvando...' : modal.tipo === 'criar' ? 'Criar evento' : 'Salvar alterações'}
          </Button>
        </div>
      </Modal>
    </Layout>
  )
}
