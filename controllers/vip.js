const express = require('express');
const router = express.Router();
const isSignedIn = require('../middleware/is-signed-in.js');

// VIP Lounge - GET /vip-lounge
router.get('/vip-lounge', isSignedIn, (req, res) => {
  res.render('vip-lounge.ejs');
});

module.exports = router;
