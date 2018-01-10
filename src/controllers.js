import { fetch as fetchAccelerometer } from './accelerometer/controllers'
import { fetch as fetchGyroScope } from './gyroscope/controllers'
import { fetch as fetchHumidity } from './humidity/controllers'
import { fetch as fetchLed } from './LED/controllers'
import { fetch as fetchMagnetometer } from './magnetometer/controllers'
import { fetch as fetchPressure } from './pressure/controllers'
import { fetch as fetchTemperature } from './temperature/controllers'

export const fetchAll = (req, res) => {
  fetchAccelerometer()
  fetchGyroScope()
  fetchHumidity()
  fetchLed()
  fetchMagnetometer()
  fetchPressure()
  fetchTemperature()
  res.send('Fetched :D Successfully ')
}
