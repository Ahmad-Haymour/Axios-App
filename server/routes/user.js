const express = require('express')
const controller = require('../controllers/user')
const auth = require('../lib/middlewares/auth')
require('express-async-errors')
const validator = require('../lib/validators/user')

const multer = require('multer')
const app = express.Router()

const upload = multer({dest: "uploads/"})

app.route('/')
    .get( auth ,controller.getCurrentUser )
    .patch( auth , upload.single("avatar") , controller.updateUser)

app.get('/all',  controller.getUsers)

app.post('/register' ,upload.single("avatar"), validator.register, controller.register )
app.post('/login', validator.login, controller.login )
app.post('/logout', auth, controller.logout)

app.get('/:id',  controller.getSingleUser)

module.exports = app