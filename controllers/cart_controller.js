const express = require('express')
const router = express.Router()

const Cart = require('../models/cart')




// routes

// get cart page
router.get('/:id', (req, res) => {
  Cart.findById(req.params.id, (err, foundItem) => {
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
  console.log(req.body)
  // const { productId, name, description, img, price, availability } = req.body
  // console.log(req.body)
  const newCartItem = Cart.create(req.body
    // cartItems: [
      // productId: productId,
      // name: name,
      // description: description,
      // img: img,
      // price: price,
      // availability: availability
      // }]
  , (err, result)=> {
    console.log(result)
    // Cart.cartItems.push(result)
    res.redirect('/cart/' + req.params.id)
  })

  // newCartItem.save()
  //for item document use model.create()??

})





// buy route - PUT
// this route will redirect to 'reciept' page


module.exports = router
