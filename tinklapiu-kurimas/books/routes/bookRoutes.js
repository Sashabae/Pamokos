const express = require('express');

const bookControler = require('../controlers/bookControler');
const { protect, allowAccessTo } = require('../controlers/authControler');

const paginationValidator = require('../validators/pagination');
const validate = require('../validators/validate');

const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  getFilteredBooks,
  deleteBook,
} = bookControler;

const router = express.Router();

// routes
router
  .route('/')
  .get(paginationValidator, validate, getAllBooks)
  .post(protect, allowAccessTo('admin'), validate, createBook);

// To check books filter by title and author id, uncomment this router, and comment above the .get for getAllBooks
// router.route('/').get(getFilteredBooks);

router
  .route('/:id')
  .get(getBookById)
  .patch(protect, allowAccessTo('admin'), updateBook)
  .delete(protect, allowAccessTo('admin'), deleteBook);

module.exports = router;
