import api from './manager'

const Api = {
  testApi() {
    return api.get('/')
  }
}

export default Api
