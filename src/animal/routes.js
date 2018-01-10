import * as controllers from './controllers'

import express from 'express'
import routeUtils from 'common/utils/routes'

export const router = express.Router()
export const apiRouter = express.Router()

apiRouter.get('/test', routeUtils.apiResponse(controllers.testGetApi))
apiRouter.post('/testPost', routeUtils.apiResponse(controllers.testPost))
apiRouter.get('/test2', routeUtils.apiResponse(controllers.list))

router.get('/', routeUtils.pageResponse('index', controllers.testGetApi))
