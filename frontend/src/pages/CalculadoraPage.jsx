import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Button from '../components/ui/Button'
import api from '../services/api'

const inputCls = "w-full border border-card-border rounded-lg px-3 py-2 text-sm text-ink placeholder:text-ink-muted bg-white focus:outline-none focus:border-primary transition-colors"

function calcularQuantidade(item, cardapio, adultos, criancas) {
  let qtd = item.quantidade
  if (item.tipo === 'ADULTO') qtd = (item.quantidade / cardapio.baseAdultos) * adultos
  if (item.tipo === 'CRIANCA') qtd = (item.quantidade / cardapio.baseCriancas) * criancas
  const unidadesInteiras = ['un', 'pacote', 'pacotes', 'L']
  if (unidadesInteiras.includes(item.unidade)) return Math.ceil(qtd)
  return Number(qtd.toFixed(2))
}

const titulosGrupo = {
  adulto: 'Itens por adultos',
  crianca: 'Itens por crianças',
  fixo: 'Itens fixos',
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
      grupos[item.tipo.toLowerCase()].push({ ...item, qtdCalculada: qtd })
    }
    setResultado({ cardapio: cardapioSelecionado, grupos, adultos: Number(adultos), criancas: Number(criancas) })
  }

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-ink">Calculadora de Cardápio</h1>
        <p className="text-sm text-ink-muted mt-1">Calcule automaticamente a lista de compras para o evento</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Painel de entrada */}
        <div className="bg-white border border-card-border rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-ink-light uppercase tracking-wide">Parâmetros</h2>

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Cardápio</label>
            <select onChange={handleSelectCardapio} className={inputCls}>
              <option value="">Selecione um cardápio</option>
              {cardapios.map(c => (
                <option key={c.id} value={c.id}>{c.nome}</option>
              ))}
            </select>
            {loadingCardapio && (
              <p className="text-xs text-ink-muted mt-1 flex items-center gap-1">
                <span className="inline-block w-3 h-3 border-2 border-card-border border-t-primary rounded-full animate-spin"/>
                Carregando itens...
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Adultos</label>
            <input
              type="number"
              min="0"
              value={adultos}
              onChange={e => setAdultos(e.target.value)}
              className={inputCls}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Crianças</label>
            <input
              type="number"
              min="0"
              value={criancas}
              onChange={e => setCriancas(e.target.value)}
              className={inputCls}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Observação</label>
            <input
              type="text"
              value={observacao}
              onChange={e => setObservacao(e.target.value)}
              placeholder="Ex: Festa da Maria — sábado"
              className={inputCls}
            />
          </div>

          <Button onClick={handleCalcular} disabled={!cardapioSelecionado} className="w-full">
            Calcular lista
          </Button>
        </div>

        {/* Painel de resultado */}
        <div className="bg-white border border-card-border rounded-xl p-6">
          {!resultado ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
              <div className="w-10 h-10 rounded-xl bg-primary-subtle flex items-center justify-center mb-3">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-primary">
                  <rect x="4" y="2" width="16" height="20" rx="2"/>
                  <path d="M8 7h8M8 11.5h8M8 16h5"/>
                </svg>
              </div>
              <p className="text-sm text-ink-muted">Selecione um cardápio e clique em calcular.</p>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <h2 className="text-sm font-semibold text-ink-light uppercase tracking-wide mb-1">Resultado</h2>
                <p className="font-semibold text-ink">
                  {resultado.cardapio.nome}
                </p>
                <p className="text-sm text-ink-muted">
                  {resultado.adultos} adultos · {resultado.criancas} crianças
                </p>
              </div>

              {observacao && (
                <div className="bg-primary-subtle border border-primary/20 rounded-lg px-3 py-2.5 text-sm text-green-800">
                  {observacao}
                </div>
              )}

              {['adulto', 'crianca', 'fixo'].map(grupo => {
                const itens = resultado.grupos[grupo]
                if (!itens.length) return null
                return (
                  <div key={grupo}>
                    <h3 className="text-xs font-medium text-ink-muted uppercase tracking-wide mb-2">
                      {titulosGrupo[grupo]}
                    </h3>
                    <div className="bg-white border border-card-border rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-card-border bg-canvas">
                            <th className="px-3 py-2 text-left text-xs font-medium text-ink-muted">Item</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-ink-muted">Qtd</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-ink-muted">Unidade</th>
                          </tr>
                        </thead>
                        <tbody>
                          {itens.map((item, i) => (
                            <tr
                              key={item.id}
                              className={i < itens.length - 1 ? 'border-b border-card-border' : ''}
                            >
                              <td className="px-3 py-2 text-ink">{item.nome}</td>
                              <td className="px-3 py-2 font-medium text-ink">{item.qtdCalculada}</td>
                              <td className="px-3 py-2 text-ink-muted">{item.unidade}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )
              })}

              <Button variant="secondary" onClick={() => window.print()} className="w-full">
                Imprimir / Salvar PDF
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
