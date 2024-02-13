
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/payment', paymentController.createPayment);
// routes/bill.js






module.exports = router;
