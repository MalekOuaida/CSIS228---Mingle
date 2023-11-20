const { body } = require('express-validator');

const validateInterestAdd = [
    body('userId')
        .isInt()
        .withMessage('User ID must be an integer'),

    body('interest')
        .trim()
        .notEmpty()
        .withMessage('Interest cannot be empty')
        .isLength({ max: 100 })
        .withMessage('Interest must not exceed 100 characters')
];

const validateInterestUpdate = [
    body('interest')
        .trim()
        .notEmpty()
        .withMessage('Updated interest cannot be empty')
        .isLength({ max: 100 })
        .withMessage('Interest must not exceed 100 characters')
];

module.exports = {
    validateInterestAdd,
    validateInterestUpdate
};
