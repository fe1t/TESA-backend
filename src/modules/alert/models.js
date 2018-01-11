import mongoose from 'mongoose'

const alertSchema = mongoose.Schema({
  teamID: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    default: 'ALERT !'
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

export const Alert = mongoose.model('Alert', alertSchema)
