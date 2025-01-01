const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const isSignedIn = require('../middleware/is-signed-in.js');

// New - GET /users/:userId/foods/new
router.get('/users/:userId/foods/new', isSignedIn, async (req, res) => {
  try {
    console.log('User ID:', res.locals.user._id);
    res.render('foods/new.ejs', { userId: res.locals.user._id });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

// Create - POST /users/:userId/foods
router.post('/users/:userId/foods', isSignedIn, async (req, res) => {
  try {
    console.log('POST /users/:userId/foods');
    console.log('req.params.userId:', req.params.userId);
    console.log('req.body:', req.body);

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

module.exports = router;