import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

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
          <p className="text-gray-500 text-lg">Acesso restrito a administradores</p>
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Cardápios</h1>
          <p className="text-sm text-gray-500 mt-1">Gerencie os cardápios e seus itens</p>
        </div>
        <Button onClick={abrirCriar}>+ Novo cardápio</Button>
      </div>

      {loading ? (
        <p className="text-gray-500">Carregando...</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Nome</th>
                <th className="px-4 py-3 font-medium">Base adultos</th>
                <th className="px-4 py-3 font-medium">Base crianças</th>
                <th className="px-4 py-3 font-medium">Itens</th>
                <th className="px-4 py-3 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cardapios.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                    Nenhum cardápio encontrado.
                  </td>
                </tr>
              )}
              {cardapios.map(c => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-800 font-medium">{c.nome}</td>
                  <td className="px-4 py-3 text-gray-600">{c.baseAdultos}</td>
                  <td className="px-4 py-3 text-gray-600">{c.baseCriancas}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {c._count?.itens !== undefined ? `${c._count.itens} itens` : '—'}
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <Button variant="secondary" className="text-xs px-2 py-1" onClick={() => abrirEditar(c)}>
                      Editar
                    </Button>
                    <Button variant="danger" className="text-xs px-2 py-1" onClick={() => handleDesativar(c.id)}>
                      Desativar
                    </Button>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome do cardápio</label>
            <input name="nome" value={form.nome} onChange={handleFieldChange}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Base adultos</label>
              <input type="number" min="1" name="baseAdultos" value={form.baseAdultos} onChange={handleFieldChange}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Base crianças</label>
              <input type="number" min="0" name="baseCriancas" value={form.baseCriancas} onChange={handleFieldChange}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-700">Itens do cardápio</h3>
              <button onClick={addItem}
                className="text-sm text-primary hover:text-primary-dark font-medium">
                + Adicionar item
              </button>
            </div>
            <div className="max-h-72 overflow-y-auto space-y-2">
              {form.itens.length === 0 && (
                <p className="text-xs text-gray-400 text-center py-2">Nenhum item. Clique em "+ Adicionar item".</p>
              )}
              {form.itens.map((item, i) => (
                <div key={i} className="grid grid-cols-12 gap-1 items-center">
                  <input
                    className="col-span-4 border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Item"
                    value={item.nome}
                    onChange={e => handleItemChange(i, 'nome', e.target.value)}
                  />
                  <input
                    type="number"
                    className="col-span-2 border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Qtd"
                    value={item.quantidade}
                    onChange={e => handleItemChange(i, 'quantidade', e.target.value)}
                  />
                  <input
                    className="col-span-2 border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="un/kg/L"
                    value={item.unidade}
                    onChange={e => handleItemChange(i, 'unidade', e.target.value)}
                  />
                  <select
                    className="col-span-3 border border-gray-300 rounded px-1 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                    value={item.tipo}
                    onChange={e => handleItemChange(i, 'tipo', e.target.value)}
                  >
                    <option value="ADULTO">Adulto</option>
                    <option value="CRIANCA">Criança</option>
                    <option value="FIXO">Fixo</option>
                  </select>
                  <button
                    onClick={() => removeItem(i)}
                    className="col-span-1 text-gray-400 hover:text-red-500 text-lg leading-none text-center"
                    title="Remover item"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

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
            disabled={saving || !canSave}
            title={!canSave ? 'Adicione ao menos 1 item' : undefined}
          >
            {saving ? 'Salvando...' : modal.tipo === 'criar' ? 'Salvar' : 'Salvar alterações'}
          </Button>
        </div>
      </Modal>
    </Layout>
  )
}
