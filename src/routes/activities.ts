import express from 'express'
const router = express.Router()

import { controllers } from '../controllers'

router.post('/', controllers.postActivity)

router.get('/', controllers.getActivity)

export default router
