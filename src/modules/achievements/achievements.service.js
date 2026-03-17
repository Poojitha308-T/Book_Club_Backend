const pool = require("../../config/db");

exports.createAchievement = async ({ name, description }) => {
  const result = await pool.query(
    "INSERT INTO achievements (name, description) VALUES ($1, $2) RETURNING *",
    [name, description]
  );

  return result.rows[0];
};

// Get all achievements available in the system
exports.getAllAchievements = async () => {
  const result = await pool.query("SELECT * FROM achievements ORDER BY name ASC");
  return result.rows;
};

// Get achievements earned by a specific user
exports.getUserAchievements = async (userId) => {
  const result = await pool.query(
    `SELECT ua.id, a.name, a.description, ua.earned_at
     FROM user_achievements ua
     JOIN achievements a ON ua.achievement_id = a.id
     WHERE ua.user_id = $1
     ORDER BY ua.earned_at DESC`,
    [userId]
  );
  return result.rows;
};

// Assign an achievement to a user
exports.addUserAchievement = async (userId, achievementId) => {
  const result = await pool.query(
    `INSERT INTO user_achievements (user_id, achievement_id) 
     VALUES ($1, $2)
     ON CONFLICT (user_id, achievement_id) DO NOTHING
     RETURNING *`,
    [userId, achievementId]
  );
  return result.rows[0];
};

exports.removeUserAchievement = async (userId, achievementId) => {
  const result = await pool.query(
    `DELETE FROM user_achievements 
     WHERE user_id = $1 AND achievement_id = $2
     RETURNING *`,
    [userId, achievementId]
  );

  return result.rows[0];
};