import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function listar(req, res) {
  const { status } = req.query
  const where = status && status !== 'TODOS' ? { status } : {}
  try {
    const eventos = await prisma.event.findMany({
      where,
      orderBy: { date: 'desc' },
      include: { cardapio: { select: { id: true, nome: true } } }
    })
    return res.json(eventos)
  } catch {
    return res.status(500).json({ error: 'Erro ao listar eventos' })
  }
}

export async function buscarPorId(req, res) {
  const id = parseInt(req.params.id)
  try {
    const evento = await prisma.event.findUnique({
      where: { id },
      include: { cardapio: { select: { id: true, nome: true } } }
    })
    if (!evento) return res.status(404).json({ error: 'Evento não encontrado' })
    return res.json(evento)
  } catch {
    return res.status(500).json({ error: 'Erro ao buscar evento' })
  }
}

export async function criar(req, res) {
  const { clientName, eventType, date, adults, children, cardapioId, notes } = req.body
  try {
    const evento = await prisma.event.create({
      data: {
        clientName,
        eventType,
        date: new Date(date),
        adults: parseInt(adults) || 0,
        children: parseInt(children) || 0,
        cardapioId: cardapioId ? parseInt(cardapioId) : null,
        notes: notes || null,
        createdById: req.user.id
      }
    })
    return res.status(201).json(evento)
  } catch {
    return res.status(500).json({ error: 'Erro ao criar evento' })
  }
}

export async function atualizar(req, res) {
  const id = parseInt(req.params.id)
  const { clientName, eventType, date, adults, children, cardapioId, status, notes } = req.body
  try {
    const data = {}
    if (clientName !== undefined) data.clientName = clientName
    if (eventType !== undefined) data.eventType = eventType
    if (date !== undefined) data.date = new Date(date)
    if (adults !== undefined) data.adults = parseInt(adults)
    if (children !== undefined) data.children = parseInt(children)
    if (cardapioId !== undefined) data.cardapioId = cardapioId ? parseInt(cardapioId) : null
    if (status !== undefined) data.status = status
    if (notes !== undefined) data.notes = notes || null

    const evento = await prisma.event.update({ where: { id }, data })
    return res.json(evento)
  } catch {
    return res.status(500).json({ error: 'Erro ao atualizar evento' })
  }
}

export async function remover(req, res) {
  const id = parseInt(req.params.id)
  try {
    const evento = await prisma.event.findUnique({ where: { id } })
    if (!evento) return res.status(404).json({ error: 'Evento não encontrado' })
    if (evento.status !== 'PENDING') {
      return res.status(400).json({ error: 'Apenas eventos pendentes podem ser removidos' })
    }
    await prisma.event.delete({ where: { id } })
    return res.json({ message: 'Evento removido' })
  } catch {
    return res.status(500).json({ error: 'Erro ao remover evento' })
  }
}
