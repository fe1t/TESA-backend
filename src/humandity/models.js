import mongoose from 'mongoose'

const humanditySchema = mongoose.Schema({
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

export const Humandity = mongoose.model('Humandity', humanditySchema)
