import { apiRouter as animalApi, router as animalRouter } from 'src/animal/routes'

import express from 'express'

export const apiRouter = express.Router()
export const router = express.Router()

apiRouter.use('/animals', animalApi)
router.use('/animals', animalRouter)
