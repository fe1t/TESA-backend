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

export const fetch = async () => {
  let data = await Api.getAccelerometer()
  data = data.data.data
  data.map(d => {
    Accelerometer.find({ sensID: d.sensID }, (err, doc) => {
      if (doc.length) {
        console.log('Document Accelerometer already exists')
      } else {
        let D = new Accelerometer(d)
        D.save(err => {
          if (err) throw err
          console.log('Successfully saved Accelerometer.')
        })
      }
    })
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
