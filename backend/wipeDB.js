require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { require: true, rejectUnauthorized: false }
});

(async () => {
  try {
    console.log("Wiping all data from the database tables...");
    const queryText = "TRUNCATE TABLE wishlists, users, accounts RESTART IDENTITY CASCADE;";
    await pool.query(queryText);

    console.log("Database wiped successfully.");
  } catch (error) {
    console.error("Error wiping database:", error);
  } finally {
    await pool.end();
    console.log("Database connection closed.");
  }
})();