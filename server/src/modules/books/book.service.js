const pool = require("../../config/db");

exports.createBook = async (data, userId) => {
  const { title, author, description } = data;

  const result = await pool.query(
    `INSERT INTO books (title, author, description, created_by)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [title, author, description, userId]
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
  const result = await pool.query(
    "SELECT * FROM books WHERE id = $1",
    [id]
  );

  return result.rows[0];
};

exports.updateBook = async (id, data) => {
  const { title, author, description } = data;

  const result = await pool.query(
    `UPDATE books
     SET title = $1,
         author = $2,
         description = $3
     WHERE id = $4
     RETURNING *`,
    [title, author, description, id]
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