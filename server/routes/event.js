const express = require('express')
const controller = require('../controllers/event')
const auth = require('../lib/middlewares/auth')
// const validation = require('../lib/validators/events-list')
const multer = require("multer")
const path = require("path")
require('express-async-errors')

// Configure Multer to save uploaded images in the "uploads" folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      // Generate a unique filename for the uploaded image
      const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, uniquePrefix + ext);
    },
});

// const upload = multer({dest: "uploads/"})
const upload = multer({ storage });

const app = express.Router()
app.use('/uploads', express.static('uploads'));

app.get( '/', controller.getEvents )
app.post( '/', upload.single("eventBild"), auth, controller.addEvent )
app.delete('/:id', auth, controller.deleteEvent )

app.post('/join', auth, controller.joinEvent)

app.get('/:id',  controller.getSingleEvent )

app.patch('/:id', upload.single("eventBild") , controller.updateEvent )

module.exports = app