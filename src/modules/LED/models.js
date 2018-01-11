import mongoose from 'mongoose'

const LEDSchema = mongoose.Schema({
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

export const LED = mongoose.model('LED', LEDSchema)
