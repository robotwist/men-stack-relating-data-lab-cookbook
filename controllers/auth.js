const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.js');

// Sign In - GET /auth/sign-in
router.get('/sign-in', (req, res) => {
  res.render('auth/sign-in.ejs');
});

// Sign In - POST /auth/sign-in
router.post('/sign-in', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (isMatch) {
        req.session.userId = user._id;
        console.log('User signed in:', user._id);
        console.log('Session userId after setting:', req.session.userId);
        res.redirect('/');
      } else {
        console.log('Password does not match');
        res.redirect('/auth/sign-in');
      }
    } else {
      console.log('User not found');
      res.redirect('/auth/sign-in');
    }
  } catch (error) {
    console.error(error);
    res.redirect('/auth/sign-in');
  }
});

// Sign Out - GET /auth/sign-out
router.get('/sign-out', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/');
  });
});

module.exports = router;