import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

function proximoSabado(a_partir_de) {
  const d = new Date(a_partir_de)
  const dia = d.getDay()
  const diff = dia === 6 ? 7 : (6 - dia)
  d.setDate(d.getDate() + diff)
  d.setHours(18, 0, 0, 0)
  return d
}

const hoje = new Date()
const primeiroDiaMesAtual = new Date(hoje.getFullYear(), hoje.getMonth(), 1)
const primeiroDiaMesSeguinte = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 1)

const dataEvento1 = proximoSabado(primeiroDiaMesAtual)
const dataEvento2 = new Date(dataEvento1)
dataEvento2.setDate(dataEvento2.getDate() + 7)
const dataEvento3 = proximoSabado(primeiroDiaMesSeguinte)

async function main() {
  await prisma.event.deleteMany()
  await prisma.itemCardapio.deleteMany()
  await prisma.cardapio.deleteMany()
  await prisma.user.deleteMany()

  const adminHash = await bcrypt.hash('admin123', 10)
  const operHash = await bcrypt.hash('oper123', 10)

  await prisma.user.create({
    data: { name: 'Admin', email: 'admin@limoeiro.com', passwordHash: adminHash, role: 'ADMIN' }
  })
  await prisma.user.create({
    data: { name: 'Operador', email: 'operador@limoeiro.com', passwordHash: operHash, role: 'OPERATOR' }
  })

  await prisma.cardapio.create({
    data: {
      nome: 'Limão Cravo',
      baseAdultos: 50,
      baseCriancas: 10,
      itens: {
        create: [
          { nome: 'Pepino',      quantidade: 7,   unidade: 'un',     tipo: 'ADULTO' },
          { nome: 'Cenoura',     quantidade: 13,  unidade: 'un',     tipo: 'ADULTO' },
          { nome: 'Batata frita',quantidade: 2,   unidade: 'pacote', tipo: 'ADULTO' },
          { nome: 'Limão',       quantidade: 50,  unidade: 'un',     tipo: 'ADULTO' },
          { nome: 'Coca-Cola',   quantidade: 12,  unidade: 'L',      tipo: 'ADULTO' },
          { nome: 'Coca Zero',   quantidade: 8,   unidade: 'L',      tipo: 'ADULTO' },
          { nome: 'Guaraná',     quantidade: 6,   unidade: 'L',      tipo: 'ADULTO' },
          { nome: 'Pipoca',      quantidade: 2,   unidade: 'pacote', tipo: 'CRIANCA' },
          { nome: 'Milho',       quantidade: 2,   unidade: 'un',     tipo: 'CRIANCA' },
          { nome: 'Melancia',    quantidade: 1.5, unidade: 'kg',     tipo: 'CRIANCA' },
          { nome: 'Manga Palmer',quantidade: 1,   unidade: 'un',     tipo: 'CRIANCA' }
        ]
      }
    }
  })

  await prisma.cardapio.create({
    data: {
      nome: 'Capim Limão',
      baseAdultos: 50,
      baseCriancas: 25,
      itens: {
        create: [
          { nome: 'Pepino',       quantidade: 7,   unidade: 'un',     tipo: 'ADULTO' },
          { nome: 'Cenoura',      quantidade: 13,  unidade: 'un',     tipo: 'ADULTO' },
          { nome: 'Batata frita', quantidade: 1.5, unidade: 'pacote', tipo: 'ADULTO' },
          { nome: 'Hot dog',      quantidade: 80,  unidade: 'un',     tipo: 'ADULTO' },
          { nome: 'Salsicha',     quantidade: 40,  unidade: 'un',     tipo: 'ADULTO' },
          { nome: 'Molho',        quantidade: 3,   unidade: 'un',     tipo: 'ADULTO' },
          { nome: 'Batata palha', quantidade: 300, unidade: 'g',      tipo: 'ADULTO' },
          { nome: 'Coca-Cola',    quantidade: 12,  unidade: 'L',      tipo: 'ADULTO' },
          { nome: 'Coca Zero',    quantidade: 8,   unidade: 'L',      tipo: 'ADULTO' },
          { nome: 'Guaraná',      quantidade: 6,   unidade: 'L',      tipo: 'ADULTO' },
          { nome: 'Limão',        quantidade: 50,  unidade: 'un',     tipo: 'ADULTO' },
          { nome: 'Pipoca',       quantidade: 2,   unidade: 'pacote', tipo: 'CRIANCA' },
          { nome: 'Milho',        quantidade: 2,   unidade: 'un',     tipo: 'CRIANCA' },
          { nome: 'Melancia',     quantidade: 1,   unidade: 'kg',     tipo: 'CRIANCA' },
          { nome: 'Manga Palmer', quantidade: 1,   unidade: 'un',     tipo: 'CRIANCA' }
        ]
      }
    }
  })

  await prisma.cardapio.create({
    data: {
      nome: 'Limão Siciliano',
      baseAdultos: 50,
      baseCriancas: 30,
      itens: {
        create: [
          { nome: 'Pepino',            quantidade: 7,   unidade: 'un',     tipo: 'ADULTO' },
          { nome: 'Cenoura',           quantidade: 13,  unidade: 'un',     tipo: 'ADULTO' },
          { nome: 'Dadinho',           quantidade: 60,  unidade: 'un',     tipo: 'ADULTO' },
          { nome: 'Geleia de pimenta', quantidade: 1,   unidade: 'un',     tipo: 'ADULTO' },
          { nome: 'Abacate',           quantidade: 500, unidade: 'g',      tipo: 'ADULTO' },
          { nome: 'Tomate',            quantidade: 2,   unidade: 'un',     tipo: 'ADULTO' },
          { nome: 'Cebola roxa',       quantidade: 1,   unidade: 'un',     tipo: 'ADULTO' },
          { nome: 'Limão',             quantidade: 25,  unidade: 'un',     tipo: 'ADULTO' },
          { nome: 'Batata frita',      quantidade: 1.5, unidade: 'pacote', tipo: 'ADULTO' },
          { nome: 'Hambúrguer',        quantidade: 40,  unidade: 'un',     tipo: 'ADULTO' },
          { nome: 'Hot dog',           quantidade: 20,  unidade: 'un',     tipo: 'ADULTO' },
          { nome: 'Massa',             quantidade: 2,   unidade: 'pacote', tipo: 'ADULTO' },
          { nome: 'Carne',             quantidade: 2,   unidade: 'kg',     tipo: 'ADULTO' },
          { nome: 'Frango picado',     quantidade: 2,   unidade: 'kg',     tipo: 'ADULTO' },
          { nome: 'Maracujá',          quantidade: 8,   unidade: 'kg',     tipo: 'ADULTO' },
          { nome: 'Coca-Cola',         quantidade: 12,  unidade: 'L',      tipo: 'ADULTO' },
          { nome: 'Coca Zero',         quantidade: 8,   unidade: 'L',      tipo: 'ADULTO' },
          { nome: 'Guaraná',           quantidade: 6,   unidade: 'L',      tipo: 'ADULTO' },
          { nome: 'Pipoca',            quantidade: 2,   unidade: 'pacote', tipo: 'CRIANCA' },
          { nome: 'Milho',             quantidade: 3,   unidade: 'un',     tipo: 'CRIANCA' },
          { nome: 'Melancia',          quantidade: 2,   unidade: 'kg',     tipo: 'CRIANCA' },
          { nome: 'Manga Palmer',      quantidade: 2,   unidade: 'un',     tipo: 'CRIANCA' }
        ]
      }
    }
  })

  await prisma.cardapio.create({
    data: {
      nome: 'Festa Limoneto',
      baseAdultos: 12,
      baseCriancas: 30,
      itens: {
        create: [
          { nome: 'Batata',    quantidade: 1.5, unidade: 'pacote', tipo: 'ADULTO' },
          { nome: 'Limão',     quantidade: 30,  unidade: 'un',     tipo: 'ADULTO' },
          { nome: 'Coca-Cola', quantidade: 12,  unidade: 'L',      tipo: 'ADULTO' },
          { nome: 'Coca Zero', quantidade: 8,   unidade: 'L',      tipo: 'ADULTO' },
          { nome: 'Guaraná',   quantidade: 6,   unidade: 'L',      tipo: 'ADULTO' },
          { nome: 'Pipoca',    quantidade: 5,   unidade: 'pacote', tipo: 'CRIANCA' }
        ]
      }
    }
  })

  await prisma.event.create({
    data: {
      clientName: 'João Silva',
      eventType: 'Aniversário',
      date: dataEvento1,
      adults: 60,
      children: 15,
      cardapioId: 1,
      status: 'CONFIRMED',
      createdById: 1
    }
  })
  await prisma.event.create({
    data: {
      clientName: 'Família Rocha',
      eventType: 'Confraternização',
      date: dataEvento2,
      adults: 40,
      children: 5,
      cardapioId: 2,
      status: 'CONFIRMED',
      createdById: 1
    }
  })
  await prisma.event.create({
    data: {
      clientName: 'Ana Beatriz',
      eventType: 'Aniversário',
      date: dataEvento3,
      adults: 80,
      children: 20,
      cardapioId: 3,
      status: 'PENDING',
      createdById: 1
    }
  })

  console.log('Seed concluído com sucesso.')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
