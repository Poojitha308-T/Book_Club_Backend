const pool = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw { status: 400, message: "All fields required" };
  }

  const existing = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (existing.rows.length > 0) {
    throw { status: 400, message: "User already exists" };
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING id,name,email",
    [name, email, hashed]
  );

  return {
    success: true,
    message: "User registered",
    data: user.rows[0],
  };
};

exports.login = async ({ email, password }) => {
  if (!email || !password) {
    throw { status: 400, message: "Email & password required" };
  }

  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (result.rows.length === 0) {
    throw { status: 400, message: "Invalid credentials" };
  }

  const user = result.rows[0];

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw { status: 400, message: "Invalid credentials" };
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    success: true,
    message: "Login successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};

exports.logout = async (token) => {
  if (!token) throw { status: 400, message: "Token required" };

  const result = await pool.query(
    `INSERT INTO token_blacklist (token, blacklisted_at)
     VALUES ($1, NOW())
     RETURNING *`,
    [token]
  );

  return result.rows[0];
};

// Check if token is blacklisted
exports.isBlacklisted = async (token) => {
  const result = await pool.query(
    `SELECT id FROM token_blacklist WHERE token = $1`,
    [token]
  );
  return result.rows.length > 0;
};