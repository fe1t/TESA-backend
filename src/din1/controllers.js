import Api from 'src/common/api/index'
import { Din1 } from './models'
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
    let data = await Api.getDin1(teamID)
    let ret = { teamId: teamID }
    if (data.data.statusCode != '00') {
      ret.message = 'Sensor data not found'
      return resolve(ret)
    }
    data = data.data.data
    const waiter = await Promise.all(
      data.map(d =>
        Din1.find({ sensID: d.sensID })
          .then(doc => {
            if (doc.length) {
              console.log(teamID, 'Din1 already exists')
            } else {
              d.teamID = teamID
              let D = new Din1(d)
              D.save(err => {
                if (err) throw err
                console.log(teamID, 'Successfully saved Din1')
              })
            }
          })
          .catch(err => {
            console.log(err)
          })
      )
    )
    ret.message = 'Successfully saved'
    resolve(ret)
  })
}

export const showAll = (req, res) => {
  Din1.find({}).then(din1s => {
    res.json({
      data: din1s
    })
  })
}

export const filterByHourAgo = req => {
  let toDate = req.body.date
  let fromDate = moment(selectedDate)
    .subtract(30, 'minutes')
    .toDate()

  Din1.find({
    $and: [{ date: { $gte: fromDate } }, { date: { $lte: toDate } }]
  }).exec(function(err, din1s) {
    if (err) throw err
    return {
      data: din1s
    }
  })
}

export const filterByTimeRange = (req, res) => {
  return new Promise((resolve, reject) => {
    let startTime = moment(req.params.startTime, 'HHmm').toDate()
    let endTime = moment(req.params.endTime, 'HHmm').toDate()

    Din1.find({
      $and: [{ date: { $lte: endTime } }, { date: { $gte: startTime } }]
    }).exec(function(err, din1s) {
      if (err) reject(err)
      return resolve({
        data: din1s
      })
    })
  })
}
