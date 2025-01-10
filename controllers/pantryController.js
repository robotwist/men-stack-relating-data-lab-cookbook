const Item = require('../models/item');

// Display list of all pantry items
exports.getPantry = async (req, res) => {
  try {
    const items = await Item.find();
    res.render('pantry/index.ejs', { title: 'Pantry', items });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Add a new pantry item
exports.addPantryItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.redirect('/pantry');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Update an existing pantry item
exports.updatePantryItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    await Item.findByIdAndUpdate(itemId, req.body);
    res.redirect('/pantry');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Delete a pantry item
exports.deletePantryItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    await Item.findByIdAndDelete(itemId);
    res.redirect('/pantry');
  } catch (error) {
    res.status(500).send(error.message);
  }
};