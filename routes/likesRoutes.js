const express = require('express');
const router = express.Router();
const LikesController = require('../controllers/likesController');
const { validateLikeAdd, validateLikeDelete } = require('../validators/likeValidators');

router.post('/', validateLikeAdd, LikesController.addLikeController);
router.delete('/:likeId', validateLikeDelete, LikesController.deleteLikeController);
router.post('/check-match', LikesController.checkMatchController);

module.exports = router;
