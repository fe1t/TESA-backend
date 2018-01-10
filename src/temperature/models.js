import mongoose from 'mongoose'

const temperatureSchema = mongoose.Schema({
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
    type: String,
    default: Date.now()
  }
})

export const Temperature = mongoose.model('Temperature', temperatureSchema)
