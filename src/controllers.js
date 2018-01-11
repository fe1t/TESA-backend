import * as accelerometerController from 'modules/accelerometer/controllers'
import * as din1Controller from 'modules/din1/controllers'
import * as gyroscopeController from 'modules/gyroscope/controllers'
import * as humidityController from 'modules/humidity/controllers'
import * as ledController from 'modules/LED/controllers'
import * as magnetomerController from 'modules/magnetometer/controllers'
import * as pressureController from 'modules/pressure/controllers'
import * as temperatureController from 'modules/temperature/controllers'

export const fetchAll = async (req, res) => {
  let a = []
  let error = false
  for (var teamId = 1; teamId <= 60; teamId++) {
    a.push(
      accelerometerController.fetch(req, res, teamId),
      din1Controller.fetch(req, res, teamId),
      temperatureController.fetch(req, res, teamId)
    )
    if (teamId % 10 == 0) {
      console.log('fetching ', teamId)
      await Promise.all(a).catch(err => {
        error = true
      })
      a = []
    }
  }
  if (error) {
    res.json({ status: 'Error' })
  } else {
    res.json({ status: 'Done fetching' })
  }
}

export const fetchUpdateAll = async (req, res) => {
  let a = []
  let error = false
  for (var teamId = 1; teamId <= 60; teamId++) {
    a.push(
      accelerometerController.fetchUpdate(req, res, teamId),
      din1Controller.fetchUpdate(req, res, teamId),
      temperatureController.fetchUpdate(req, res, teamId)
    )
    if (teamId % 10 == 0) {
      console.log('fetching ', teamId)
      await Promise.all(a).catch(err => {
        error = true
      })
      a = []
    }
  }
  if (error) {
    console.log('Error')
  } else {
    console.log('Done fetching [ALL]')
  }
}

export const filterAll = (req, res) => {
  let ret = []
  Promise.all([
    accelerometerController.filterByTimeRange(req, res),
    din1Controller.filterByTimeRange(req, res),
    temperatureController.filterByTimeRange(req, res)
  ]).then(arrayOfData => {
    arrayOfData.forEach(d => {
      ret = ret.concat(d)
    })
    res.json(ret)
  })
}
