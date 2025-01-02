const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: String,
  // Add other fields as needed
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  pantry: [foodSchema], // Ensure this field is correctly defined
});

const User = mongoose.model('User', userSchema);

module.exports = User;