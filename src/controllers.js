import {
  fetch as fetchAccelerometer,
  fetchUpdate as fetchUpdateAccelerometer,
  filterByTimeRange as filterAccelerometer
} from 'modules/accelerometer/controllers'
import { fetch as fetchDin1, fetchUpdate as fetchUpdateDin1, filterByTimeRange as filterDin1 } from 'modules/din1/controllers'
import {
  fetch as fetchGyroscope,
  fetchUpdate as fetchUpdateGyroscope,
  filterByTimeRange as filterGyroscope
} from 'modules/gyroscope/controllers'
import {
  fetch as fetchHumidity,
  fetchUpdate as fetchUpdateHumidity,
  filterByTimeRange as filterHumidity
} from 'modules/humidity/controllers'
import { fetch as fetchLed, fetchUpdate as fetchUpdateLed, filterByTimeRange as filterLed } from 'modules/LED/controllers'
import {
  fetch as fetchMagnetometer,
  fetchUpdate as fetchUpdateMagnetometer,
  filterByTimeRange as filterMagnetometer
} from 'modules/magnetometer/controllers'
import {
  fetch as fetchPressure,
  fetchUpdate as fetchUpdatePressure,
  filterByTimeRange as filterPressure
} from 'modules/pressure/controllers'
import {
  fetch as fetchTemperature,
  fetchUpdate as fetchUpdateTemperature,
  filterByTimeRange as filterTemperature
} from 'modules/temperature/controllers'

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

export const fetchUpdateAll = async (req, res) => {
  let a = []
  let error = false
  for (var teamId = 1; teamId <= 60; teamId++) {
    a.push(
      fetchUpdateAccelerometer(req, res, teamId),
      // fetchUpdateGyroscope(req, res, teamId),
      fetchUpdateDin1(req, res, teamId),
      // fetchUpdateHumidity(req, res, teamId),
      // fetchUpdateLed(req, res, teamId),
      // fetchUpdateMagnetometer(req, res, teamId),
      // fetchUpdatePressure(req, res, teamId),
      fetchUpdateTemperature(req, res, teamId)
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
    console.log('Done fetching')
  }
}

export const filterAll = (req, res) => {
  let ret = []
  console.log('fuck')
  // fetchUpdateAccelerometer(req, res).then(data => res.json(data))
  // Promise.all([filterAccelerometer(req, res), filterDin1(req, res), filterTemperature(req, res)]).then(arrayOfData => {
  //   arrayOfData.forEach(d => {
  //     ret = ret.concat(d)
  //   })
  //   res.json(ret)
  // })
}
