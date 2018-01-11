import mongoose from 'mongoose'

const humiditySchema = mongoose.Schema({
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

export const Humidity = mongoose.model('Humidity', humiditySchema)
