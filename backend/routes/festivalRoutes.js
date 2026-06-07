const express = require('express');
const router = express.Router();
const { submitFestivalOrder } = require('../controllers/festivalController');

router.post('/', submitFestivalOrder);

module.exports = router;
