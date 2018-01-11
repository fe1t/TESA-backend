import moment from 'moment'

const saveObject = (Model, d, teamID) => {
  let D = new Model(d)
  return D.save()
    .then(() => {
      console.log(teamID, `Successfully saved ${Model.modelName}`)
      return Promise.resolve()
    })
    .catch(err => {
      console.log(err)
      return Promise.resolve(err)
    })
}

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
        data.map(d => {
          d.teamID = teamID
          return saveObject(Model, d, teamID)
        })
      ).then(() => {
        console.log(`Done fetching [${teamID}]`)
      })
      ret.message = 'Successfully saved'
      resolve(ret)
    })
  },

  fetchUpdate: (req, res, Model, getModel, teamId, N) => {
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
        data.map(d => {
          return Model.find({ $and: [{ sensID: d.sensID }, { teamID: teamID }] })
            .then(doc => {
              if (doc.length) {
                console.log(teamID, `${Model.modelName} already exists`)
              } else {
                d.teamID = teamID
                return saveObject(Model, d, teamID)
              }
            })
            .catch(err => {
              console.log(err)
            })
        })
      ).then(() => {
        console.log(`Done fetching [${teamID}]`)
      })
      ret.message = 'Successfully saved'
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
    const N = Number(req.params.number) || 20
    Model.find()
      .sort('-date')
      .limit(N)
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
      let startTime = moment(`2018/01/11 ${req.params.startTime}`, 'YYYY/MM/DD HHmm').toDate()
      let endTime = moment(`2018/01/11 ${req.params.endTime}`, 'YYYY/MM/DD HHmm').toDate()
      Model.find({
        $and: [{ date: { $lte: endTime } }, { date: { $gte: startTime } }]
      })
        .sort('date')
        .then(data => resolve({ data }))
        .catch(err => reject({ data: err }))
    })
  }
}
