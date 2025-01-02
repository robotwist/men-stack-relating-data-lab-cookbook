const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const isSignedIn = require('../middleware/is-signed-in.js');
// Index - GET /users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.render('users/index.ejs', { users });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

// Show - GET /users/:userId
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('pantry');
    if (!user) {
      console.error('User not found');
      return res.redirect('/users');
    }
    res.render('users/show.ejs', { user });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

module.exports = router;