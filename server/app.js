require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()

// Define a route to serve the webpage showing the list of files
app.get('/uploads', (req, res) => {
    const uploadDirectory = path.join(__dirname, 'uploads');
  
    fs.readdir(uploadDirectory, (err, files) => {
      if (err) {
        return res.status(500).send('Error reading the "uploads" directory.');
      }
  
      const fileNames = files.filter((file) => fs.statSync(path.join(uploadDirectory, file)).isFile());
  
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Uploaded Files</title>
        </head>
        <body>
          <h1>List of Uploaded Files</h1>
          <ul>
            ${fileNames.map((fileName) => `<li>${fileName}</li>`).join('')}
          </ul>
        </body>
        </html>
      `;
  
      res.send(html);
    });
  });
  

const {PORT, DB_URL, DB_PORT, DB_NAME, MongoDB_Connection} = process.env

// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
mongoose.set("strictQuery", false);

// Define the database URL to connect to.
const mongoDB = MongoDB_Connection

// Previous server
// const mongoDB = `mongodb://${DB_URL}:${DB_PORT}/${DB_NAME}`

// Connecting to the database
mongoose
    .connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connected to database");
    })
    .catch((error) => {
        console.log("database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
});

const corsConfig = {
  origin: 'https://axios-events.onrender.com',
  credentials: true,
};

app.use(cors(corsConfig))
app.options('*', cors(corsConfig))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.use('/user', require('./routes/user'))
app.use('/event', require('./routes/event') )
app.use('/comment', require('./routes/comment'))
app.use('/messenger', require('./routes/messenger'))

app.use(express.static('uploads'))

app.post('/drop-database', async(req, res, next)=>{
    await mongoose.connection.db.dropDatabase()
    res.status(200).send('Database dropped successfully')
})

app.use( (req, res, next)=>{
    const error = new Error('Falsche URL!')
    error.status = 404
    return next(error)
})

app.use( (error, req, res, next)=>{

    res.status(error.status || 500).send({
        error: error.message
    })
})

app.listen(PORT, ()=> console.log('Server running on port: ', PORT))