const express = require('express')
const router = express.Router()

const Cart = require('../models/cart')




// routes
//cart index linked to cart icon
router.get('/', (req, res) => {
  Cart.findOne( {userId: req.session.currentUser._id}, (err, foundCart, next) => {
    console.log('Cart index cart: ', foundCart)
    if(err) {
      console.log(err)
      next(err)
    } else {
      res.render('cart_index.ejs', {
        cartItem: foundCart,
        currentUser: req.session.currentUser
      })
    }
  })
})






// get cart page
router.get('/:id', (req, res) => {
  console.log('From line 13', req.params.id)
  Cart.findById(req.params.id, (err, foundItem) => {
    console.log('From line 14', foundItem)
    // maybe the logic can go in here
    console.log(req.session)
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

const userId = req.session.currentUser._id
const { productId, name, description, img, price, quantity, availability } = req.body
  //this DOES push into array, just got to figure out how to get it on to the page
  Cart.findOneAndUpdate( {userId}, { $push: { cartItems: [{
      productId,
      name,
      description,
      img,
      price,
      quantity,
      availability
    }]}}, (err, result) => {
      if (err) {
        console.log(err)
      } else if (result === null) {
        console.log('At line 66:', result)
        Cart.create({userId, cartItems: [{
                      productId,
                      name,
                      description,
                      img,
                      price,
                      quantity,
                      availability
                 }]}, (err, createdCart)=> {
                  console.log('From line 64', createdCart)
                  res.redirect('/cart/' + createdCart.id)
                })
              } else {
        res.redirect(result._id)
      }
    })
})



//delete route for fake 'Place Order'
router.delete('/:id', (req, res) => {
  Cart.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/cart')
    }
  })
})

// remove current item from cartItems array
router.put('/:id/:itemId', (req, res) => {
  console.log('Line 101 req dot body:', req.body)
  console.log('Line 102 id number you are getting: ', req.params.id)
  console.log('Line 103 itemId number you are getting: ', req.params.itemId)
  Cart.findByIdAndUpdate(req.params.id, {$pull: {cartItems: {_id: req.params.itemId}}}, (err, foundCart) => {
    console.log('At line 105: ', foundCart)


    foundCart.save()
    res.redirect('/cart')
  })
})







// buy route - PUT
// this route will redirect to 'reciept' page


module.exports = router
