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
    Magnetometer.find({ sensId: d.sensId }, (err, doc) => {
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
      magnetometers
    })
  })
}

export const filterByHourAgo = req => {
  var currentDate = new Date()
  var hourAgo = currentDate.getHours() - req.body.hourAgo

  Magnetometer.find({})
    .where('date')
    .gt(hourAgo)
    .exec(function(err, magnetometers) {
      if (err) throw err
      return {
        magnetometers
      }
    })
}