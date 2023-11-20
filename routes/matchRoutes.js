const express = require('express');
const router = express.Router();
const MatchController = require('../controllers/matchController');
const { validateMatchCheck } = require('../validators/matchValidators');

// Route to check for a match between two users
router.post('/check', validateMatchCheck, MatchController.checkMatchController);

// Route to get all matches for a specific user
router.get('/user/:userId', MatchController.getMatchesForUserController);

module.exports = router;
