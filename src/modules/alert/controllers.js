import { Alert } from './models'
import Api from 'src/common/api/index'

export const addAlert = req => {
  let d = {}
  d.teamId = req.body.teamId
  d.description = req.body.description

  const D = new Alert(d)
  D.save(err => {
    if (err) throw err
    console.log('Successfully saved alert')
  })
}
