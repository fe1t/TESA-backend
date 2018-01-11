import mongoose from 'mongoose'

const alertSchema = mongoose.Schema({
  teamID: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    default: 'ALERT !'
  }
})

export const Alert = mongoose.model('Alert', alertSchema)
