import { Animal } from 'src/animal/model'
import Api from 'common/api'
import assert from 'assert'
import bodyParser from 'body-parser'
import dbConfig from './config/db'
import express from 'express'
import mongoose from 'mongoose'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs')

mongoose.connect(dbConfig.url + dbConfig.name, {})
mongoose.Promise = global.Promise
const cats = new Animal({
  name: 'pispa',
  age: 200
})

cats.save(err => {
  assert.equal(null, err)
})

var db = mongoose.connection
// eslint-disable-next-line no-console
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
  return res.send('Hello World')
})

app.get('/temps', (req, res) => {
  const output = {
    fuck: [1, 2, 3, 4, 5]
  }
  return res.json(output)
})

app.get('/humandities', (req, res) => {
  const output = {
    humandities: [10, 20, 30, 40]
  }
  return res.end(JSON.stringify(output))
})

app.get('/tester', async (req, res) => {
  const test = await Api.testApi()
  return res.json({ success: test.data })
})

// eslint-disable-next-line no-console
app.listen(3000, () => console.log('Example app listening on port 3000!'))
