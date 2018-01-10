import * as controllers from './controllers'

import express from 'express'
import routeUtils from 'common/utils/routes'

export const router = express.Router()
export const apiRouter = express.Router()

apiRouter.get('/', controllers.showAll)
apiRouter.get('/fetch', routeUtils.apiResponse(controllers.fetch))
apiRouter.get('/test', routeUtils.apiResponse(controllers.testGetApi))
apiRouter.post('/testPost', routeUtils.apiResponse(controllers.testPost))

router.get('/', routeUtils.pageResponse('index', controllers.testGetApi))
