import api from './manager'

const teamId = 37

const Api = {
  getAccelerometer() {
    return api.get(`/accelerometer/${teamId}/all`)
  },
  getDin1() {
    return api.get(`/din1/${teamId}/all`)
  },
  getGyroscope() {
    return api.get(`/gyroscope/${teamId}/all`)
  },
  getHumidity() {
    return api.get(`/humidity/${teamId}/all`)
  },
  getLed() {
    return api.get(`/leds/${teamId}/all`)
  },
  getMagnetometer() {
    return api.get(`/magnetometer/${teamId}/all`)
  },
  getPressure() {
    return api.get(`/pressure/${teamId}/all`)
  },
  getTemperature() {
    return api.get(`/temperature/${teamId}/all`)
  }
}

export default Api
