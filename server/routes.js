const express = require('express')
const routes = express()

const conversionController = require('./controllers/conversionController')

routes.post('/convert', conversionController.post)

module.exports = routes
