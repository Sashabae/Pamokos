const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getFilteredBooks,
  getBooksByAuthorId,
} = require('../models/bookModel');
const AppError = require('../utils/appError');

// GET BOOKS with pagination and validation
exports.getAllBooks = async (req, res) => {
  try {
    let { page, limit } = req.query;

    // Default values if not provided
    page = parseInt(page); // page
    limit = parseInt(limit); // items per page

    // Calculate offset, kiek books praleist iki kito puslapio
    const offset = (page - 1) * limit;

    // Validate inputs (optional but recommended)
    if (page < 1 || limit < 1) {
      return res.status(400).json({ error: 'Invalid page or limit value' });
    }

    //get paginated books
    const { books, totalCount } = await getAllBooks(limit, offset);

    if (!books.length === 0) {
      throw new AppError('No books found', 404);
    }

    // response format is JSend
    res.status(200).json({
      //statusai gali būti success, fail arba error
      status: 'success',
      requestedAt: req.requestTime,
      data: books,
      meta: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET BOOK BY ID
exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await getBookById(id);

    if (!book) {
      res.status(404).json({
        status: 'fail',
        message: 'Invalid id, book not found',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: book,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// POST
exports.createBook = async (req, res) => {
  try {
    const newBook = req.body;

    if (!newBook || !newBook.title || !newBook.isbn || !newBook.authorId) {
      res.status(400).json({
        status: 'fail',
        message:
          'Missing book information, or its required fields: title, isbn, or authorId',
      });
      return;
    }

    // Create new book
    const createdBook = await createBook(newBook);

    res.status(201).json({
      status: 'success',
      data: createdBook,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// PATCH
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = req.body;

    if (!updatedBook) {
      res.status(400).json({
        status: 'fail',
        message: 'Missing book information',
      });
      return;
    }

    const updated = await updateBook(id, updatedBook);

    if (!updated) {
      res.status(404).json({
        status: 'fail',
        message: 'Invalid id, book not found and not updated',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: updated,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// DELETE
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await deleteBook(id);

    if (!deleted) {
      res.status(404).json({
        status: 'fail',
        message: 'Invalid id, book not found and not deleted',
      });
      return;
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// GET FILTERED BOOKS
exports.getFilteredBooks = async (req, res) => {
  try {
    const { title, authorId } = req.query;

    if (!title && !authorId) {
      const allBooks = await getAllBooks();
      res.status(200).json({
        status: 'success',
        data: allBooks,
      });
      return;
    }

    if (authorId) {
      const filteredBooks = await getBooksByAuthorId(authorId);
      if (filteredBooks.length === 0) {
        return res.status(404).json({
          status: 'error',
          message: 'No books found by this author',
        });
      }
      res.status(200).json({
        status: 'success',
        data: filteredBooks,
      });
      return;
    }

    const filteredBooks = await getFilteredBooks(title);

    if (filteredBooks.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No books found with that title',
      });
    }
    res.status(200).json({
      status: 'success',
      data: filteredBooks,
    });
  } catch (error) {
    next(error);
  }
};
