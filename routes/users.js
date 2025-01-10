const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Add a new food to the user's pantry
router.post('/:userId/foods', usersController.addFoodToPantry);

module.exports = router;
