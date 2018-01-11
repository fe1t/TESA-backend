import Api from 'src/common/api/index'
import { LED } from './models'
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
  let data = await Api.getLed()
  data = data.data.data
  data.map(d => {
    LED.find({ sensID: d.sensID }, (err, doc) => {
      if (doc.length) {
        console.log('Document LED already exists')
      } else {
        let D = new LED(d)
        D.save(err => {
          if (err) throw err
          console.log('Successfully saved LED.')
        })
      }
    })
  })
}

export const showAll = (req, res) => {
  LED.find({}).then(leds => {
    res.json({
      data: leds
    })
  })
}

export const filterByHourAgo = req => {
  let toDate = req.body.date
  let fromDate = moment(selectedDate)
    .subtract(30, 'minutes')
    .toDate()

  LED.find({
    $and: [{ date: { $gte: fromDate } }, { date: { $lte: toDate } }]
  }).exec(function(err, leds) {
    if (err) throw err
    return {
      data: leds
    }
  })
}

export const filterByTimeRange = req => {
  return new Promise((resolve, reject) => {
    let startTime = moment(req.params.startTime, 'HHmm').toDate()
    let endTime = moment(req.params.endTime, 'HHmm').toDate()

    LED.find({
      $and: [{ date: { $lte: endTime } }, { date: { $gte: startTime } }]
    }).exec(function(err, leds) {
      if (err) reject(err)
      return resolve({
        data: leds
      })
    })
  })
}
