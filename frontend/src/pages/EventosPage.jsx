import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import Modal from '../components/ui/Modal'
import api from '../services/api'

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

  function fecharModal() {
    setModal({ tipo: null, evento: null })
  }

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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Eventos</h1>
        <Button onClick={abrirCriar}>+ Novo evento</Button>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 mb-4">
        {STATUS_LIST.map(s => (
          <button
            key={s}
            onClick={() => setFiltroStatus(s)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
              filtroStatus === s
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-500">Carregando...</p>
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
                <th className="px-4 py-3 font-medium">Cardápio</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {eventosFiltrados.length === 0 && (
                <tr>
                  <td colSpan="8" className="px-4 py-6 text-center text-gray-500">
                    Nenhum evento encontrado.
                  </td>
                </tr>
              )}
              {eventosFiltrados.map(ev => (
                <tr key={ev.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-800 font-medium">{ev.clientName}</td>
                  <td className="px-4 py-3 text-gray-600">{ev.eventType}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {new Date(ev.date).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{ev.adults}</td>
                  <td className="px-4 py-3 text-gray-600">{ev.children}</td>
                  <td className="px-4 py-3 text-gray-600">{ev.cardapio?.nome ?? '—'}</td>
                  <td className="px-4 py-3"><Badge status={ev.status} /></td>
                  <td className="px-4 py-3 flex gap-2">
                    <Button variant="secondary" className="text-xs px-2 py-1" onClick={() => abrirEditar(ev)}>
                      Editar
                    </Button>
                    {ev.status === 'PENDING' && (
                      <Button variant="danger" className="text-xs px-2 py-1" onClick={() => handleExcluir(ev.id)}>
                        Excluir
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal criar/editar */}
      <Modal
        isOpen={modal.tipo !== null}
        onClose={fecharModal}
        title={modal.tipo === 'criar' ? 'Novo Evento' : 'Editar Evento'}
      >
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome do cliente</label>
            <input name="clientName" value={form.clientName} onChange={handleFormChange}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo do evento</label>
            <input name="eventType" value={form.eventType} onChange={handleFormChange}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
            <input type="date" name="date" value={form.date} onChange={handleFormChange}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adultos</label>
              <input type="number" name="adults" min="0" value={form.adults} onChange={handleFormChange}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Crianças</label>
              <input type="number" name="children" min="0" value={form.children} onChange={handleFormChange}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cardápio</label>
            <select name="cardapioId" value={form.cardapioId} onChange={handleFormChange}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Sem cardápio</option>
              {cardapios.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Observação</label>
            <input name="notes" value={form.notes} onChange={handleFormChange}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          {modal.tipo === 'editar' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select name="status" value={form.status} onChange={handleFormChange}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="PENDING">Pendente</option>
                <option value="CONFIRMED">Confirmado</option>
                <option value="CANCELLED">Cancelado</option>
              </select>
            </div>
          )}

          {formError && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
              {formError}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="secondary" onClick={fecharModal}>Cancelar</Button>
          <Button
            onClick={modal.tipo === 'criar' ? handleSalvar : handleAtualizar}
            disabled={saving}
          >
            {saving ? 'Salvando...' : modal.tipo === 'criar' ? 'Salvar' : 'Salvar alterações'}
          </Button>
        </div>
      </Modal>
    </Layout>
  )
}
