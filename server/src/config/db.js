require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Supabase
  },
});

// Test connection once when server starts
pool.connect()
  .then(client => {
    console.log("Database connected successfully");
    client.release();
  })
  .catch(err => {
    console.error("Database connection failed");
    console.error(err.message);
  });

module.exports = pool;