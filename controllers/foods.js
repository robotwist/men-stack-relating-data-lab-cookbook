const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require('../models/user.js');
const isSignedIn = require('../middleware/is-signed-in.js');
const Food = require('../models/food');

// Index - GET /users/:userId/foods
router.get('/', isSignedIn, async (req, res) => {
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
router.get('/new', isSignedIn, async (req, res) => {
  try {
    console.log('User ID:', req.params.userId);
    res.render('foods/new.ejs', { userId: req.params.userId });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

// Create - POST /users/:userId/foods
router.post('/', isSignedIn, async (req, res) => {
  try {
    console.log('POST /users/:userId/foods');
    console.log('req.params.userId:', req.params.userId);
    console.log('req.body:', req.body);

    const user = await User.findById(req.params.userId);
    if (!user) {
      console.error('User not found');
      return res.redirect('/');
    }
    if (!user.pantry) {
      user.pantry = []; // Initialize pantry if it doesn't exist
    }
    user.pantry.push({ name: req.body.name }); // Ensure only necessary fields are added
    await user.save();
    res.redirect(`/users/${req.params.userId}/foods`);
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

// Edit - GET /users/:userId/foods/:itemId/edit
router.get('/:itemId/edit', isSignedIn, async (req, res) => {
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
router.put('/:itemId', isSignedIn, async (req, res) => {
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
router.delete('/:itemId', isSignedIn, async (req, res) => {
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