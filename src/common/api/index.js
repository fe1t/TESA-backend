import api from './manager'

const Api = {
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
  }
}

export default Api
