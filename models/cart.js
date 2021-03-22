const mongoose = require('mongoose')
const { Schema, model } = mongoose


// let cartItemSchema = new Schema ({
//   productId: {
//     type: mongoose.Schema.Types.ObjectId,
//
//   }
// })




const cartSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  cartItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
      },
      name: String,
      description: String,
      img: String,
      price: Number,
      quantity: Number,
      availability: Boolean
    }
  ]
})

// const cartSchema = new Schema({
//   name: { type: String, required: true },
//   description: String,
//   img: String,
//   price: { type: Number, required: true },
//   availability: { type: Boolean, default: true }
// })



const Cart = model('Cart', cartSchema)

module.exports = Cart
