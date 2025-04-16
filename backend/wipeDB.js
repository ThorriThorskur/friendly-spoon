require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { require: true, rejectUnauthorized: false }
});

(async () => {
  try {
    console.log("Dropping the entire public schema (all tables, data, etc.) from the database...");
    // Drop the schema and everything in it, then recreate it
    await pool.query('DROP SCHEMA IF EXISTS public CASCADE;');
    await pool.query('CREATE SCHEMA public;');
    
    console.log("All tables, data, and the public schema have been removed. The database is now empty.");
  } catch (error) {
    console.error("Error dropping schema:", error);
  } finally {
    await pool.end();
    console.log("Database connection closed.");
  }
})();
