import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import authRoutes from './routes/authRoutes.js'
import cardapioRoutes from './routes/cardapioRoutes.js'
import eventoRoutes from './routes/eventoRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'

const app = express()
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json({ type: '*/*' }))
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  next()
})

app.get('/health', (req, res) => res.json({ status: 'ok' }))
app.use('/api/auth', authRoutes)
app.use('/api/cardapios', cardapioRoutes)
app.use('/api/events', eventoRoutes)
app.use('/api/dashboard', dashboardRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
