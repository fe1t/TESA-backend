import Api from 'src/common/api/index'
import { Magnetometer } from './models'

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
  let data = await Api.getMagnetometer()
  data = data.data.data
  data.map(d => {
    Magnetometer.find({ sensID: d.sensID }, (err, doc) => {
      if (doc.length) {
        console.log('Document Magnetometer already exists')
      } else {
        let D = new Magnetometer(d)
        D.save(err => {
          if (err) throw err
          console.log('Successfully saved Magnetometer.')
        })
      }
    })
  })
}

export const showAll = (req, res) => {
  Magnetometer.find({}).then(magnetometers => {
    res.json({
      data: magnetometers
    })
  })
}

export const filterByHourAgo = req => {
  let toDate = req.body.date
  let fromDate = moment(selectedDate)
    .subtract(30, 'minutes')
    .toDate()

  Magnetometer.find({
    $and: [{ date: { $gte: fromDate } }, { date: { $lte: toDate } }]
  }).exec(function(err, magnetometers) {
    if (err) throw err
    return {
      data: magnetometers
    }
  })
}
