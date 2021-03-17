const express = require('express')
const router = express.Router()

//need a model for menuItems
const Item = require('../models/menu_items')



// menu or index
router.get('/', (req, res) => {
  res.render('index.ejs')
})

// new route //do I need this?
router.get('/new', (req, res) => {
  res.send('new route')
})

// edit route //do I need this?

//show route
router.get('/:id', (req, res) => {
  res.render('show.ejs')
})

module.exports = router
