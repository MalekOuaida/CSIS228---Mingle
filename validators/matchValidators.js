const { body } = require('express-validator');

const validateMatchCheck = [
    body('userId1')
        .isInt()
        .withMessage('User ID 1 must be an integer'),

    body('userId2')
        .isInt()
        .withMessage('User ID 2 must be an integer')
];

module.exports = {
    validateMatchCheck
};
