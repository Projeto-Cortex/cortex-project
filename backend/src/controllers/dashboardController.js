import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getDashboard(req, res) {
  try {
    const hoje = new Date()
    const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1)
    const fimMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0, 23, 59, 59)

    const totalCardapios = await prisma.cardapio.count({ where: { ativo: true } })

    const eventosMes = await prisma.event.count({
      where: { date: { gte: inicioMes, lte: fimMes } }
    })

    const proximosEventos = await prisma.event.findMany({
      where: { status: 'CONFIRMED', date: { gte: new Date() } },
      orderBy: { date: 'asc' },
      take: 5,
      include: { createdBy: { select: { name: true } } }
    })

    return res.json({ totalCardapios, eventosMes, proximosEventos })
  } catch {
    return res.status(500).json({ error: 'Erro ao carregar dashboard' })
  }
}
