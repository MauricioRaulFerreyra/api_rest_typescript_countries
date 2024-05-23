import { Router } from 'express'
import countryRouter from './countries'
import activityRouter from './activities'

const router = Router()

router.use('/countries', countryRouter)
router.use('/activities', activityRouter)

export default router
