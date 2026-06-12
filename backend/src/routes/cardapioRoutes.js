import { Router } from 'express'
import { listar, buscarPorId, criar, atualizar, desativar } from '../controllers/cardapioController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = Router()
router.use(authMiddleware)
router.get('/', listar)
router.get('/:id', buscarPorId)
router.post('/', criar)
router.put('/:id', atualizar)
router.delete('/:id', desativar)

export default router
