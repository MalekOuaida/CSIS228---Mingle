const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { validateRegistration, validateUpdate } = require('../validators/userValidators');

router.post('/signup', validateRegistration, UserController.insertUserController);
router.put('/profile/:userId', validateUpdate, UserController.updateUserController);
router.get('/profile/:userId', UserController.getUserProfileController);
router.delete('/:userId', UserController.deleteUserController);
//router.get('/matches/:userId', UserController.displayUsersForMatchesController);
module.exports = router;
 