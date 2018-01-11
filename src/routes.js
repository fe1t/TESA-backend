import { fetchAll, fetchUpdateAll, filterAll } from './controllers'

import { apiRouter as accelerometerApi } from 'modules/accelerometer/routes'
import { apiRouter as alertApi } from 'modules/alert/routes'
import { apiRouter as din1Api } from 'modules/din1/routes'
import express from 'express'
import { apiRouter as gyroscopeApi } from 'modules/gyroscope/routes'
import { apiRouter as humidityApi } from 'modules/humidity/routes'
import { apiRouter as ledApi } from 'modules/LED/routes'
import { apiRouter as magnetometerApi } from 'modules/magnetometer/routes'
import { apiRouter as pressureApi } from 'modules/pressure/routes'
import { apiRouter as temperatureApi } from 'modules/temperature/routes'

export const apiRouter = express.Router()

apiRouter.use('/accelerometer', accelerometerApi)
apiRouter.use('/alert', alertApi)
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
apiRouter.get('/fetchUpdateAll', (req, res) => {
  fetchUpdateAll(req, res)
})
apiRouter.get('/allTeamSensor/:startTime/:endTime', (req, res) => {
  filterAll(req, res)
})
