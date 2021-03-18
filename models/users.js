const mongoose = require('mongoose')
const { Schema, model } = mongoose

//require the cartSchema here

const usersSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true }
// mongoose association, import cart model

// include an empty array for cart items

// something like: { type: mongoose.Schema.Types.ObjectId,
                  // ref: 'Cart'
                  //}

})

const User = model('User', usersSchema)

modules.exports = User
