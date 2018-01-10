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
  console.log(data)
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
  var hourAgo = new Date()
  var hour = req.body.hourAgo || 0.5
  hourAgo.setHours(hourAgo.getHours() - hour)

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
