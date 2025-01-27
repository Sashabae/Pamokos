const { sql } = require('../dbConnection');

exports.createUser = async (newUser) => {
  const [user] = await sql`
    INSERT INTO auth ${sql(newUser, 'username', 'password', 'role')}
    RETURNING *
    `;
  return user;
};

exports.getUserByUsername = async (username) => {
  const [user] = await sql`
    SELECT auth.* 
    FROM auth
    WHERE auth.username = ${username}
  `;
  return user;
};

exports.getUserById = async (id) => {
  const [user] = await sql`
    SELECT auth.* 
    FROM auth
    WHERE auth.id = ${id}
  `;
  return user;
};
