const pool = require("../../config/db"); // or supabase if you are using it

exports.getUserNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      "SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );

    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    await pool.query(
      "UPDATE notifications SET is_read = TRUE WHERE id = $1",
      [notificationId]
    );

    res.json({ success: true, message: "Notification marked as read" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.createNotification = async (req, res) => {
  try {
    const { userId, type, message } = req.body;

    const result = await pool.query(
      "INSERT INTO notifications (user_id, type, message) VALUES ($1, $2, $3) RETURNING *",
      [userId, type, message]
    );

    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM notifications WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    res.json({ success: true, message: "Notification deleted", data: result.rows[0] });
  } catch (error) {
    console.error("Delete Notification Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};