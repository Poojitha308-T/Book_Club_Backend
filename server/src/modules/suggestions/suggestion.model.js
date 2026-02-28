
const pool = require("../../config/db");

// Create a suggestion
const createSuggestionDB = async (title, author, description, userId) => {
  const result = await pool.query(
    `INSERT INTO book_suggestions (title, author, description, suggested_by)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [title, author, description, userId]
  );
  return result.rows[0];
};

// Get suggestions sorted by votes
const getSuggestionsDB = async () => {
  const result = await pool.query(
    `SELECT s.*, u.name AS suggested_by_name
     FROM book_suggestions s
     JOIN users u ON s.suggested_by = u.id
     WHERE s.status = 'open'
     ORDER BY s.votes_count DESC`
  );
  return result.rows;
};

// Increment vote count
const incrementVoteCountDB = async (suggestionId) => {
  await pool.query(
    `UPDATE book_suggestions
     SET votes_count = votes_count + 1
     WHERE id = $1`,
    [suggestionId]
  );
};

// Approve suggestion
const approveSuggestionDB = async (suggestionId) => {
  await pool.query(
    `UPDATE book_suggestions
     SET status = 'approved'
     WHERE id = $1`,
    [suggestionId]
  );
};

module.exports = {
  createSuggestionDB,
  getSuggestionsDB,
  incrementVoteCountDB,
  approveSuggestionDB,
};