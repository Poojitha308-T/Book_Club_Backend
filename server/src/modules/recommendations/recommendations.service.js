const pool = require("../../config/db");
exports.getRecommendations = async (userId) => {
  // 1 Find user's highest-rated genre
  const genreResult = await pool.query(`
    SELECT b.genre,
           ROUND(AVG(r.rating),2) AS avg_rating
    FROM reviews r
    JOIN books b ON r.book_id = b.id
    WHERE r.user_id = $1
      AND b.genre IS NOT NULL
    GROUP BY b.genre
    ORDER BY avg_rating DESC
    LIMIT 1;
  `, [userId]);

  if (genreResult.rows.length === 0) {
    return {
      message: "No rating history found",
      recommendations: []
    };
  }

  const favoriteGenre = genreResult.rows[0].genre;

  // 2. Recommend books from that genre (exclude already in library)
  const recommendationsResult = await pool.query(`
    SELECT b.id, b.title, b.author, b.genre,
           ROUND(COALESCE(AVG(r.rating),0),2)::FLOAT AS average_rating
    FROM books b
    LEFT JOIN reviews r ON b.id = r.book_id
    WHERE b.genre = $1
      AND b.id NOT IN (
        SELECT book_id FROM library WHERE user_id = $2
      )
    GROUP BY b.id
    ORDER BY average_rating DESC
    LIMIT 5;
  `, [favoriteGenre, userId]);

  return {
    favoriteGenre,
    recommendations: recommendationsResult.rows
  };
};