const pool = require("../../config/db");

// Create a new goal
exports.createGoal = async (userId, targetBooks, targetPages, startDate, endDate) => {
  const result = await pool.query(
    `INSERT INTO goals (user_id, target_books, target_pages, start_date, end_date, created_at)
     VALUES ($1, $2, $3, $4, $5, NOW())
     RETURNING *`,
    [userId, targetBooks, targetPages, startDate, endDate]
  );
  return result.rows[0];
};

// Update completed progress for a goal
exports.updateGoalProgress = async (userId, goalId, completedBooks, completedPages) => {
  const result = await pool.query(
    `UPDATE goals
     SET completed_books = $1, completed_pages = $2
     WHERE id = $3 AND user_id = $4
     RETURNING *`,
    [completedBooks, completedPages, goalId, userId]
  );
  return result.rows[0];
};

// Get all goals for a user
exports.getUserGoals = async (userId) => {
  const result = await pool.query(
    `SELECT * FROM goals WHERE user_id = $1 ORDER BY start_date DESC`,
    [userId]
  );
  return result.rows;
};

// Get a specific goal
exports.getGoalById = async (userId, goalId) => {
  const result = await pool.query(
    `SELECT * FROM goals WHERE id = $1 AND user_id = $2`,
    [goalId, userId]
  );
  return result.rows[0] || null;
};

exports.deleteGoal = async (userId, goalId) => {
  const result = await pool.query(
    `DELETE FROM goals WHERE id = $1 AND user_id = $2 RETURNING *`,
    [goalId, userId]
  );
  return result.rows[0] || null;
};