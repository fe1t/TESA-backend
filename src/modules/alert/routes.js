import * as controllers from './controllers'

import express from 'express'

export const apiRouter = express.Router()

apiRouter.post('/', req => controllers.addAlert(req))
