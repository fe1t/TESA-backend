import * as controllers from './controllers'

import express from 'express'

export const apiRouter = express.Router()

apiRouter.get('/', controllers.showAll)
apiRouter.get('/latest/:number?', controllers.showLastTwenty)
apiRouter.get('/:teamId/fetch', (req, res) => controllers.fetch(req, res))
