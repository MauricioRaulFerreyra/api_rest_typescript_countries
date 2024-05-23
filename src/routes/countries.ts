import express from 'express'
const router = express.Router()

import { controllers } from '../controllers'

router.get('/', controllers.getAll)

router.get('/:id', controllers.getById)

export default router
