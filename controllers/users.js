const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Index - GET /users
router.get('/', async (req, res) => {
  try {
    const users = await usersController.getAllUsers();
    res.render('users/index.ejs', { users });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

// Show - GET /users/:userId
router.get('/:userId', async (req, res) => {
  try {
    const user = await usersController.getUserDetails(req.params.userId);
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

// Add a new food to the user's pantry - POST /users/:userId/foods
router.post('/:userId/foods', async (req, res) => {
  try {
    await usersController.addFoodToPantry(req.params.userId, req.body);
    res.redirect(`/users/${req.params.userId}/foods`);
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

// Update user details - PUT /users/:userId
router.put('/:userId', async (req, res) => {
  try {
    await usersController.updateUserDetails(req.params.userId, req.body);
    res.redirect(`/users/${req.params.userId}`);
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

// Delete user - DELETE /users/:userId
router.delete('/:userId', async (req, res) => {
  try {
    await usersController.deleteUser(req.params.userId);
    res.redirect('/users');
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

module.exports = router;