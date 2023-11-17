const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { validateRegistration, validateLogin, validateUpdate } = require('../validators/userValidators');

router.post('/register', validateRegistration, UserController.register);
router.post('/login', validateLogin, UserController.login);
router.put('/profile/:userId', validateUpdate, UserController.updateProfile);
router.get('/profile/:userId', UserController.getProfile);
router.delete('/:userId', UserController.deleteUser);
router.get('/', UserController.getAllUsers);

module.exports = router;
