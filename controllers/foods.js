const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// Index - GET /users/:userId/foods
router.get('/users/:userId/foods', async (req, res) => {
  const user = await User.findById(req.params.userId);
  res.json(user.pantry);
});

// Index - GET /users/:userId/foods
router.get('/', (req, res) => {
  res.render('foods/index.ejs');
});

// New - GET /users/:userId/foods/new
router.get('/users/:userId/foods/new', (req, res) => {
  res.send('Form to create a new food item');
});

// New - GET /users/:userId/foods/new
router.get('/new', (req, res) => {
  res.render('foods/new.ejs', { userId: req.params.userId });
});

// Create - POST /users/:userId/foods
router.post('/users/:userId/foods', async (req, res) => {
  const user = await User.findById(req.params.userId);
  user.pantry.push(req.body);
  await user.save();
  res.json(user.pantry);
});

// Show - GET /users/:userId/foods/:itemId
router.get('/users/:userId/foods/:itemId', async (req, res) => {
  const user = await User.findById(req.params.userId);
  const foodItem = user.pantry.id(req.params.itemId);
  res.json(foodItem);
});

// Edit - GET /users/:userId/foods/:itemId/edit
router.get('/users/:userId/foods/:itemId/edit', async (req, res) => {
  const user = await User.findById(req.params.userId);
  const foodItem = user.pantry.id(req.params.itemId);
  res.send(`Form to edit food item: ${foodItem.name}`);
});

// Update - PUT /users/:userId/foods/:itemId
router.put('/users/:userId/foods/:itemId', async (req, res) => {
  const user = await User.findById(req.params.userId);
  const foodItem = user.pantry.id(req.params.itemId);
  foodItem.set(req.body);
  await user.save();
  res.json(foodItem);
});

// Delete - DELETE /users/:userId/foods/:itemId
router.delete('/users/:userId/foods/:itemId', async (req, res) => {
  const user = await User.findById(req.params.userId);
  user.pantry.id(req.params.itemId).remove();
  await user.save();
  res.sendStatus(204);
});

module.exports = router;