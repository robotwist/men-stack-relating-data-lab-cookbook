const express = require('express');
const router = express.Router();

// VIP Lounge - GET /vip-lounge
router.get('/vip-lounge', (req, res) => {
  res.render('vip-lounge.ejs');
});

module.exports = router;