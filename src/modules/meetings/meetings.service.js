const pool = require("../../config/db");

exports.createMeeting = async ({ title, description, meeting_link, scheduled_at, created_by }) => {
  const result = await pool.query(
    `INSERT INTO meetings (title, description, meeting_link, scheduled_at, created_by)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [title, description, meeting_link, scheduled_at, created_by]
  );
  return result.rows[0];
};

exports.getAllMeetings = async () => {
  const result = await pool.query(`SELECT * FROM meetings ORDER BY scheduled_at DESC`);
  return result.rows;
};

exports.getMeetingById = async (id) => {
  const result = await pool.query(`SELECT * FROM meetings WHERE id = $1`, [id]);
  return result.rows[0];
};

exports.joinMeeting = async ({ meeting_id, user_id }) => {
  const result = await pool.query(
    `INSERT INTO meeting_participants (meeting_id, user_id)
     VALUES ($1, $2)
     ON CONFLICT (meeting_id, user_id) DO NOTHING
     RETURNING *`,
    [meeting_id, user_id]
  );
  return result.rows[0];
};


// meeting.service.js
exports.deleteMeeting = async (id) => {
  const result = await pool.query(
    `DELETE FROM meetings WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0]; // returns deleted row or undefined if not found
};