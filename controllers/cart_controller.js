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
    console.log(req.sessions)
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

// let foundCart = Cart.findOne({userId}, (err, result) => {
//   console.log('At line 36, just result:', result)
//   console.log('At line 37, result.cartItems[1].name:', result.cartItems[1].name)
//   console.log('At line 37, req.body:', req.body)
//   if (err) {
//     console.log(err)
//     res.send(err)
//   } else {
//     res.send(result)
//   }
//
//
// })
//
// console.log('At line 40', foundCart)

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

// Cart.create({userId, cartItems: [{
//               productId,
//               name,
//               description,
//               img,
//               price,
//               quantity,
//               availability
//          }]}, (err, createdCart)=> {
//           console.log('From line 64', createdCart)
//           res.redirect('/cart/' + createdCart.id)
//         })


})













// buy route - PUT
// this route will redirect to 'reciept' page


module.exports = router
