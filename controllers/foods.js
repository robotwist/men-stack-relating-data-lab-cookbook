const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// Index - GET /users/:userId/foods
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('pantry');
    res.render('foods/index.ejs', { pantry: user.pantry, userId: req.params.userId });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

// New - GET /users/:userId/foods/new
router.get('/new', async (req, res) => {
  try {
    res.render('foods/new.ejs', { userId: req.params.userId });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

// Create - POST /users/:userId/foods
router.post('/', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.pantry.push(req.body);
    await user.save();
    res.redirect(`/users/${req.params.userId}/foods`);
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

// Delete - DELETE /users/:userId/foods/:itemId
router.delete('/:itemId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.pantry.id(req.params.itemId).remove();
    await user.save();
    res.redirect(`/users/${req.params.userId}/foods`);
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

module.exports = router;