import mongoose from 'mongoose'

const magnetometerSchema = mongoose.Schema({
  teamID: {
    type: Number
  },
  sensID: {
    type: Number
  },
  val_x: {
    type: Number
  },
  val_y: {
    type: Number
  },
  val_z: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

export const Magnetometer = mongoose.model('Magnetometer', magnetometerSchema)
