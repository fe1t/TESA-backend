import mongoose from 'mongoose'

const din1 = mongoose.Schema({
  // teamID: {
  //   type: Number
  // },
  sensID: {
    type: String
  },
  val: {
    type: String
  },
  date: {
    type: String,
    default: Date.now()
  }
})

export const Din1 = mongoose.model('Din1', din1)
