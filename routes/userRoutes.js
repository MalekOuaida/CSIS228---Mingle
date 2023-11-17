const express = require('express');
const router = express.Router();

// Import the user controller
const UserController = require('../controllers/userController');

// User registration
router.post('/register', UserController.register);

// User login
router.post('/login', UserController.login);

// Retrieve a user's profile
router.get('/profile/:userId', UserController.getProfile);

// Update a user's profile
router.put('/profile/:userId', UserController.updateProfile);

// Delete a user
router.delete('/:userId', UserController.deleteUser);

// Retrieve all users (optional)
router.get('/', UserController.getAllUsers);

// Export the router
module.exports = router;
