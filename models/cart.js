const mongoose = require('mongoose')
const { Schema, model } = mongoose


const cartSchema = new Schema({
  name: String,
  price: Number
})

const Cart = model('Cart', cartSchema)

module.exports = Cart
