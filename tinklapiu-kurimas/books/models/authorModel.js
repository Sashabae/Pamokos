const { sql } = require('../dbConnection');

// GET ALL AUTHORS
exports.getAllAuthors = async (limit, offset) => {
  const authors = await sql`
  SELECT authors.*,
    (
    SELECT json_agg(books)
    FROM books
    WHERE books."authorId" = authors.id
    ) AS books
  FROM authors
  ORDER BY authors.id ASC
     ${
       !isNaN(limit) && !isNaN(offset)
         ? sql`LIMIT ${limit} OFFSET ${offset}`
         : sql``
     }  
    `;
  const total = await sql`
      SELECT COUNT(*)::int AS count 
      FROM authors
    `;

  return { authors, totalCount: total[0].count };
};

// GET AUTHOR BY ID
exports.getAuthorById = async (id) => {
  const authors = await sql`
  SELECT authors.*,
    (
    SELECT json_agg(books)
    FROM books
    WHERE books."authorId" = authors.id
    ) AS books
  FROM authors
  WHERE authors.id = ${id}
  `;
  return authors[0];
};

// CREATE AUTHOR
exports.createAuthor = async (newAuthor) => {
  // Validation
  if (newAuthor.name.length < 2) {
    throw new Error('Name must be at least 2 characters long');
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(newAuthor.birthDate)) {
    throw new Error('Birth date must be in YYYY-MM-DD format');
  }

  if (newAuthor.biography && newAuthor.biography.length > 150) {
    throw new Error('Biography cannot be longer than 150 characters');
  }

  const authors = await sql`
    INSERT INTO authors ${sql(newAuthor, 'name', 'birthDate', 'biography')}
       RETURNING *;
    `;
  return authors[0];
};

// UPDATE AUTHOR (PATCH)
exports.updateAuthor = async (id, updatedAuthor) => {
  // Validation
  if (updatedAuthor.name && updatedAuthor.name.length < 2) {
    throw new Error('Name must be at least 2 characters long');
  }

  if (
    updatedAuthor.birthDate &&
    !/^\d{4}-\d{2}-\d{2}$/.test(updatedAuthor.birthDate)
  ) {
    throw new Error('Birth date must be in YYYY-MM-DD format');
  }

  if (updatedAuthor.biography && updatedAuthor.biography.length > 150) {
    throw new Error('Biography cannot be longer than 150 characters');
  }

  const authors = await sql`
  update authors set ${sql(updatedAuthor)}
  where id = ${id}
  returning *;
`;
  return authors[0];
};

// DELETE AUTHOR
exports.deleteAuthor = async (id) => {
  const authors = await sql`
  delete from authors where id = ${id}
  returning *;
`;
  return authors[0];
};
