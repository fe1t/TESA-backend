import Api from 'src/common/api/index'
import { Humidity } from './models'
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
    let data = await Api.getHumidity(teamID)
    let ret = { teamId: teamID }
    if (data.data.statusCode != '00') {
      ret.message = 'Sensor data not found'
      return reject(ret)
    }
    data = data.data.data
    const waiter = await Promise.all(
      data.map(d =>
        Humidity.find({ sensID: d.sensID }, (err, doc) => {
          return new Promise((resolve, reject) => {
            if (doc.length) {
              resolveMessage = 'Humidity already exists'
              console.log(teamID, resolveMessage)
              resolve(resolveMessage)
            } else {
              d.teamID = teamID
              let D = new Humidity(d)
              D.save(err => {
                if (err) {
                  console.log(err)
                  resolve(err)
                }
                resolveMessage = 'Successfully saved Humidity'
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
  Humidity.find({}).then(humidities => {
    res.json({
      data: humidities
    })
  })
}

export const filterByHourAgo = req => {
  let toDate = req.body.date
  let fromDate = moment(selectedDate)
    .subtract(30, 'minutes')
    .toDate()

  Humidity.find({
    $and: [{ date: { $gte: fromDate } }, { date: { $lte: toDate } }]
  }).exec(function(err, humidities) {
    if (err) throw err
    return {
      data: humidities
    }
  })
}

export const filterByTimeRange = req => {
  return new Promise((resolve, reject) => {
    let startTime = moment(req.params.startTime, 'HHmm').toDate()
    let endTime = moment(req.params.endTime, 'HHmm').toDate()

    Humidity.find({
      $and: [{ date: { $lte: endTime } }, { date: { $gte: startTime } }]
    }).exec(function(err, humidities) {
      if (err) reject(err)
      return resolve({
        data: humidities
      })
    })
  })
}
