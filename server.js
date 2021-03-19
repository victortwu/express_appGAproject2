require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT
const session = require('express-session')


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
app.use(session({ // <--------making req.sessions object
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}))

// HOME PAGE route
app.get('/', (req, res) => {
  res.render('home.ejs', {
    currentUser: req.session.currentUser
  })
})

//====== CONTROLLERS =========\\

const menuController = require('./controllers/menu_controller')
app.use('/menu', menuController)

const cartController = require('./controllers/cart_controller')
app.use('/cart', cartController)

const userController = require('./controllers/users_controller')
app.use('/users', userController)

const sessionsController = require('./controllers/sessions_controller.js')
app.use('/sessions', sessionsController)


app.listen(PORT, () => {
  console.log('Project 2 listening on port', PORT)
})
