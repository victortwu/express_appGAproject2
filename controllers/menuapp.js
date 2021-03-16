const express = require('express')
const router = express.Router()

//need a model for menuItems
const Item = require('./models/menu_items')



// menu or index
router.get('/', (req, res) => {
  res.send('<h1>The menu will go here</h1>')
})

// new route
router.get('/new', (req, res) => {
  res.send('new route')
})



module.exports = router
