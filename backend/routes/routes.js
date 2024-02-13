// routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const rentalController = require('../controllers/rentalController');
const contactController = require('../controllers/contactController');
const { signup, login, logout } = require('../controllers/authController');
// const { createCheckoutSession } = require('../controllers/subscriptionController');
const salesController = require('../controllers/salesController');  

// admin
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUserById);
router.post('/admin/signup', userController.createUser);
router.delete('/users/:id', userController.deleteUser);

// rental routes
router.post('/lands/:id/rental', rentalController.submitRentalForm);
router.get('/admin/rental-details', rentalController.getAdminRentalDetails);

// sales routes
router.post('/lands/:id/sales', salesController.submitSalesForm); 
router.get('/admin/sales-details', salesController.getAdminSalesDetails); 

// subscription


// contact
router.post('/send-email', contactController.sendEmail);

// user
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
