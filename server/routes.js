const express = require('express')
const routes = express()

const conversionController = require('./controllers/conversionController')

routes.get('/audio-convert', conversionController.get)

routes.get('/video-convert', conversionController.getVideo)

routes.get('/convert-local', conversionController.local)


module.exports = routes
