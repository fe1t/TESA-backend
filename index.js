import { apiRouter, router } from 'src/routes'

import bodyParser from 'body-parser'
import dbConfig from './config/db'
import express from 'express'
import mongoose from 'mongoose'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api', apiRouter)
app.use('/site', router)

app.set('view engine', 'ejs')

mongoose.Promise = global.Promise
mongoose.connect(dbConfig.url + dbConfig.name, {})

// eslint-disable-next-line no-console

// eslint-disable-next-line no-console
app.listen(3000, () => console.log('Example app listening on port 3000!'))
