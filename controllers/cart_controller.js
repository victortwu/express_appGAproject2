const express = require('express')
const router = express.Router()

const Cart = require('../models/cart')




// routes

// get cart page
router.get('/:id', (req, res) => {
  console.log('From line 13', req.params.id)
  Cart.findById(req.params.id, (err, foundItem) => {
    console.log('From line 14', foundItem)
    // maybe the logic can go in here

    res.render('cart.ejs', {
      cartItem: foundItem,
      currentUser: req.session.currentUser
    })
  })
})
// edit route - PUT

// delete route - DELETE

// Add to cart route - PUT
// this route will push item to cart and redirect to show page (bc that's where the user is)
router.post('/:id', (req, res) => {
  console.log('From line 31', req.body)
  const userId = req.session.currentUser._id
  console.log('From line 33', req.session.currentUser._id)
  const { productId, name, description, img, price, availability } = req.body
  const newCartItem = Cart.create({userId, cartItems: [{
        productId,
        name,
        description,
        img,
        price,
        availability
   }]}, (err, result)=> {
    console.log('From line 42', result)
    res.redirect('/cart/' + result.id)
  })

  // newCartItem.save()
  //for item document use model.create()??

})





// buy route - PUT
// this route will redirect to 'reciept' page


module.exports = router
