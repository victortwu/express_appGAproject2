const mongoose = require('mongoose')
const{ Schema, model } = mongoose

const itemsSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  img: String,
  price: { type: Number, required: true },
  availability: { type: Boolean, default: true }
})

const Item = model('Item', itemsSchema)

module.exports = Item
