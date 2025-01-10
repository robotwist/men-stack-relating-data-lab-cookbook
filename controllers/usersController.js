const User = require('../models/user');
const Food = require('../models/food');
const mongoose = require('mongoose');

exports.getAllUsers = async () => {
  return await User.find({});
};

exports.getUserDetails = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid user ID');
  }
  return await User.findById(userId).populate('pantry');
};

/**
 * Adds a food item to the user's pantry.
 *
 * @param {string} userId - The unique identifier of the user.
 * @param {Object} foodData - The food item data to add.
 * @throws Will throw an error if the user ID is invalid or the user is not found.
 */
exports.addFoodToPantry = async (userId, foodData) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid user ID');
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  const newFood = new Food(foodData);
  user.pantry.push(newFood);
  await user.save();
};

exports.updateUserDetails = async (userId, userData) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid user ID');
  }
  await User.findByIdAndUpdate(userId, userData);
};

exports.deleteUser = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid user ID');
  }
  await User.findByIdAndDelete(userId);
};