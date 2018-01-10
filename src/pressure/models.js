import mongoose from 'mongoose'

const pressureSchema = mongoose.Schema({
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

export const Pressure = mongoose.model('Pressure', pressureSchema)
