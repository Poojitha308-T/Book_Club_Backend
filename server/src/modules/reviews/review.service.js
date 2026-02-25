const pool = require("../../config/supabaseClient");

exports.addReview = async ({ bookId, userId, rating, comment }) => {
  if (!rating || rating < 1 || rating > 5) {
    throw { status: 400, message: "Rating must be between 1 and 5" };
  }

  // Optional: Prevent duplicate reviews by same user
  const existing = await pool.query(
    "SELECT * FROM reviews WHERE book_id = $1 AND user_id = $2",
    [bookId, userId]
  );

  if (existing.rows.length > 0) {
    throw { status: 400, message: "You already reviewed this book" };
  }

  const result = await pool.query(
    `INSERT INTO reviews (book_id, user_id, rating, comment)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [bookId, userId, rating, comment]
  );

  return result.rows[0];
};

exports.getReviewsByBook = async (bookId) => {
  const result = await pool.query(
    `SELECT r.id, r.rating, r.comment, r.created_at,
            u.name AS reviewer
     FROM reviews r
     JOIN users u ON r.user_id = u.id
     WHERE r.book_id = $1
     ORDER BY r.created_at DESC`,
    [bookId]
  );

  return result.rows;
};