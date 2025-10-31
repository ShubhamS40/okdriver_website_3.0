const express = require('express');
const router = express.Router();
const paymentController = require('../../controller/user/paymentController');
const { authMiddleware } = require('../../authMiddleware');

// Create payment order
router.post('/order', authMiddleware, paymentController.createPaymentOrder);

// Payment callbacks
router.post('/success', paymentController.handlePaymentSuccess);
router.post('/failure', paymentController.handlePaymentFailure);

module.exports = router;