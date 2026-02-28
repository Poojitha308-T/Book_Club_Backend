const pool = require("../../config/db");

// Add or update reading progress
exports.addOrUpdateProgress = async (userId, bookId, progressPercent) => {
  // Check if record exists
  const existing = await pool.query(
    `SELECT id FROM reading_progress WHERE user_id = $1 AND book_id = $2`,
    [userId, bookId]
  );

  if (existing.rows.length > 0) {
    // Update existing record
    const result = await pool.query(
      `UPDATE reading_progress 
       SET progress_percent = $1, updated_at = NOW() 
       WHERE user_id = $2 AND book_id = $3
       RETURNING *`,
      [progressPercent, userId, bookId]
    );
    return result.rows[0];
  } else {
    // Insert new record
    const result = await pool.query(
      `INSERT INTO reading_progress (user_id, book_id, progress_percent, updated_at)
       VALUES ($1, $2, $3, NOW())
       RETURNING *`,
      [userId, bookId, progressPercent]
    );
    return result.rows[0];
  }
};

// Get reading progress for a user
exports.getUserProgress = async (userId) => {
  const result = await pool.query(
    `SELECT rp.id, rp.book_id, b.title, rp.progress_percent, rp.updated_at
     FROM reading_progress rp
     JOIN books b ON rp.book_id = b.id
     WHERE rp.user_id = $1
     ORDER BY rp.updated_at DESC`,
    [userId]
  );
  return result.rows;
};

// Get progress for a specific book
exports.getBookProgress = async (userId, bookId) => {
  const result = await pool.query(
    `SELECT * FROM reading_progress WHERE user_id = $1 AND book_id = $2`,
    [userId, bookId]
  );
  return result.rows[0] || null;
};