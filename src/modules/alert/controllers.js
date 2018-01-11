import { Alert } from './models'
import Api from 'src/common/api/index'

export const add = async (req, res) => {
  return new Promise((resolve, reject) => {
    let d = {}
    d.teamID = req.body.teamID
    if (!d.teamID) return reject({ message: 'Team id cannot be empty' })
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
  let N = req.params.N
  let alert = Alert.find().sort('date')
  if (N) alert = alert.limit(parseInt(N))
  return alert.then(data => ({ data })).catch(err => ({ data: err }))
}
