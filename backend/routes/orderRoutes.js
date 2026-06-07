const express = require('express');
const router = express.Router();
const { placeOrder, getOrder, getDeliveryCharge } = require('../controllers/orderController');

router.post('/place', placeOrder);
router.get('/:id', getOrder);
router.get('/delivery/charge', getDeliveryCharge);

module.exports = router;
