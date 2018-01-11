import * as controllers from './controllers'

import Api from 'common/utils/routes'
import express from 'express'

export const apiRouter = express.Router()

apiRouter.get('/', Api.apiResponseAsync(controllers.showAll))
apiRouter.get('/latest/:number?', controllers.showLastTwenty)
apiRouter.get('/:teamId/fetch', Api.apiResponseAsync(controllers.fetch))
