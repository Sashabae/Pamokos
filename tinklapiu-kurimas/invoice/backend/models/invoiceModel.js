const { sql } = require("../dbConnection");

// GET ALL
exports.getAllInvoices = async (limit, offset, status) => {
  let query = sql`
  SELECT invoices.*
  FROM invoices
`;

  let countQuery = sql`
  SELECT COUNT(*)::int AS count 
  FROM invoices
`;

  // Apply status filtering if a status is provided
  if (status) {
    query = sql`${query} WHERE invoices.status = ${status}`;
    countQuery = sql`${countQuery} WHERE invoices.status = ${status}`;
  }

  query = sql`${query} ORDER BY invoices.id ASC`;

  if (!isNaN(limit) && !isNaN(offset)) {
    query = sql`${query} LIMIT ${limit} OFFSET ${offset}`;
  }

  const invoices = await query;
  const total = await countQuery;

  return { invoices, totalCount: total[0].count };
};

// GET BY ID
exports.getInvoiceById = async (id) => {
  const invoices = await sql`
  SELECT invoices.*
  FROM invoices
  WHERE invoices.id = ${id}
  `;
  return invoices[0];
};

// CREATE
exports.createInvoice = async (newInvoice) => {
  const invoices = await sql`
    INSERT INTO invoices ${sql(
      newInvoice,
      "date",
      "fullname",
      "price",
      "status"
    )}
     RETURNING *;
    `;
  return invoices[0];
};

// UPDATE (PATCH)
exports.updateInvoice = async (id, updatedInvoice) => {
  const invoices = await sql`
  update invoices set ${sql(updatedInvoice)}
  where id = ${id}
  returning *;
`;
  return invoices[0];
};

// DELETE
exports.deleteInvoice = async (id) => {
  const invoices = await sql`
  delete from invoices where id = ${id}
  returning *;
`;
  return invoices[0];
};
