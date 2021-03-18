require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT

// setup DATABASE and connect
const mongoose = require('mongoose')

const mongoURI = process.env.MONGODBURI

const db = mongoose.connection

mongoose.connect(mongoURI, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log('Database connected')
})

db.on('error', (err) => { console.log('ERROR: ', err) })
db.on('connected', () => { console.log('mongo connected') })
db.on('disconnected', () => { console.log('mongo DISconnected') })


// MIDDLEWARE
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

app.use((req, res, next) => {
  next()
})

app.use(express.static('public'))

app.use(express.urlencoded( { extended: true } ))

// when adding users and sessions, don't forget to install express-session


// HOME PAGE route
app.get('/', (req, res) => {
  res.render('home.ejs')
})

//====== CONTROLLERS =========\\

const menuControllers = require('./controllers/menuapp')
app.use('/menu', menuControllers)

const cartControllers = require('./controllers/cart')
app.use('/cart', cartControllers)



app.listen(PORT, () => {
  console.log('Project 2 listening on port', PORT)
})
