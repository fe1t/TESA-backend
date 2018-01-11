import mongoose from 'mongoose'

const accelerometerSchema = mongoose.Schema({
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

export const Accelerometer = mongoose.model('Accelerometer', accelerometerSchema)
