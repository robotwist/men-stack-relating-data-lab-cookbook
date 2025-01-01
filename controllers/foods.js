const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// Index - GET /users/:userId/foods
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('pantry');
    if (!user) {
      console.error('User not found');
      return res.redirect('/');
    }
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
router.post('/:userId/foods', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      console.error('User not found');
      return res.redirect('/');
    }
    user.pantry.push(req.body);
    await user.save();
    res.redirect(`/users/${req.params.userId}/foods`);
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

// Edit - GET /users/:userId/foods/:itemId/edit
router.get('/:itemId/edit', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      console.error('User not found');
      return res.redirect('/');
    }
    const foodItem = user.pantry.id(req.params.itemId);
    res.render('foods/edit.ejs', { userId: req.params.userId, foodItem });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

// Update - PUT /users/:userId/foods/:itemId
router.put('/:itemId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      console.error('User not found');
      return res.redirect('/');
    }
    const foodItem = user.pantry.id(req.params.itemId);
    foodItem.set(req.body);
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
    if (!user) {
      console.error('User not found');
      return res.redirect('/');
    }
    user.pantry.id(req.params.itemId).remove();
    await user.save();
    res.redirect(`/users/${req.params.userId}/foods`);
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

module.exports = router;