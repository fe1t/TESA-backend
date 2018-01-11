import Api from 'src/common/api/index'
import { Gyroscope } from './models'
import moment from 'moment'

export const testGetApi = () => {
  return {
    test: 'Test jha'
  }
}

export const testPost = req => {
  const data = req.body
  return {
    data
  }
}

export const fetch = (req, res, teamId) => {
  let resolveMessage = ''
  return new Promise(async (resolve, reject) => {
    const teamID = teamId || req.params.teamId
    let data = await Api.getGyroscope(teamID)
    let ret = { teamId: teamID }
    if (data.data.statusCode != '00') {
      ret.message = 'Sensor data not found'
      return reject(ret)
    }
    data = data.data.data
    const waiter = await Promise.all(
      data.map(d =>
        Gyroscope.find({ sensID: d.sensID }, (err, doc) => {
          return new Promise((resolve, reject) => {
            if (doc.length) {
              resolveMessage = 'Gyroscope already exists'
              console.log(teamID, resolveMessage)
              resolve(resolveMessage)
            } else {
              d.teamID = teamID
              let D = new Gyroscope(d)
              D.save(err => {
                if (err) {
                  console.log(err)
                  resolve(err)
                }
                resolveMessage = 'Successfully saved Gyroscope'
                console.log(teamID, resolveMessage)
                resolve(resolveMessage)
              })
            }
          })
        })
      )
    )
    ret.message = 'Successfully saved'
    resolve(ret)
  })
}

export const showAll = (req, res) => {
  Gyroscope.find({}).then(gyroscopes => {
    res.json({
      data: gyroscopes
    })
  })
}

export const filterByHourAgo = req => {
  let toDate = req.body.date
  let fromDate = moment(selectedDate)
    .subtract(30, 'minutes')
    .toDate()

  Gyroscope.find({
    $and: [{ date: { $gte: fromDate } }, { date: { $lte: toDate } }]
  }).exec(function(err, gyroscopes) {
    if (err) throw err
    return {
      data: gyroscopes
    }
  })
}

export const filterByTimeRange = req => {
  return new Promise((resolve, reject) => {
    let startTime = moment(req.params.startTime, 'HHmm').toDate()
    let endTime = moment(req.params.endTime, 'HHmm').toDate()

    Gyroscope.find({
      $and: [{ date: { $lte: endTime } }, { date: { $gte: startTime } }]
    }).exec(function(err, gyroscopes) {
      if (err) reject(err)
      return resolve({
        data: gyroscopes
      })
    })
  })
}
