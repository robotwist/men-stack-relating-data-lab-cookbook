const express = require('express');
const router = express.Router();
const isSignedIn = require('../middleware/is-signed-in');

// New - GET /users/:userId/foods/new
router.get('/users/:userId/foods/new', isSignedIn, async (req, res) => {
  try {
    console.log('User ID:', req.params.userId);
    res.render('foods/new.ejs', { userId: req.params.userId });
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
    // Add your logic to handle the POST request here
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

// filepath: /home/robwistrand/code/ga/labs/men-stack-relating-data-lab-cookbook/controllers/addFood.js
module.exports = router;