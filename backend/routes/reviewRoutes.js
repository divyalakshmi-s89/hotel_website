const express = require('express');
const router = express.Router();
const { getApprovedReviews, submitReview } = require('../controllers/reviewController');

router.get('/', getApprovedReviews);
router.post('/', submitReview);

module.exports = router;
