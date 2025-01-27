const {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require('../models/authorModel');
const AppError = require('../utils/appError');

// GET AUTHORS with pagination and validation
exports.getAllAuthors = async (req, res) => {
  try {
    let { page, limit } = req.query;

    // Default values if not provided
    page = parseInt(page); // page
    limit = parseInt(limit); // items per page

    // Calculate offset
    const offset = (page - 1) * limit;

    // Validate inputs (optional but recommended)
    if (page < 1 || limit < 1) {
      return res.status(400).json({ error: 'Invalid page or limit value' });
    }

    //get paginated authors
    const { authors, totalCount } = await getAllAuthors(limit, offset);

    if (!authors.length === 0) {
      throw new AppError('No authors found', 404);
    }

    // response format is JSend
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: authors,
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

// GET AUTHOR BY ID
exports.getAuthorById = async (req, res) => {
  try {
    const { id } = req.params;

    const authors = await getAuthorById(id);

    if (!authors) {
      res.status(404).json({
        status: 'fail',
        message: 'Invalid id, authors not found',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: authors,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// POST
exports.createAuthor = async (req, res) => {
  try {
    const newAuthor = req.body;

    if (!newAuthor || !newAuthor.name || !newAuthor.birthDate) {
      res.status(400).json({
        status: 'fail',
        message:
          'Missing author information, or its required fields: name or birthdate',
      });
      return;
    }

    // Create new authors
    const createdAuthor = await createAuthor(newAuthor);

    res.status(201).json({
      status: 'success',
      data: createdAuthor,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// PATCH
exports.updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAuthor = req.body;

    if (!updatedAuthor) {
      res.status(400).json({
        status: 'fail',
        message: 'Missing author information',
      });
      return;
    }

    const updated = await updateAuthor(id, updatedAuthor);

    if (!updated) {
      res.status(404).json({
        status: 'fail',
        message: 'Invalid id, author not found and not updated',
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
exports.deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await deleteAuthor(id);

    if (!deleted) {
      res.status(404).json({
        status: 'fail',
        message: 'Invalid id, author not found and not deleted',
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
