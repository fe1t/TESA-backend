import Api from 'src/common/api/index'
import { Pressure } from './models'
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
  let data = await Api.getPressure()
  data = data.data.data
  data.map(d => {
    Pressure.find({ sensID: d.sensID }, (err, doc) => {
      if (doc.length) {
        console.log('Document Pressure already exists')
      } else {
        let D = new Pressure(d)
        D.save(err => {
          if (err) throw err
          console.log('Successfully saved Pressure.')
        })
      }
    })
  })
}

export const showAll = (req, res) => {
  Pressure.find({}).then(pressures => {
    res.json({
      data: pressures
    })
  })
}

export const filterByHourAgo = req => {
  let toDate = req.body.date
  let fromDate = moment(selectedDate)
    .subtract(30, 'minutes')
    .toDate()

  Pressure.find({
    $and: [{ date: { $gte: fromDate } }, { date: { $lte: toDate } }]
  }).exec(function(err, pressures) {
    if (err) throw err
    return {
      data: pressures
    }
  })
}

export const filterByTimeRange = req => {
  return new Promise((resolve, reject) => {
    let startTime = moment(req.params.startTime, 'HHmm').toDate()
    let endTime = moment(req.params.endTime, 'HHmm').toDate()

    Pressure.find({
      $and: [{ date: { $lte: endTime } }, { date: { $gte: startTime } }]
    }).exec(function(err, pressures) {
      if (err) reject(err)
      return resolve({
        data: pressures
      })
    })
  })
}
