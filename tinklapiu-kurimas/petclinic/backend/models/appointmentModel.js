const { sql } = require("../dbConnection");

// GET ALL
exports.getAllAppointments = async (
  user,
  search = "",
  sortBy = "petname",
  sortOrder = "desc"
) => {
  const validSortColumns = ["petname", "date", "ownername"];
  const validSortOrders = ["asc", "desc"];

  if (!validSortColumns.includes(sortBy)) {
    sortBy = "petname"; // Default
  }
  if (!validSortOrders.includes(sortOrder)) {
    sortOrder = "asc"; // Default
  }

  let query = `SELECT * FROM appointments`;
  const whereClauses = [];
  const params = [];

  // Search condition (parameterized)
  if (search) {
    whereClauses.push(
      `(petname ILIKE '%' || $${
        params.length + 1
      } || '%' OR ownername ILIKE '%' || $${
        params.length + 1
      } || '%' OR notes ILIKE '%' || $${params.length + 1} || '%')`
    );
    params.push(search);
  }

  // Filter by userId if not admin
  if (user.role === "user") {
    whereClauses.push(`"userId" = $${params.length + 1}`);
    params.push(user.id);
  }

  if (whereClauses.length > 0) {
    query += " WHERE " + whereClauses.join(" AND ");
  }

  // Using unsafe (safe due to validation)
  query += ` ORDER BY "${sortBy}" ${sortOrder.toUpperCase()}`;

  try {
    const appointments = await sql.unsafe(query, params);
    return { appointments };
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching appointments");
  }
};

// GET BY ID
exports.getAppointmentById = async (id) => {
  const appointments = await sql`
  SELECT appointments.*
  FROM appointments
  WHERE appointments.id = ${id}
  `;
  return appointments[0];
};

// CREATE
exports.createAppointment = async (newAppointment) => {
  const appointments = await sql`
    INSERT INTO appointments ${sql(
      newAppointment,
      "petname",
      "ownername",
      "date",
      "time",
      "notes",
      "userId"
    )}
     RETURNING *;
    `;
  return appointments[0];
};

// UPDATE (PATCH)
exports.updateAppointment = async (id, updatedAppointment) => {
  const appointments = await sql`
  update appointments set ${sql(updatedAppointment)}
  where id = ${id}
  returning *;
`;
  return appointments[0];
};

// DELETE
exports.deleteAppointment = async (id) => {
  const appointments = await sql`
  delete from appointments where id = ${id}
  returning *;
`;
  return appointments[0];
};
