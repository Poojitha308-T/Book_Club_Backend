const pool = require("../../config/db");

exports.getRecommendations = async (userId) => {
  try {
    console.log("User ID:", userId);

    // 1️⃣ Get user's top genres
    const genreResult = await pool.query(`
      SELECT COALESCE(b.genre,'General') AS genre,
             ROUND(AVG(r.rating),2) AS avg_rating
      FROM reviews r
      JOIN books b ON r.book_id = b.id
      WHERE r.user_id = $1
      GROUP BY COALESCE(b.genre,'General')
      ORDER BY avg_rating DESC
      LIMIT 3;
    `, [userId]);

    const favoriteGenres = genreResult.rows.map(row => row.genre);
    console.log("Favorite Genres:", favoriteGenres.length ? favoriteGenres : ["General"]);

    // 2️⃣ Library books
    const libraryResult = await pool.query(`
      SELECT book_id FROM library WHERE user_id = $1
    `, [userId]);
    const libraryBookIds = libraryResult.rows.map(r => r.book_id);
    console.log("Books in Library:", libraryBookIds);

    // 3️⃣ Hybrid recommendation
    let recommendationsResult;

    if (favoriteGenres.length > 0) {
      // b.genre fallback + exclude books in library if any
      const notInClause = libraryBookIds.length ? `AND b.id NOT IN (${libraryBookIds.join(",")})` : "";
      recommendationsResult = await pool.query(`
        SELECT b.id, b.title, b.author, COALESCE(b.genre,'General') AS genre,
               ROUND(COALESCE(AVG(r.rating),0),2)::FLOAT AS average_rating,
               CASE WHEN COALESCE(b.genre,'General') = ANY($1) THEN 1 ELSE 0 END AS genre_match
        FROM books b
        LEFT JOIN reviews r ON b.id = r.book_id
        WHERE 1=1 ${notInClause}
        GROUP BY b.id
        ORDER BY genre_match DESC, average_rating DESC, b.created_at DESC
        LIMIT 10;
      `, [favoriteGenres]);
    } else {
      // fallback if favoriteGenres is empty
      recommendationsResult = await pool.query(`
        SELECT b.id, b.title, b.author, COALESCE(b.genre,'General') AS genre,
               ROUND(COALESCE(AVG(r.rating),0),2)::FLOAT AS average_rating
        FROM books b
        LEFT JOIN reviews r ON b.id = r.book_id
        GROUP BY b.id
        ORDER BY average_rating DESC, b.created_at DESC
        LIMIT 10;
      `);
    }

    console.log("Recommendations Found:", recommendationsResult.rows.length);

    return {
      favoriteGenres: favoriteGenres.length ? favoriteGenres : ["General"],
      recommendations: recommendationsResult.rows
    };

  } catch (err) {
    console.error("Hybrid Recommendation Service Error:", err);
    return {
      favoriteGenres: [],
      recommendations: [],
      message: "Error fetching recommendations"
    };
  }
};