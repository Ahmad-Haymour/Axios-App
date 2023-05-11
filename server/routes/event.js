const express = require('express')
const controller = require('../controllers/event')
const auth = require('../lib/middlewares/auth')
// const validation = require('../lib/validators/events-list')
const multer = require("multer")
require('express-async-errors')

const upload = multer({dest: "uploads/"})

const app = express.Router()

app.get( '/', controller.getEvents )
app.post( '/', upload.single("eventBild"), auth, controller.addEvent )
app.delete('/:id', auth, controller.deleteEvent )

app.post('/join', auth, controller.joinEvent)

app.get('/:id',  controller.getSingleEvent )

app.patch('/:id', upload.single("eventBild") , controller.updateEvent )

module.exports = app