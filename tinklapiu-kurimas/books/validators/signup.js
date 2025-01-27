const { body } = require('express-validator');
const { getUserByUsername } = require('../models/userModel');

const validateNewUser = [
  // check if body is not empty
  body().notEmpty().withMessage('Body cannot be empty'),

  body('username')
    .notEmpty()
    .withMessage('Username is required')
    // .isLength({ min: 3 })
    // .withMessage('Username must be at least 3 characters long')
    .custom(async (value, { req }) => {
      const existingUser = await getUserByUsername(value);

      if (existingUser) {
        throw new Error('Username already exists');
      }
      return true;
    }),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isStrongPassword()
    .withMessage(
      'Password must be at least 8 characters long, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
    )
    .custom((value, { req }) => {
      if (value !== req.body.passwordconfirm) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
];

module.exports = validateNewUser;
