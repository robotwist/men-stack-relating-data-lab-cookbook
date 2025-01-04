const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.js');

// Sign Up - GET /auth/sign-up
router.get('/sign-up', (req, res) => {
  res.render('auth/sign-up.ejs');
});

// Sign Up - POST /auth/sign-up
router.post('/sign-up', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword
    });
    await user.save();
    res.redirect('/auth/sign-in');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Sign In - GET /auth/sign-in
router.get('/sign-in', (req, res) => {
  res.render('auth/sign-in.ejs');
});

// Sign In - POST /auth/sign-in
router.post('/sign-in', async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (!userInDatabase) {
      return res.send('Login failed. Please try again.');
    }

    const validPassword = bcrypt.compareSync(req.body.password, userInDatabase.password);
    if (!validPassword) {
      return res.send('Login failed. Please try again.');
    }

    req.session.user = userInDatabase;
    res.redirect(`/users/${userInDatabase._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Sign Out - GET /auth/sign-out
router.get('/sign-out', (req, res) => {
  req.session.destroy();
  res.redirect('/auth/sign-in');
});

module.exports = router;