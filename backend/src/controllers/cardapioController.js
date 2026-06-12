import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function isAdmin(req, res) {
  if (req.user.role !== 'ADMIN') {
    res.status(403).json({ error: 'Acesso restrito a administradores' })
    return false
  }
  return true
}

export async function listar(req, res) {
  try {
    const cardapios = await prisma.cardapio.findMany({
      where: { ativo: true },
      select: {
        id: true, nome: true, baseAdultos: true, baseCriancas: true,
        _count: { select: { itens: true } }
      }
    })
    return res.json(cardapios)
  } catch {
    return res.status(500).json({ error: 'Erro ao listar cardápios' })
  }
}

export async function buscarPorId(req, res) {
  const id = parseInt(req.params.id)
  try {
    const cardapio = await prisma.cardapio.findUnique({
      where: { id },
      include: { itens: true }
    })
    if (!cardapio) return res.status(404).json({ error: 'Cardápio não encontrado' })
    return res.json(cardapio)
  } catch {
    return res.status(500).json({ error: 'Erro ao buscar cardápio' })
  }
}

export async function criar(req, res) {
  if (!isAdmin(req, res)) return
  const { nome, baseAdultos, baseCriancas, itens } = req.body
  try {
    const cardapio = await prisma.cardapio.create({
      data: {
        nome,
        baseAdultos: parseInt(baseAdultos),
        baseCriancas: parseInt(baseCriancas),
        itens: { create: itens || [] }
      },
      include: { itens: true }
    })
    return res.status(201).json(cardapio)
  } catch {
    return res.status(500).json({ error: 'Erro ao criar cardápio' })
  }
}

export async function atualizar(req, res) {
  if (!isAdmin(req, res)) return
  const id = parseInt(req.params.id)
  const { nome, baseAdultos, baseCriancas, itens } = req.body
  try {
    await prisma.cardapio.update({
      where: { id },
      data: { nome, baseAdultos: parseInt(baseAdultos), baseCriancas: parseInt(baseCriancas) }
    })
    if (itens !== undefined) {
      await prisma.itemCardapio.deleteMany({ where: { cardapioId: id } })
      await prisma.itemCardapio.createMany({
        data: itens.map(item => ({ ...item, quantidade: parseFloat(item.quantidade), cardapioId: id }))
      })
    }
    const atualizado = await prisma.cardapio.findUnique({ where: { id }, include: { itens: true } })
    return res.json(atualizado)
  } catch {
    return res.status(500).json({ error: 'Erro ao atualizar cardápio' })
  }
}

export async function desativar(req, res) {
  if (!isAdmin(req, res)) return
  const id = parseInt(req.params.id)
  try {
    await prisma.cardapio.update({ where: { id }, data: { ativo: false } })
    return res.json({ message: 'Cardápio desativado' })
  } catch {
    return res.status(500).json({ error: 'Erro ao desativar cardápio' })
  }
}
