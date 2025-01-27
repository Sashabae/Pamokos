const express = require('express');

const authorControler = require('../controlers/authorControler');
const { protect, allowAccessTo } = require('../controlers/authControler');

const paginationValidator = require('../validators/pagination');
const validate = require('../validators/validate');

const {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = authorControler;

const router = express.Router();

// routes
router
  .route('/')
  .get(paginationValidator, validate, getAllAuthors)
  .post(protect, allowAccessTo('admin'), validate, createAuthor);

router
  .route('/:id')
  .get(getAuthorById)
  .patch(protect, allowAccessTo('admin'), updateAuthor)
  .delete(protect, allowAccessTo('admin'), deleteAuthor);

module.exports = router;
