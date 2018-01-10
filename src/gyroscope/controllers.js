import Api from 'src/common/api/index'
import { Gyroscope } from './models'

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
  let data = await Api.getGyroscope()
  data = data.data.data
  data.map(d => {
    Gyroscope.find({ sensID: d.sensID }, (err, doc) => {
      if (doc.length) {
        console.log('Document Gyroscope already exists')
      } else {
        let D = new Gyroscope(d)
        D.save(err => {
          if (err) throw err
          console.log('Successfully saved Gyropscope.')
        })
      }
    })
  })
}

export const showAll = (req, res) => {
  Gyroscope.find({}).then(gyroscopes => {
    res.json({
      data: gyroscopes
    })
  })
}

export const filterByHourAgo = req => {
  let toDate = req.body.date
  let fromDate = moment(selectedDate)
    .subtract(30, 'minutes')
    .toDate()

  Gyroscope.find({
    $and: [{ date: { $gte: fromDate } }, { date: { $lte: toDate } }]
  }).exec(function(err, gyroscopes) {
    if (err) throw err
    return {
      data: gyroscopes
    }
  })
}
