const pool = require("../../config/db");

// Create a new thread
exports.createThread = async (userId, bookId, title) => {
  const result = await pool.query(
    `INSERT INTO threads (created_by, book_id, title, created_at)
     VALUES ($1, $2, $3, NOW())
     RETURNING *`,
    [userId, bookId, title]
  );
  return result.rows[0];
};

// Get all threads for a book
exports.getThreadsByBook = async (bookId, limit = 10, offset = 0) => {
  const result = await pool.query(
    `SELECT t.id, t.title, t.created_by, t.created_at,
            COUNT(c.id) AS comment_count
     FROM threads t
     LEFT JOIN comments c ON t.id = c.thread_id
     WHERE t.book_id = $1
     GROUP BY t.id
     ORDER BY t.created_at DESC
     LIMIT $2 OFFSET $3`,
    [bookId, limit, offset]
  );
  return result.rows;
};

// Add a comment to a thread
exports.addComment = async (userId, threadId, content, parentId = null) => {
  const result = await pool.query(
    `INSERT INTO comments (user_id, thread_id, content, parent_id, created_at)
     VALUES ($1, $2, $3, $4, NOW())
     RETURNING *`,
    [userId, threadId, content, parentId]
  );
  return result.rows[0];
};

// Get all comments for a thread
exports.getComments = async (threadId, limit = 10, offset = 0) => {
  const result = await pool.query(
    `SELECT id, user_id, parent_id, content, created_at
     FROM comments
     WHERE thread_id = $1
     ORDER BY created_at ASC
     LIMIT $2 OFFSET $3`,
    [threadId, limit, offset]
  );
  return result.rows;
};