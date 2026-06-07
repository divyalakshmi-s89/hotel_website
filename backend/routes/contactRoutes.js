const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { name, mobile, message } = req.body;
  if (!name || !mobile || !message) {
    return res.status(400).json({ success: false, message: 'All fields required' });
  }
  // Optionally send WhatsApp here too
  res.json({ success: true, message: 'Message received! We will contact you soon.' });
});

module.exports = router;
