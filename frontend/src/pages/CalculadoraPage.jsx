import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Button from '../components/ui/Button'
import api from '../services/api'

function calcularQuantidade(item, cardapio, adultos, criancas) {
  let qtd = item.quantidade
  if (item.tipo === 'ADULTO') qtd = (item.quantidade / cardapio.baseAdultos) * adultos
  if (item.tipo === 'CRIANCA') qtd = (item.quantidade / cardapio.baseCriancas) * criancas

  const unidadesInteiras = ['un', 'pacote', 'pacotes', 'L']
  if (unidadesInteiras.includes(item.unidade)) return Math.ceil(qtd)
  return Number(qtd.toFixed(2))
}

export default function CalculadoraPage() {
  const [cardapios, setCardapios] = useState([])
  const [cardapioSelecionado, setCardapioSelecionado] = useState(null)
  const [adultos, setAdultos] = useState(50)
  const [criancas, setCriancas] = useState(10)
  const [observacao, setObservacao] = useState('')
  const [resultado, setResultado] = useState(null)
  const [loadingCardapio, setLoadingCardapio] = useState(false)

  useEffect(() => {
    api.get('/cardapios').then(res => setCardapios(res.data)).catch(() => {})
  }, [])

  async function handleSelectCardapio(e) {
    const id = e.target.value
    setResultado(null)
    if (!id) { setCardapioSelecionado(null); return }
    setLoadingCardapio(true)
    try {
      const res = await api.get(`/cardapios/${id}`)
      setCardapioSelecionado(res.data)
    } catch {
      setCardapioSelecionado(null)
    } finally {
      setLoadingCardapio(false)
    }
  }

  function handleCalcular() {
    if (!cardapioSelecionado) return
    const grupos = { adulto: [], crianca: [], fixo: [] }
    for (const item of cardapioSelecionado.itens) {
      const qtd = calcularQuantidade(item, cardapioSelecionado, Number(adultos), Number(criancas))
      const tipo = item.tipo.toLowerCase()
      grupos[tipo].push({ ...item, qtdCalculada: qtd })
    }
    setResultado({ cardapio: cardapioSelecionado, grupos, adultos: Number(adultos), criancas: Number(criancas) })
  }

  const titulosGrupo = { adulto: 'Itens por adultos', crianca: 'Itens por crianças', fixo: 'Itens fixos' }

  return (
    <Layout>
      <h1 className="text-2xl font-semibold text-gray-800">Calculadora de Cardápio</h1>
      <p className="text-sm text-gray-500 mt-1">Calcule a lista de compras automaticamente</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Painel esquerdo */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cardápio</label>
            <select
              onChange={handleSelectCardapio}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Selecione um cardápio</option>
              {cardapios.map(c => (
                <option key={c.id} value={c.id}>{c.nome}</option>
              ))}
            </select>
            {loadingCardapio && <p className="text-xs text-gray-500 mt-1">Carregando itens...</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Adultos</label>
            <input
              type="number"
              min="0"
              value={adultos}
              onChange={e => setAdultos(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Crianças</label>
            <input
              type="number"
              min="0"
              value={criancas}
              onChange={e => setCriancas(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Observação</label>
            <input
              type="text"
              value={observacao}
              onChange={e => setObservacao(e.target.value)}
              placeholder="Ex: Festa da Maria — sábado"
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button onClick={handleCalcular} disabled={!cardapioSelecionado}>
            Calcular lista
          </Button>
        </div>

        {/* Painel direito */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {!resultado ? (
            <p className="text-sm text-gray-500">Selecione um cardápio e clique em calcular.</p>
          ) : (
            <div className="space-y-4">
              <p className="font-semibold text-gray-800">
                {resultado.cardapio.nome} — {resultado.adultos} adultos e {resultado.criancas} crianças
              </p>

              {observacao && (
                <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-800">
                  {observacao}
                </div>
              )}

              {['adulto', 'crianca', 'fixo'].map(grupo => {
                const itens = resultado.grupos[grupo]
                if (!itens.length) return null
                return (
                  <div key={grupo}>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">{titulosGrupo[grupo]}</h3>
                    <table className="w-full text-sm">
                      <thead className="text-left text-gray-500">
                        <tr>
                          <th className="pb-1 font-medium">Item</th>
                          <th className="pb-1 font-medium">Quantidade</th>
                          <th className="pb-1 font-medium">Unidade</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {itens.map(item => (
                          <tr key={item.id}>
                            <td className="py-1 text-gray-800">{item.nome}</td>
                            <td className="py-1 text-gray-600">{item.qtdCalculada}</td>
                            <td className="py-1 text-gray-600">{item.unidade}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              })}

              <Button variant="secondary" onClick={() => window.print()}>
                🖨️ Imprimir / Salvar PDF
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
