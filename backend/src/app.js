import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import authRoutes from './routes/authRoutes.js'
import cardapioRoutes from './routes/cardapioRoutes.js'
import eventoRoutes from './routes/eventoRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'

const app = express()
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map(o => o.trim())
  : '*'
app.use(cors({ origin: allowedOrigins }))
app.use(express.json())

app.get('/health', (req, res) => res.json({ status: 'ok' }))
app.use('/api/auth', authRoutes)
app.use('/api/cardapios', cardapioRoutes)
app.use('/api/events', eventoRoutes)
app.use('/api/dashboard', dashboardRoutes)

export default app
