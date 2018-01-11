import { Accelerometer } from './models'
import Api from 'src/common/api/index'
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
  return new Promise(async (resolve, reject) => {
    const teamID = teamId || req.params.teamId
    let data = await Api.getAccelerometer(teamID)
    let ret = { teamId: teamID }
    if (data.data.statusCode != '00') {
      ret.message = 'Sensor data not found'
      return resolve(ret)
    }
    data = data.data.data
    const waiter = await Promise.all(
      data.map(
        d => {
          // Accelerometer.find({ sensID: d.sensID })
          //   .then(doc => {
          //     if (doc.length) {
          //       console.log(teamID, 'Accelerometer already exists')
          //     } else {
          d.teamID = teamID
          let D = new Accelerometer(d)
          D.save(err => {
            if (err) throw err
            console.log(teamID, 'Successfully saved Accelerometer')
          })
        }
        //     }
        //   })
        //   .catch(err => {
        //     console.log(err)
        //   })
      )
    )
    ret.message = 'Successfully saved'
    resolve(ret)
  })
}

export const showAll = (req, res) => {
  Accelerometer.find({}).then(accelerometers => {
    res.json({
      data: accelerometers
    })
  })
}

export const filterByHourAgo = req => {
  let toDate = req.body.date
  let fromDate = moment(selectedDate)
    .subtract(30, 'minutes')
    .toDate()

  Accelerometer.find({
    $and: [{ date: { $gte: fromDate } }, { date: { $lte: toDate } }]
  }).exec(function(err, accelerometers) {
    if (err) throw err
    return {
      data: accelerometers
    }
  })
}

export const filterByTimeRange = (req, res) => {
  return new Promise((resolve, reject) => {
    let startTime = moment(req.params.startTime, 'HHmm').toDate()
    let endTime = moment(req.params.endTime, 'HHmm').toDate()

    Accelerometer.find({
      $and: [{ date: { $lte: endTime } }, { date: { $gte: startTime } }]
    }).exec(function(err, accelerometers) {
      if (err) reject(err)
      return resolve({
        data: accelerometers
      })
    })
  })
}
