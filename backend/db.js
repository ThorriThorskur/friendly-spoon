import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { 
    require: true, 
    rejectUnauthorized: false 
  }
});

pool.on('connect', () => {
  console.log('Connected to the PostgreSQL database');
});

export const query = (text, params) => pool.query(text, params);
export { pool };