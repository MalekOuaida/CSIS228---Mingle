const { body } = require('express-validator');
const moment = require('moment');

const validateRegistration = [
    body('username')
        .trim()
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters long'),

    body('email')
        .isEmail()
        .withMessage('Email must be a valid email address')
        .matches(/@std\.balamand\.edu\.lb$/)
        .withMessage('Email must be in the format of @std.balamand.edu.lb'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),

    body('firstname')
        .trim()
        .notEmpty()
        .withMessage('First name is required'),

    body('lastname')
        .trim()
        .notEmpty()
        .withMessage('Last name is required'),

    body('gender')
        .isIn(['male', 'female', 'other'])
        .withMessage('Gender must be either MALE, FEMALE, or OTHER'),

    body('birthdate')
        .custom((value) => {
            if (!moment(value, 'YYYY-MM-DD', true).isValid()) {
                throw new Error('Birthdate must be a valid date in YYYY-MM-DD format');
            }
            return true;
        }),
];

const validateUpdate = [
    body('email')
        .optional()
        .isEmail()
        .withMessage('Email must be a valid email address')
        .matches(/@std\.balamand\.edu\.lb$/)
        .withMessage('Email must be in the format of @std.balamand.edu.lb'),

    body('firstname')
        .optional()
        .trim(),

    body('lastname')
        .optional()
        .trim(),

    body('gender')
        .optional()
        .isIn(['MALE', 'FEMALE', 'OTHER']),

    body('birthdate')
        .optional()
        .custom((value) => {
            if (!moment(value, 'YYYY-MM-DD', true).isValid()) {
                throw new Error('Birthdate must be a valid date in YYYY-MM-DD format');
            }
            return true;
        }),
];

module.exports = {
    validateRegistration,
    validateUpdate,
};
