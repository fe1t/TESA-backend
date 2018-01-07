import mongoose from 'mongoose'

const animalSchema = mongoose.Schema({
  name: String,
  age: Number
})

export const Animal = mongoose.model('Animal', animalSchema)
