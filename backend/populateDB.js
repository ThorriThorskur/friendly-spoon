// initDb.js

import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config();
const { Pool } = pkg;

// Create a connection pool using your DATABASE_URL, enabling SSL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { 
    require: true,
    rejectUnauthorized: false
  }
});

const createUsersTableQuery = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    darkmode BOOLEAN DEFAULT FALSE
);
`;

const createWishlistsTableQuery = `
CREATE TABLE IF NOT EXISTS wishlists (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    card_id UUID NOT NULL,
    oracle_id UUID,
    name TEXT NOT NULL,
    image_uris JSONB,
    mana_cost VARCHAR(50),
    cmc NUMERIC,
    type_line TEXT,
    oracle_text TEXT,
    power TEXT,
    toughness TEXT,
    colors TEXT[],
    color_identity TEXT[],
    keywords TEXT[],
    legalities JSONB,
    set_code VARCHAR(20),
    set_name VARCHAR(100),
    set_type VARCHAR(50),
    rarity VARCHAR(20),
    full_art BOOLEAN,
    prices JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_user
      FOREIGN KEY(user_id) REFERENCES users(id)
      ON DELETE CASCADE
);
`;

(async () => {
  try {
    await pool.query(createUsersTableQuery);
    console.log('Users table created successfully.');
    
    await pool.query(createWishlistsTableQuery);
    console.log('Wishlists table created successfully.');
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    await pool.end();
    console.log('Database connection closed.');
  }
})();
