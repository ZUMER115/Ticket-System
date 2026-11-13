const express = require('express')
const app = express()
require('dotenv').config()

app.use(express.json())

app.use(require('./routes/metricRoutes.js'))
app.use(require('./middleware/metricsMiddleware.js'))

app.use('/api', require('./routes/ticketRoutes.js'))

module.exports = app