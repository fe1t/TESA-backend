import * as controllers from './controllers'

import Api from 'common/utils/routes'
import express from 'express'

export const apiRouter = express.Router()

apiRouter.post('/', Api.apiResponseAsync(controllers.add))
apiRouter.get('/', Api.apiResponseAsync(controllers.show))
