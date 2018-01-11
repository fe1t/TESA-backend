import mongoose from 'mongoose'

const temperatureSchema = mongoose.Schema({
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

export const Temperature = mongoose.model('Temperature', temperatureSchema)
