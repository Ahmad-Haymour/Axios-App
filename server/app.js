require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()

const {PORT, DB_URL, DB_PORT, DB_NAME} = process.env

// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
mongoose.set("strictQuery", false);

// Define the database URL to connect to.
const mongoDB = `mongodb://${DB_URL}:${DB_PORT}/${DB_NAME}`

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

// app.use(express.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// const bodyparser = require("body-parser");
// app.use(bodyparser.urlencoded({ extended: true }));
// app.use(bodyparser.json());

app.use(cookieParser())


// const corsOpts = {
//     origin: '*',
  
//     methods: [
//       'GET',
//       'POST',
//     ],
  
//     allowedHeaders: [
//       'Content-Type',
//     ],
//   };
  
//   app.use(cors(corsOpts));

const corsConfig = {
    origin: 'http://127.0.0.1:3000',
    credentials: true
}

app.use(cors(corsConfig))
app.options('*', cors(corsConfig))

app.use('/user', require('./routes/user'))
// app.use('/events', require('./routes/events-list') )
// app.use('/comments', require('./routes/comment'))
// app.use('/chat', require('./routes/messenger'))

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