import { fetch as fetchAccelerometer, filterByTimeRange as filterAccelerometer } from './accelerometer/controllers'
import { fetch as fetchDin1, filterByTimeRange as filterDin1 } from './din1/controllers'
import { fetch as fetchGyroscope, filterByTimeRange as filterGyroscope } from './gyroscope/controllers'
import { fetch as fetchHumidity, filterByTimeRange as filterHumidity } from './humidity/controllers'
import { fetch as fetchLed, filterByTimeRange as filterLed } from './LED/controllers'
import { fetch as fetchMagnetometer, filterByTimeRange as filterMagnetometer } from './magnetometer/controllers'
import { fetch as fetchPressure, filterByTimeRange as filterPressure } from './pressure/controllers'
import { fetch as fetchTemperature, filterByTimeRange as filterTemperature } from './temperature/controllers'

export const fetchAll = (req, res) => {
  fetchAccelerometer()
  fetchGyroscope()
  fetchDin1()
  fetchHumidity()
  fetchLed()
  fetchMagnetometer()
  fetchPressure()
  fetchTemperature()
  res.send('Fetched :D Successfully ')
}

export const filterAll = (req, res) => {
  let ret = []
  Promise.all([filterAccelerometer(req, res), filterDin1(req, res), filterTemperature(req, res)]).then(arrayOfData => {
    arrayOfData.forEach(d => {
      ret = ret.concat(d)
    })
    res.json(ret)
  })
}
