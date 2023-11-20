const { body, param } = require('express-validator');

const validateLikeAdd = [
    body('likerUserId')
        .isInt()
        .withMessage('Liker User ID must be an integer'),

    body('likedUserId')
        .isInt()
        .withMessage('Liked User ID must be an integer')
];

const validateLikeDelete = [
    param('likeId')
        .isInt()
        .withMessage('Like ID must be an integer')
];

module.exports = {
    validateLikeAdd,
    validateLikeDelete
};
