import { fetch as fetchAccelerometer, filterByTimeRange as filterAccelerometer } from './accelerometer/controllers'
import { fetch as fetchDin1, filterByTimeRange as filterDin1 } from './din1/controllers'
import { fetch as fetchGyroscope, filterByTimeRange as filterGyroscope } from './gyroscope/controllers'
import { fetch as fetchHumidity, filterByTimeRange as filterHumidity } from './humidity/controllers'
import { fetch as fetchLed, filterByTimeRange as filterLed } from './LED/controllers'
import { fetch as fetchMagnetometer, filterByTimeRange as filterMagnetometer } from './magnetometer/controllers'
import { fetch as fetchPressure, filterByTimeRange as filterPressure } from './pressure/controllers'
import { fetch as fetchTemperature, filterByTimeRange as filterTemperature } from './temperature/controllers'

export const fetchAll = async (req, res) => {
  let a = []
  let error = false
  for (var teamId = 1; teamId <= 60; teamId++) {
    a.push(
      fetchAccelerometer(req, res, teamId),
      // fetchGyroscope(req, res, teamId),
      fetchDin1(req, res, teamId),
      // fetchHumidity(req, res, teamId),
      // fetchLed(req, res, teamId),
      // fetchMagnetometer(req, res, teamId),
      // fetchPressure(req, res, teamId),
      fetchTemperature(req, res, teamId)
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

export const filterAll = (req, res) => {
  let ret = []
  Promise.all([filterAccelerometer(req, res)]).then(arrayOfData => {
    // Promise.all([filterAccelerometer(req, res), filterDin1(req, res), filterTemperature(req, res)]).then(arrayOfData => {
    arrayOfData.forEach(d => {
      ret = ret.concat(d)
    })
    res.json(ret)
  })
}
