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
      temperatures
    })
  })
}

export const filterByHourAgo = req => {
  var currentDate = new Date()
  var hourAgo = currentDate.getHours() - req.body.hourAgo

  Temperature.find({})
    .where('date')
    .gt(hourAgo)
    .exec(function(err, temperatures) {
      if (err) throw err
      return {
        temperatures
      }
    })
}
