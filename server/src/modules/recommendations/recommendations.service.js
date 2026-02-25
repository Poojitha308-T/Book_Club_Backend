const pool = require("../../config/db");

exports.getRecommendations = async (userId) => {
  try {
    console.log("User ID:", userId);

    // 1️⃣ Find user's top-rated genres
    const genreResult = await pool.query(`
      SELECT b.genre,
             ROUND(AVG(r.rating),2) AS avg_rating
      FROM reviews r
      JOIN books b ON r.book_id = b.id
      WHERE r.user_id = $1
        AND b.genre IS NOT NULL
      GROUP BY b.genre
      ORDER BY avg_rating DESC
      LIMIT 3;
    `, [userId]);

    let favoriteGenres = [];
    if (genreResult.rows.length > 0) {
      favoriteGenres = genreResult.rows.map(row => row.genre);
    }

    console.log("Favorite Genres:", favoriteGenres);

    // 2️⃣ Recommend books
    let recommendationsResult;

    if (favoriteGenres.length > 0) {
      // Use favorite genres
      recommendationsResult = await pool.query(`
        SELECT b.id, b.title, b.author, b.genre,
               ROUND(COALESCE(AVG(r.rating),0),2)::FLOAT AS average_rating
        FROM books b
        LEFT JOIN reviews r ON b.id = r.book_id
        WHERE b.genre = ANY($1)
          AND b.id NOT IN (
            SELECT book_id FROM library WHERE user_id = $2
          )
        GROUP BY b.id
        ORDER BY average_rating DESC
        LIMIT 10;
      `, [favoriteGenres, userId]);
    } else {
      // No ratings yet — just top-rated books across all genres
      recommendationsResult = await pool.query(`
        SELECT b.id, b.title, b.author, b.genre,
               ROUND(COALESCE(AVG(r.rating),0),2)::FLOAT AS average_rating
        FROM books b
        LEFT JOIN reviews r ON b.id = r.book_id
        WHERE b.id NOT IN (
          SELECT book_id FROM library WHERE user_id = $1
        )
        GROUP BY b.id
        ORDER BY average_rating DESC
        LIMIT 10;
      `, [userId]);
    }

    console.log("Recommendations Found:", recommendationsResult.rows.length);

    return {
      favoriteGenres,
      recommendations: recommendationsResult.rows
    };

  } catch (err) {
    console.error("Recommendation Service Error:", err);
    return {
      favoriteGenres: [],
      recommendations: [],
      message: "Error fetching recommendations"
    };
  }
};