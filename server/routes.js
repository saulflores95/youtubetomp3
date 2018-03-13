const express = require('express')
const routes = express()

const conversionController = require('./controllers/conversionController')

routes.get('/convert', conversionController.get)

routes.get('/convert-local', conversionController.local)


module.exports = routes
