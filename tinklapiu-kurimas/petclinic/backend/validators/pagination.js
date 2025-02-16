const { query } = require("express-validator");

const paginationValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 }) // must be a positive integer
    .withMessage("Page must be a positive integer") // error message
    .toInt(), // convert to integer

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 }) // must be an integer between 1 and 100
    .withMessage("Limit must be a positive integer") // error message
    .toInt() // convert to integer
];

module.exports = paginationValidator;
