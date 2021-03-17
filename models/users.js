const mongoose = require('mongoose')
const { Schema, model } = mongoose

const usersSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true }
})

const User = model('User', usersSchema)

modules.exports = User
