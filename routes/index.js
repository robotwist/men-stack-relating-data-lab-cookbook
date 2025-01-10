const express = require('express');
const router = express.Router();
const pantryController = require('../controllers/pantryController');

// Add a new route for the pantry page
router.get('/pantry', pantryController.pantry);

// Add other routes for pantry management
router.post('/pantry', pantryController.addPantryItem);
router.put('/pantry/:itemId', pantryController.updatePantryItem);
router.delete('/pantry/:itemId', pantryController.deletePantryItem);

module.exports = router;
