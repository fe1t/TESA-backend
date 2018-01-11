import mongoose from 'mongoose'

const din1 = mongoose.Schema({
  teamID: {
    type: Number
  },
  sensID: {
    type: Number
  },
  val: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

export const Din1 = mongoose.model('Din1', din1)
