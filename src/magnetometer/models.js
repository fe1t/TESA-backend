import mongoose from 'mongoose'

const magnetometerSchema = mongoose.Schema({
  teamID: {
    type: Number
  },
  sensID: {
    type: String
  },
  val_x: {
    type: String
  },
  val_y: {
    type: String
  },
  val_z: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

export const Magnetometer = mongoose.model('Magnetometer', magnetometerSchema)
