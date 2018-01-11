import mongoose from 'mongoose'

const pressureSchema = mongoose.Schema({
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

export const Pressure = mongoose.model('Pressure', pressureSchema)
