import { Accelerometer } from './models'
import Api from 'src/common/api/index'

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
    Accelerometer.find({ sensId: d.sensId }, (err, doc) => {
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
      accelerometers
    })
  })
}

export const filterByHourAgo = req => {
  var currentDate = new Date()
  var hourAgo = currentDate.getHours() - req.body.hourAgo

  Accelerometer.find({})
    .where('date')
    .gt(hourAgo)
    .exec(function(err, accelerometers) {
      if (err) throw err
      return {
        accelerometers
      }
    })
}
