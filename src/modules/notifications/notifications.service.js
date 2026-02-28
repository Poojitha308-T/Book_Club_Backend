const pool = require("../../config/db");

// Create notification
exports.createNotification = async ({ user_id, type, message }) => {
  const result = await pool.query(
    `INSERT INTO notifications (user_id, type, message) VALUES ($1,$2,$3) RETURNING *`,
    [user_id, type, message]
  );
  return result.rows[0];
};

// Get all notifications for a user
exports.getNotificationsByUser = async (user_id) => {
  const result = await pool.query(
    `SELECT * FROM notifications WHERE user_id=$1 ORDER BY created_at DESC`,
    [user_id]
  );
  return result.rows;
};

// Mark notification as read
exports.markAsRead = async (id) => {
  const result = await pool.query(
    `UPDATE notifications SET is_read=TRUE WHERE id=$1 RETURNING *`,
    [id]
  );
  return result.rows[0];
};

// Delete notification
exports.deleteNotification = async (id) => {
  await pool.query(`DELETE FROM notifications WHERE id=$1`, [id]);
  return true;
};