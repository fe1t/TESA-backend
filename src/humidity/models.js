import mongoose from 'mongoose'

const humiditySchema = mongoose.Schema({
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

export const Humidity = mongoose.model('Humidity', humiditySchema)
