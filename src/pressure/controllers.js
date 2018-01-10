import Api from 'src/common/api/index'
import { Pressure } from './models'

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
    Pressure.find({ sensId: d.sensId }, (err, doc) => {
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
      pressures
    })
  })
}

export const filterByHourAgo = req => {
  var currentDate = new Date()
  var hourAgo = currentDate.getHours() - req.body.hourAgo

  Pressure.find({})
    .where('date')
    .gt(hourAgo)
    .exec(function(err, pressures) {
      if (err) throw err
      return {
        pressures
      }
    })
}
