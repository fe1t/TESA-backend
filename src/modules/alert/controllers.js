import { Alert } from './models'
import Api from 'src/common/api/index'

export const add = async (req, res) => {
  return new Promise((resolve, reject) => {
    let d = {}
    d.teamId = req.body.teamId
    if (!d.tempId) return reject({ message: 'Team id cannot be empty' })
    d.description = req.body.description

    const D = new Alert(d)
    return D.save()
      .then(() => {
        return resolve({ message: 'Successfully saved alert' })
      })
      .catch(err => {
        return reject({ message: err })
      })
  })
}

export const show = req => {
  return new Promise((resolve, reject) => {
    Alert.find()
      .sort('date')
      .then(data => resolve({ data }))
      .catch(err => reject({ data: err }))
  })
}
