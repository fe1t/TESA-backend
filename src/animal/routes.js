import bodyParser from 'body-parser'
import express from 'express'

let app = express()
app.use(bodyParser.json())

export default app
