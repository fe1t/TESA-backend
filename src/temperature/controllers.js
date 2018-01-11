import Api from 'src/common/api/index'
import { Temperature } from './models'

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
  let data = await Api.getTemperature()
  data = data.data.data
  data.map(d => {
    Temperature.find({ sensId: d.sensId }, (err, doc) => {
      if (doc.length) {
        console.log('Document Temperature already exists')
      } else {
        let D = new Temperature(d)
        D.save(err => {
          if (err) throw err
          console.log('Successfully saved Temperature.')
        })
      }
    })
  })
}

export const showAll = (req, res) => {
  Temperature.find({}).then(temperatures => {
    res.json({
      data: temperatures
    })
  })
}

export const filterByHourAgo = req => {
  let toDate = req.body.date
  let fromDate = moment(selectedDate)
    .subtract(30, 'minutes')
    .toDate()

  Temperature.find({
    $and: [{ date: { $gte: fromDate } }, { date: { $lte: toDate } }]
  }).exec(function(err, temperatures) {
    if (err) throw err
    return {
      data: temperatures
    }
  })
}

export const filterByTimeRange = (req, res) => {
  return new Promise((resolve, reject) => {
    let startTime = moment(req.params.startTime, 'HHmm').toDate()
    let endTime = moment(req.params.endTime, 'HHmm').toDate()

    Temperature.find({
      $and: [{ date: { $lte: endTime } }, { date: { $gte: startTime } }]
    }).exec(function(err, temperatures) {
      if (err) reject(err)
      return resolve({
        data: temperatures
      })
    })
  })
}
