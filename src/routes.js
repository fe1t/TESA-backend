import { apiRouter as accelerometerApi, router as accelerometerRouter } from 'src/accelerometer/routes'
import { apiRouter as animalApi, router as animalRouter } from 'src/animal/routes'
import { apiRouter as din1Api, router as din1Router } from 'src/din1/routes'
import { apiRouter as gyroscopeApi, router as gyroscopeRouter } from 'src/gyroscope/routes'
import { apiRouter as humidityApi, router as humidityRouter } from 'src/humidity/routes'
import { apiRouter as ledApi, router as ledRouter } from 'src/LED/routes'
import { apiRouter as magnetometerApi, router as magnetometerRouter } from 'src/magnetometer/routes'
import { apiRouter as pressureApi, router as pressureRouter } from 'src/pressure/routes'
import { apiRouter as temperatureApi, router as temperatureRouter } from 'src/temperature/routes'

import express from 'express'
import { fetchAll } from 'src/controllers'

export const apiRouter = express.Router()
export const router = express.Router()

apiRouter.use('/accelerometer', accelerometerApi)
apiRouter.use('/animals', animalApi)
apiRouter.use('/din1', din1Api)
apiRouter.use('/gyroscope', gyroscopeApi)
apiRouter.use('/humidity', humidityApi)
apiRouter.use('/Led', ledApi)
apiRouter.use('/magnetometer', magnetometerApi)
apiRouter.use('/pressure', pressureApi)
apiRouter.use('/temperature', temperatureApi)
apiRouter.get('/fetchAll', (req, res) => {
  fetchAll(req, res)
})
apiRouter.get('/allTeamSensor/:startTime/:endTime', (req, res) => {
  let ret = {}
  Promise.all([
    accelerometerApi.controllers.filterByTimeRange(req, res),
    din1Api.controllers.filterByTimeRange(req, res),
    temperatureApi.controllers.filterByTimeRange(req, res)
  ]).then(arrayOfData => {
    arrayOfData.forEach(d => {
      ret = ret.concat(d)
    })
    res.json(ret)
  })
})

router.use('/animals', animalRouter)
