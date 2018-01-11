import moment from 'moment'

export default {
  fetch: (req, res, Model, getModel, teamId) => {
    return new Promise(async (resolve, reject) => {
      const teamID = teamId || req.params.teamId
      let data = await getModel(teamID)
      let ret = { teamId: teamID }
      if (data.data.statusCode != '00') {
        ret.message = 'Sensor data not found'
        return resolve(ret)
      }
      data = data.data.data
      const waiter = await Promise.all(
        data.map(
          d => {
            // Model.find({ sensID: d.sensID })
            //   .then(doc => {
            //     if (doc.length) {
            //       console.log(teamID, 'Model already exists')
            //     } else {
            d.teamID = teamID
            let D = new Model(d)
            D.save(err => {
              if (err) throw err
              console.log(teamID, 'Successfully saved Model')
            })
          }
          //     }
          //   })
          //   .catch(err => {
          //     console.log(err)
          //   })
        )
      )
      ret.message = 'Successfully saved'
      console.log(`Done fetching [${teamID}]`)
      resolve(ret)
    })
  },

  showAll: (req, res, Model) => {
    Model.find().then(data => {
      res.json({
        data
      })
    })
  },

  showLastTwenty: (req, res, Model) => {
    Model.find()
      .sort('-date')
      .limit(Number(req.params.number))
      .then(data => {
        res.json({
          data
        })
      })
  },

  filterByHourAgo: (req, Model) => {
    let toDate = req.body.date
    let fromDate = moment(toDate)
      .subtract(30, 'minutes')
      .toDate()

    Model.find({
      $and: [{ date: { $gte: fromDate } }, { date: { $lte: toDate } }]
    }).exec((err, data) => {
      if (err) throw err
      return {
        data
      }
    })
  },

  filterByTimeRange: (req, res, Model) => {
    return new Promise((resolve, reject) => {
      let startTime = moment(req.params.startTime, 'HHmm').toDate()
      let endTime = moment(req.params.endTime, 'HHmm').toDate()

      Model.find({
        $and: [{ date: { $lte: endTime } }, { date: { $gte: startTime } }]
      })
        .sort('date')
        .then(data => {
          return resolve({
            data
          })
        })
        .catch(err => resolve(err))
    })
  }
}
