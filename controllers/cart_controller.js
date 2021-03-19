const express = require('express')
const router = express.Router()

const Cart = require('../models/cart')




// routes

// get cart page
router.get('/', (req, res) => {
  res.render('cart.ejs')
})
// edit route - PUT

// delete route - DELETE

// Add to cart route - POST
// this route will push item to cart and redirect to show page (bc that's where the user is)

// buy route - PUT
// this route will redirect to 'reciept' page


module.exports = router
