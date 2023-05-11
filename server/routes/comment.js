const express = require('express')
const auth = require('../lib/middlewares/auth')
const controller = require('../controllers/comment')
require('express-async-errors')

const app = express.Router()

app.post('/', auth, controller.createComment)

app.delete('/', auth,  controller.deleteComment)

module.exports = app