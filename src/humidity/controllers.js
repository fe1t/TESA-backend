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
    Humidity.find({ sensId: d.sensId }, (err, doc) => {
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
  Humidity.find({}).then(humandities => {
    res.json({
      humandities
    })
  })
}

export const filterByHourAgo = req => {
  var currentDate = new Date()
  var hourAgo = currentDate.getHours() - req.body.hourAgo

  Humidity.find({})
    .where('date')
    .gt(hourAgo)
    .exec(function(err, humandities) {
      if (err) throw err
      return {
        humandities
      }
    })
}