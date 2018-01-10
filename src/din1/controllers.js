import Api from 'src/common/api/index'
import { Din1 } from './models'

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
  let data = await Api.getDin1()
  data = data.data.data
  data.map(d => {
    Din1.find({ sensId: d.sensId }, (err, doc) => {
      if (doc.length) {
        console.log('Document Din1 already exists')
      } else {
        let D = new Din1(d)
        D.save(err => {
          if (err) throw err
          console.log('Successfully saved Din1.')
        })
      }
    })
  })
}

export const showAll = (req, res) => {
  Din1.find({}).then(din1s => {
    res.json({
      din1s
    })
  })
}

export const filterByHourAgo = req => {
  var currentDate = new Date()
  var hourAgo = currentDate.getHours() - req.body.hourAgo

  Din1.find({})
    .where('date')
    .gt(hourAgo)
    .exec(function(err, din1s) {
      if (err) throw err
      return {
        din1s
      }
    })
}
