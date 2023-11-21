const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { validateRegistration, validateUpdate } = require('../validators/userValidators');

router.post('/register', validateRegistration, UserController.insertUserController);
router.put('/profile/:userId', validateUpdate, UserController.updateUserController);
router.get('/profile/:userId', UserController.getUserProfileController);
router.delete('/:userId', UserController.deleteUserController);

module.exports = router;
