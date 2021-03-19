const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()

const User = require('../models/users.js')

router.get('/new', (req, res) => {
  res.render('users/new.ejs')
})

router.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, createdUser) => {
    console.log(req.body)
    if  (err){
            if (err.code===11000) {
                res.send('USER already exist!!!')
            } else {
                res.send(err)
            }
        } else {
            res.send(createdUser)
        }
  })
})

module.exports = router
