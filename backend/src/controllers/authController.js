import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function login(req, res) {
  const { email, password } = req.body
  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(401).json({ error: 'Credenciais inválidas' })
    if (!user.active) return res.status(403).json({ error: 'Conta desativada' })

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) return res.status(401).json({ error: 'Credenciais inválidas' })

    const payload = { id: user.id, name: user.name, email: user.email, role: user.role }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })

    return res.json({ token, user: payload })
  } catch (err) {
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

export function me(req, res) {
  return res.json(req.user)
}
