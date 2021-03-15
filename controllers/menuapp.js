const express = require('express')
const router = express.Router()

//need a model




// menu or index
router.get('/', (req, res) => {
  res.send('<h1>The menu will go here</h1>')
})

// new route
router.get('/new', (req, res) => {
  res.send('new route')
})



module.exports = router
