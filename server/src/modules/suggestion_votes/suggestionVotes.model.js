
const pool = require("../../config/db");

// Add a vote
const addVoteDB = async (userId, suggestionId) => {
  const result = await pool.query(
    `INSERT INTO suggestion_votes (user_id, suggestion_id)
     VALUES ($1, $2) RETURNING *`,
    [userId, suggestionId]
  );
  return result.rows[0];
};

// Check if user already voted
const hasVotedDB = async (userId, suggestionId) => {
  const result = await pool.query(
    `SELECT * FROM suggestion_votes
     WHERE user_id = $1 AND suggestion_id = $2`,
    [userId, suggestionId]
  );
  return result.rows.length > 0;
};

module.exports = {
  addVoteDB,
  hasVotedDB,
};