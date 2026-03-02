const pool = require("../../config/db");

exports.createBook = async (data, userId) => {
  const { title, author, description, genre, rating, image_url } = data;
  
  // Ensure rating is a number (fixes potential string concatenation issues)
  const ratingValue = parseFloat(rating);
  const safeRating = isNaN(ratingValue) ? 0 : ratingValue;

  const result = await pool.query(
    `INSERT INTO books (title, author, description, genre, rating, image_url, created_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [title, author, description, genre, safeRating, image_url, userId]
  );

  return result.rows[0];
};

exports.getAllBooks = async () => {
  const result = await pool.query(`
    SELECT 
      b.*,
      ROUND(COALESCE(AVG(r.rating), 0), 2)::FLOAT AS average_rating,
      COUNT(r.id)::INT AS total_reviews
    FROM books b
    LEFT JOIN reviews r ON b.id = r.book_id
    GROUP BY b.id
    ORDER BY b.created_at DESC
  `);

  return result.rows;
};

exports.getBookById = async (id) => {
  const result = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
  return result.rows[0];
};

exports.updateBook = async (id, data) => {
  const { title, author, description, genre, image_url } = data;

  // Use COALESCE to keep old value if the new value is null/undefined
  // This prevents accidentally clearing fields if they aren't sent in the request
  const result = await pool.query(
    `UPDATE books
     SET title = COALESCE($1, title),
         author = COALESCE($2, author),
         description = COALESCE($3, description),
         genre = COALESCE($4, genre),
         image_url = COALESCE($5, image_url)
     WHERE id = $6
     RETURNING *`,
    [title, author, description, genre, image_url, id]
  );

  return result.rows[0];
};

exports.deleteBook = async (bookId) => {
  const result = await pool.query(
    "DELETE FROM books WHERE id = $1 RETURNING *",
    [bookId]
  );

  return result.rows[0];
};