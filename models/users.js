const mongoose = require('mongoose')
const { Schema, model } = mongoose

//require the cartSchema here

const usersSchema = new Schema({
  name: { type: String, unique: true, required: true },
  password: String
// mongoose association, import cart model

// include an empty array for cart items

// something like: { type: mongoose.Schema.Types.ObjectId,
                  // ref: 'Cart'
                  //}

})

const User = model('User', usersSchema)

module.exports = User
