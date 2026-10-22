const express = require('express')
const app = express()
require('dotenv').config()
app.use(express.json())

app.use('/api', require('./routes/ticketRoutes.js'))

module.exports = app