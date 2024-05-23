import express from 'express'
import morgan from 'morgan'
import routes from './routes/index'
import cors from 'cors'
require('./db.js')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/', routes)

export { app }
