const pool = require("../../config/db");

// Add a book to user's library
exports.addBookToLibrary = async (userId, bookId, status = 'to_read') => {
  const result = await pool.query(
    `INSERT INTO library (user_id, book_id, status, created_at)
     VALUES ($1, $2, $3, NOW())
     ON CONFLICT (user_id, book_id) DO NOTHING
     RETURNING *`,
    [userId, bookId, status]
  );
  return result.rows[0] || null; // null if already exists
};

// Remove a book from library
exports.removeBookFromLibrary = async (userId, bookId) => {
  const result = await pool.query(
    `DELETE FROM library
     WHERE user_id = $1 AND book_id = $2
     RETURNING *`,
    [userId, bookId]
  );
  return result.rows[0] || null; // null if not found
};

// Get all books in user's library
exports.getUserLibrary = async (userId) => {
  const result = await pool.query(
    `SELECT l.id, l.book_id, b.title, b.author, b.genre, l.status, l.created_at
     FROM library l
     JOIN books b ON l.book_id = b.id
     WHERE l.user_id = $1
     ORDER BY l.created_at DESC`,
    [userId]
  );
  return result.rows;
};