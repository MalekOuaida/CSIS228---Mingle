const express = require('express');
const router = express.Router();
const InterestController = require('../controllers/interestController');
const { validateInterestAdd, validateInterestUpdate } = require('../validators/interestValidators');

// Route to add a new interest
router.post('/', validateInterestAdd, InterestController.addInterestController);

// Route to update an existing interest
router.put('/:interestId', validateInterestUpdate, InterestController.updateInterestController);

// Route to get a specific interest
//router.get('/:interestId', InterestController.getInterest);

// Route to delete an interest
router.delete('/:interestId', InterestController.deleteInterestController);

// Route to get all interests
//router.get('/', InterestController.getAllInterests);

module.exports = router;
