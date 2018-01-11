import api from './manager'

export default {
  getAccelerometer(teamId) {
    return api.get(`/accelerometer/${teamId}/all`)
  },
  getDin1(teamId) {
    return api.get(`/din1/${teamId}/all`)
  },
  getGyroscope(teamId) {
    return api.get(`/gyroscope/${teamId}/all`)
  },
  getHumidity(teamId) {
    return api.get(`/humidity/${teamId}/all`)
  },
  getLed(teamId) {
    return api.get(`/leds/${teamId}/all`)
  },
  getMagnetometer(teamId) {
    return api.get(`/magnetometer/${teamId}/all`)
  },
  getPressure(teamId) {
    return api.get(`/pressure/${teamId}/all`)
  },
  getTemperature(teamId) {
    return api.get(`/temperature/${teamId}/all`)
  },

  getRecentAccelerometer(teamId, N = 3) {
    return api.get(`/accelerometer/${teamId}/${N}`)
  },
  getRecentDin1(teamId, N = 3) {
    return api.get(`/din1/${teamId}/${N}`)
  },
  getRecentGyroscope(teamId, N = 3) {
    return api.get(`/gyroscope/${teamId}/${N}`)
  },
  getRecentHumidity(teamId, N = 3) {
    return api.get(`/humidity/${teamId}/${N}`)
  },
  getRecentLed(teamId, N = 3) {
    return api.get(`/leds/${teamId}/${N}`)
  },
  getRecentMagnetometer(teamId, N = 3) {
    return api.get(`/magnetometer/${teamId}/${N}`)
  },
  getRecentPressure(teamId, N = 3) {
    return api.get(`/pressure/${teamId}/${N}`)
  },
  getRecentTemperature(teamId, N = 3) {
    return api.get(`/temperature/${teamId}/${N}`)
  }
}
