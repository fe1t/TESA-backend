import Api from 'src/common/api/index'
import { Humidity } from './models'

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
  let data = await Api.getHumidity()
  data = data.data.data
  data.map(d => {
    Humidity.find({ sensID: d.sensID }, (err, doc) => {
      if (doc.length) {
        console.log('Document Humidity already exists')
      } else {
        let D = new Humidity(d)
        D.save(err => {
          if (err) throw err
          console.log('Successfully saved Humidity.')
        })
      }
    })
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
