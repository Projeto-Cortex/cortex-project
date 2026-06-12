import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminHash = await bcrypt.hash('admin123', 10)
  const operHash = await bcrypt.hash('oper123', 10)

  await prisma.user.upsert({
    where: { email: 'admin@limoeiro.com' },
    update: {},
    create: { name: 'Admin', email: 'admin@limoeiro.com', passwordHash: adminHash, role: 'ADMIN' }
  })
  await prisma.user.upsert({
    where: { email: 'operador@limoeiro.com' },
    update: {},
    create: { name: 'Operador', email: 'operador@limoeiro.com', passwordHash: operHash, role: 'OPERATOR' }
  })

  console.log('Usuários criados.')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
