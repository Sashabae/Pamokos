const { sql } = require('../dbConnection');

// GET ALL BOOKS
exports.getAllBooks = async (limit, offset) => {
  const books = await sql`
  SELECT books.*, authors.*
  FROM books
  JOIN authors ON books."authorId" = authors.id
  ORDER BY books.id ASC
     ${
       !isNaN(limit) && !isNaN(offset)
         ? sql`LIMIT ${limit} OFFSET ${offset}`
         : sql``
     }  
    `;
  const total = await sql`
      SELECT COUNT(*)::int AS count 
      FROM books
    `;

  return { books, totalCount: total[0].count };
};

// GET BOOK BY ID
exports.getBookById = async (id) => {
  const books = await sql`
  SELECT books.*, authors.*
  FROM books
  JOIN authors ON books."authorId" = authors.id
  WHERE books.id = ${id}
  `;
  return books[0];
};

// CREATE BOOK
exports.createBook = async (newBook) => {
  // Validation
  const authorId = newBook.authorId;
  const author = await sql`
    SELECT * FROM authors WHERE id = ${authorId};
    `;
  if (!author[0]) {
    throw new Error(`Author with ID ${authorId} does not exist`);
  }
  if (newBook.title.length < 3) {
    throw new Error(`Book title must be at least 3 symbols long`);
  }
  if (
    newBook.isbn &&
    (newBook.isbn.includes(' ') || !/^[0-9-]+$/.test(newBook.isbn))
  ) {
    throw new Error(`ISBN can only contain numbers and "-"`);
  }

  const books = await sql`
    INSERT INTO books ${sql(newBook, 'title', 'isbn', 'authorId')}
     RETURNING *;
    `;
  return books[0];
};

// UPDATE BOOK (PATCH)
exports.updateBook = async (id, updatedBook) => {
  // Validation
  if (updatedBook.title && updatedBook.title.length < 3) {
    throw new Error(`Book title must be at least 3 symbols long`);
  }
  if (
    updatedBook.isbn &&
    (updatedBook.isbn.includes(' ') || !/^[0-9-]+$/.test(updatedBook.isbn))
  ) {
    throw new Error(`ISBN can only contain numbers and "-"`);
  }

  const books = await sql`
  update books set ${sql(updatedBook)}
  where id = ${id}
  returning *;
`;
  return books[0];
};

// DELETE BOOK
exports.deleteBook = async (id) => {
  const books = await sql`
  delete from books where id = ${id}
  returning *;
`;
  return books[0];
};

// GET FILTERED BOOKS
exports.getFilteredBooks = async (title) => {
  const books = await sql`
  SELECT books.*, authors.*
  FROM books
  JOIN authors ON books."authorId" = authors.id
  WHERE books.title ILIKE '%' || ${title} || '%'
  ORDER BY books.id ASC
  `;
  return books;
};

// GET BOOKS BY AUTHOR ID
exports.getBooksByAuthorId = async (authorId) => {
  const books = await sql`
  SELECT books.*, authors.*
  FROM books
  JOIN authors ON books."authorId" = authors.id
  WHERE books."authorId" = ${authorId}
  ORDER BY books.id ASC
  `;
  return books;
};
