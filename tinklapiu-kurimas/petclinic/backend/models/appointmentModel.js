const { sql } = require("../dbConnection");

// GET ALL
exports.getAllAppointments = async (user, search = "", sortBy = "petname", sortOrder = "desc") => {
  let query = `SELECT * FROM appointments`;

  // Search functionality
  if (search) {
    query += ` WHERE 
      petname ILIKE '%${search}%' OR
      ownername ILIKE '%${search}%' OR
      notes ILIKE '%${search}%'
    `;
  }

  // If the user is not an admin, filter by userId
  if (user.role === "user") {
    query += ` AND "userId" = ${user.id}`;
  }

  // Validate sortBy and sortOrder
  const validSortColumns = ["petname", "date", "ownername"];
  const validSortOrders = ["asc", "desc"];

  if (!validSortColumns.includes(sortBy)) {
    sortBy = "petname";  // Default
  }
  if (!validSortOrders.includes(sortOrder)) {
    sortOrder = "asc";  // Default
  }

  query += ` ORDER BY ${sortBy} ${sortOrder}`;

  try {
    const appointments = await sql.unsafe(query);
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
