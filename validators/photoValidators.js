const { body } = require('express-validator');

const validatePhotoAdd = [
    body('userId')
        .isInt()
        .withMessage('User ID must be an integer'),

    body('photoUrl')
        .trim()
        .notEmpty()
        .withMessage('Photo URL cannot be empty')
        .isURL()
        .withMessage('Photo URL must be a valid URL')
];

const validatePhotoUpdate = [
    body('photoUrl')
        .trim()
        .notEmpty()
        .withMessage('Updated photo URL cannot be empty')
        .isURL()
        .withMessage('Photo URL must be a valid URL')
];

module.exports = {
    validatePhotoAdd,
    validatePhotoUpdate
};
