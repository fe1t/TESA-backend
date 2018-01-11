import mongoose from 'mongoose'

const LEDSchema = mongoose.Schema({
  teamID: {
    type: Number
  },
  sensID: {
    type: String
  },
  val: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

export const LED = mongoose.model('LED', LEDSchema)
