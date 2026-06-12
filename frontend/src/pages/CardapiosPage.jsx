import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

const inputCls = "w-full border border-card-border rounded-lg px-3 py-2 text-sm text-ink placeholder:text-ink-muted bg-white focus:outline-none focus:border-primary transition-colors"
const inputSmCls = "border border-card-border rounded-md px-2 py-1.5 text-xs text-ink placeholder:text-ink-muted bg-white focus:outline-none focus:border-primary transition-colors"

const emptyItem = { nome: '', quantidade: '', unidade: '', tipo: 'ADULTO' }
const emptyForm = { nome: '', baseAdultos: 50, baseCriancas: 10, itens: [] }

export default function CardapiosPage() {
  const { user } = useAuth()
  const [cardapios, setCardapios] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState({ tipo: null, cardapio: null })
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  const isAdmin = user?.role === 'ADMIN'

  useEffect(() => {
    if (!isAdmin) return
    carregarCardapios()
  }, [isAdmin])

  async function carregarCardapios() {
    setLoading(true)
    try {
      const res = await api.get('/cardapios')
      setCardapios(res.data)
    } catch {
      // silent
    } finally {
      setLoading(false)
    }
  }

  if (!isAdmin) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <p className="text-sm text-ink-muted">Acesso restrito a administradores.</p>
        </div>
      </Layout>
    )
  }

  function abrirCriar() {
    setForm({ ...emptyForm, itens: [] })
    setFormError('')
    setModal({ tipo: 'criar', cardapio: null })
  }

  async function abrirEditar(cardapio) {
    try {
      const res = await api.get(`/cardapios/${cardapio.id}`)
      const full = res.data
      setForm({
        nome: full.nome,
        baseAdultos: full.baseAdultos,
        baseCriancas: full.baseCriancas,
        itens: full.itens.map(i => ({
          nome: i.nome,
          quantidade: i.quantidade,
          unidade: i.unidade,
          tipo: i.tipo
        }))
      })
      setFormError('')
      setModal({ tipo: 'editar', cardapio: full })
    } catch {
      alert('Erro ao carregar cardápio')
    }
  }

  function fecharModal() { setModal({ tipo: null, cardapio: null }) }

  function handleFieldChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleItemChange(index, field, value) {
    setForm(prev => {
      const itens = [...prev.itens]
      itens[index] = { ...itens[index], [field]: value }
      return { ...prev, itens }
    })
  }

  function addItem() {
    setForm(prev => ({ ...prev, itens: [...prev.itens, { ...emptyItem }] }))
  }

  function removeItem(index) {
    setForm(prev => ({ ...prev, itens: prev.itens.filter((_, i) => i !== index) }))
  }

  async function handleSalvar() {
    setSaving(true)
    setFormError('')
    try {
      const payload = {
        nome: form.nome,
        baseAdultos: parseInt(form.baseAdultos),
        baseCriancas: parseInt(form.baseCriancas),
        itens: form.itens.map(i => ({
          nome: i.nome,
          quantidade: parseFloat(i.quantidade),
          unidade: i.unidade,
          tipo: i.tipo
        }))
      }
      await api.post('/cardapios', payload)
      fecharModal()
      await carregarCardapios()
    } catch (err) {
      setFormError(err.response?.data?.error || 'Erro ao criar cardápio')
    } finally {
      setSaving(false)
    }
  }

  async function handleAtualizar() {
    setSaving(true)
    setFormError('')
    try {
      const payload = {
        nome: form.nome,
        baseAdultos: parseInt(form.baseAdultos),
        baseCriancas: parseInt(form.baseCriancas),
        itens: form.itens.map(i => ({
          nome: i.nome,
          quantidade: parseFloat(i.quantidade),
          unidade: i.unidade,
          tipo: i.tipo
        }))
      }
      await api.put(`/cardapios/${modal.cardapio.id}`, payload)
      fecharModal()
      await carregarCardapios()
    } catch (err) {
      setFormError(err.response?.data?.error || 'Erro ao atualizar cardápio')
    } finally {
      setSaving(false)
    }
  }

  async function handleDesativar(id) {
    if (!confirm('Desativar este cardápio?')) return
    try {
      await api.delete(`/cardapios/${id}`)
      await carregarCardapios()
    } catch (err) {
      alert(err.response?.data?.error || 'Erro ao desativar cardápio')
    }
  }

  const canSave = form.itens.length > 0

  return (
    <Layout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Cardápios</h1>
          <p className="text-sm text-ink-muted mt-1">Gerencie os cardápios e seus itens</p>
        </div>
        <Button onClick={abrirCriar}>+ Novo cardápio</Button>
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
                <th className="px-5 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wide">Nome</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wide">Base adultos</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wide">Base crianças</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wide">Itens</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wide">Ações</th>
              </tr>
            </thead>
            <tbody>
              {cardapios.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-5 py-10 text-center text-sm text-ink-muted">
                    Nenhum cardápio cadastrado.
                  </td>
                </tr>
              )}
              {cardapios.map((c, i) => (
                <tr
                  key={c.id}
                  className={`hover:bg-canvas transition-colors ${
                    i < cardapios.length - 1 ? 'border-b border-card-border' : ''
                  }`}
                >
                  <td className="px-5 py-3.5 font-medium text-ink">{c.nome}</td>
                  <td className="px-5 py-3.5 text-ink-light">{c.baseAdultos}</td>
                  <td className="px-5 py-3.5 text-ink-light">{c.baseCriancas}</td>
                  <td className="px-5 py-3.5 text-ink-light">
                    {c._count?.itens !== undefined ? `${c._count.itens} itens` : '—'}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm" onClick={() => abrirEditar(c)}>
                        Editar
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleDesativar(c.id)}>
                        Desativar
                      </Button>
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
        title={modal.tipo === 'criar' ? 'Novo Cardápio' : 'Editar Cardápio'}
      >
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Nome do cardápio</label>
            <input name="nome" value={form.nome} onChange={handleFieldChange} className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Base adultos</label>
              <input type="number" min="1" name="baseAdultos" value={form.baseAdultos} onChange={handleFieldChange} className={inputCls} />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Base crianças</label>
              <input type="number" min="0" name="baseCriancas" value={form.baseCriancas} onChange={handleFieldChange} className={inputCls} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-ink">Itens do cardápio</span>
              <button
                onClick={addItem}
                className="text-xs font-medium text-primary hover:text-primary-dark transition-colors"
              >
                + Adicionar item
              </button>
            </div>
            <div className="max-h-64 overflow-y-auto space-y-1.5 border border-card-border rounded-lg p-2 bg-canvas">
              {form.itens.length === 0 && (
                <p className="text-xs text-ink-muted text-center py-3">
                  Nenhum item. Clique em "+ Adicionar item".
                </p>
              )}
              {form.itens.map((item, i) => (
                <div key={i} className="grid grid-cols-12 gap-1.5 items-center bg-white rounded-md p-1.5 border border-card-border">
                  <input
                    className={`col-span-4 ${inputSmCls}`}
                    placeholder="Item"
                    value={item.nome}
                    onChange={e => handleItemChange(i, 'nome', e.target.value)}
                  />
                  <input
                    type="number"
                    className={`col-span-2 ${inputSmCls}`}
                    placeholder="Qtd"
                    value={item.quantidade}
                    onChange={e => handleItemChange(i, 'quantidade', e.target.value)}
                  />
                  <input
                    className={`col-span-2 ${inputSmCls}`}
                    placeholder="un/kg"
                    value={item.unidade}
                    onChange={e => handleItemChange(i, 'unidade', e.target.value)}
                  />
                  <select
                    className={`col-span-3 ${inputSmCls}`}
                    value={item.tipo}
                    onChange={e => handleItemChange(i, 'tipo', e.target.value)}
                  >
                    <option value="ADULTO">Adulto</option>
                    <option value="CRIANCA">Criança</option>
                    <option value="FIXO">Fixo</option>
                  </select>
                  <button
                    onClick={() => removeItem(i)}
                    className="col-span-1 flex items-center justify-center text-ink-muted hover:text-red-500 transition-colors"
                    title="Remover item"
                  >
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

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
          <Button
            onClick={modal.tipo === 'criar' ? handleSalvar : handleAtualizar}
            disabled={saving || !canSave}
            title={!canSave ? 'Adicione ao menos 1 item' : undefined}
          >
            {saving ? 'Salvando...' : modal.tipo === 'criar' ? 'Criar cardápio' : 'Salvar alterações'}
          </Button>
        </div>
      </Modal>
    </Layout>
  )
}
