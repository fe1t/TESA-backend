import Api from 'src/common/api/index'
import { LED } from './models'

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
    LED.find({ sensId: d.sensId }, (err, doc) => {
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
      leds
    })
  })
}

export const filterByHourAgo = req => {
  var currentDate = new Date()
  var hourAgo = currentDate.getHours() - req.body.hourAgo

  LED.find({})
    .where('date')
    .gt(hourAgo)
    .exec(function(err, leds) {
      if (err) throw err
      return {
        leds
      }
    })
}
