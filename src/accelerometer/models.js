import mongoose from 'mongoose'

const accelerometerSchema = mongoose.Schema({
  // teamID: {
  //   type: Number
  // },
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
    type: String,
    default: Date.now()
  }
})

export const Accelerometer = mongoose.model('Accelerometer', accelerometerSchema)
