import { Animal } from 'src/animal/model'
import assert from 'assert'
import dbConfig from './config/db'
import express from 'express'
import mongoose from 'mongoose'

const app = express()

mongoose.connect(dbConfig.url + dbConfig.name, {})
mongoose.Promise = global.Promise
const cats = new Animal({
  name: 'pispa',
  age: 200
})

cats.save(err => {
  assert.equal(null, err)
  Animal.find({}, (err, res) => {
    assert.equal(null, err)
    // eslint-disable-next-line no-console
    console.log(res)
  })
})

var db = mongoose.connection
// eslint-disable-next-line no-console
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
  return res.send('Hello World')
})
// eslint-disable-next-line no-console
app.listen(3000, () => console.log('Example app listening on port 3000!'))
