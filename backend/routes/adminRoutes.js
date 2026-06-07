const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const {
  login, getAllOrders, updateOrderStatus, getDailySales,
  getPendingReviews, approveReview, getFestivalOrders, updateFestivalStatus
} = require('../controllers/adminController');

router.post('/login', login);
router.get('/orders', adminAuth, getAllOrders);
router.patch('/orders/:id/status', adminAuth, updateOrderStatus);
router.get('/sales/daily', adminAuth, getDailySales);
router.get('/reviews', adminAuth, getPendingReviews);
router.patch('/reviews/:id', adminAuth, approveReview);
router.get('/festival-orders', adminAuth, getFestivalOrders);
router.patch('/festival-orders/:id', adminAuth, updateFestivalStatus);

module.exports = router;
