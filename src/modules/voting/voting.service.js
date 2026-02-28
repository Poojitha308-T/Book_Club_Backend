const pool = require("../../config/db");

/**
 * Add or update a vote for a book
 * vote: 1 = upvote, -1 = downvote
 */
exports.addOrUpdateVote = async (userId, bookId, vote) => {
  try {
    // Check if the user already voted for this book
    const existingVote = await pool.query(
      `SELECT id, vote FROM votes WHERE user_id=$1 AND book_id=$2`,
      [userId, bookId]
    );

    if (existingVote.rows.length > 0) {
      // Update existing vote
      await pool.query(
        `UPDATE votes SET vote=$1, created_at=NOW() WHERE id=$2`,
        [vote, existingVote.rows[0].id]
      );
      return { message: "Vote updated" };
    } else {
      // Insert new vote
      await pool.query(
        `INSERT INTO votes (user_id, book_id, vote, created_at)
         VALUES ($1, $2, $3, NOW())`,
        [userId, bookId, vote]
      );
      return { message: "Vote added" };
    }
  } catch (err) {
    console.error("Voting Service Error:", err);
    throw new Error("Failed to process vote");
  }
};

/**
 * Get total votes for a book
 */
exports.getVotes = async (bookId) => {
  try {
    const result = await pool.query(
      `SELECT SUM(vote) AS total_votes FROM votes WHERE book_id=$1`,
      [bookId]
    );
    return { totalVotes: result.rows[0].total_votes || 0 };
  } catch (err) {
    console.error("Get Votes Error:", err);
    throw new Error("Failed to fetch votes");
  }
};