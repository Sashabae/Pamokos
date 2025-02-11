const app = require("./app");
require("dotenv").config(); // Load environment variables from .env file to process.env
const { sql, testConnection } = require("./dbConnection");

const port = process.env.PORT || 3000;

(async () => {
  try {
    // Test the database connection
    await testConnection();

    // Start the server
    app.listen(port, () => {
      console.log(`🚀 App running on port ${port}...`);
    });
  } catch (error) {
    process.exit(1);
  }

  // This code listens for the SIGINT signal
  process.on("SIGINT", async () => {
    console.log("Closing database connections...");
    await sql.end(); // Closes all connections in the pool
    process.exit(0);
  });
})();
