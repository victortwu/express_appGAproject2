const express = require('express')
const router = express.Router()

//need a model for menuItems
const Item = require('../models/menu_items')


// seed route
router.get('/seed', (req, res) => {
  Item.create([
    {
      name: 'House Chicken Döner Kebab Sandwich',
      description: 'Dill yogurt sauce, romaine, tomato, cucumber, red cabbage, house bread (recommended), spinach tortilla, wheat tortilla, or pita wrap.',
      img: 'https://i.imgur.com/0VduqeZ.jpg',
      price: 10,
      availability: true
    },
    {
      name: 'Berliner Lamb and Beef Döner Kebab Sandwich',
      description: 'Garlic yogurt sauce, romaine, tomato, cucumber, red cabbage, house bread (recommended), spinach tortilla, wheat tortilla, or pita wrap.',
      img: 'https://i.imgur.com/0VduqeZ.jpg',
      price: 10,
      availability: true
    },
    {
      name: 'Chicken Döner Kebab Platter',
      description: 'Seasoned rice, garlic sauce OR dill yogurt sauce, tomato, cucumber, red cabbage salad with feta cheese',
      img: 'https://i.imgur.com/aBtWJ8E.jpg',
      price: 10,
      availability: true
    },
    {
      name: 'House Chicken Salad',
      description: 'Romaine, baby spinach, tomato, cucumber, red cabbage, feta cheese – dill yogurt dressing.',
      img: 'https://i.imgur.com/Tx8CRxC.jpg',
      price: 10,
      availability: true
    }
  ], (err, data) => {
    if (err) {
      console.log(err)
    }
    res.redirect('/menu')
  })
})


// menu or index
router.get('/', (req, res) => {
  Item.find({}, (err, foundItems, next) =>{
    if (err) {
      console.log(err)
      next(err)
    } else {
      res.render('index.ejs', {
        items: foundItems,
        currentUser: req.session.currentUser
      })
    }
  })
})


// new route //do I need this?
router.get('/new', (req, res) => {
  res.render('new.ejs', {
    currentUser: req.session.currentUser
  })
})


// create - post
router.post('/', (req, res) => {
  Item.create(req.body, (err, createdItem) => {
    if (err) {
      console.log(err)
      res.send(err)
    } else {
      res.redirect('/menu')
    }
  })
})


// delete route
router.delete('/:id', (req, res) => {
  Item.findByIdAndRemove(req.params.id, (err,data) => {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/menu')
    }
  })
})


// edit route
router.get('/:id/edit', (req, res) => {
  Item.findById(req.params.id, (err, foundItem) => {
    res.render('edit.ejs', {
      item: foundItem,
      currentUser: req.session.currentUser
    })
  })
})

// update PUT
router.put('/:id', (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedItem) => {
    res.redirect('/menu')
  })
})

//show route
router.get('/:id', (req, res) => {
  Item.findById(req.params.id, (err, foundItem) => {
    res.render('show.ejs', {
      items: foundItem,
      currentUser: req.session.currentUser
    })
  })
})

module.exports = router
