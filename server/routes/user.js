const express = require('express')
const controller = require('../controllers/user')
// const auth = require('../lib/middelwares/auth')
require('express-async-errors')
// const validator = require('../lib/validators/user')

const multer = require('multer')
const app = express.Router()

const upload = multer({dest: "uploads/"})

// app.route('/')
//     .get( auth ,controller.getCurrentUser )
//     .patch( auth , upload.single("avatar") , controller.updateUser)

app.get('/all',  controller.getUsers)

app.post('/register' , controller.register )
app.post('/login', controller.login )
app.post('/logout',  controller.logout)

app.get('/:id',  controller.getSingleUser)

// app.patch('/notification',auth , controller.notification )


module.exports = app