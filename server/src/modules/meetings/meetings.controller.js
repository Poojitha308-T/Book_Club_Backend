const meetingsService = require("./meetings.service");

exports.createMeeting = async (req, res) => {
  try {
    const meeting = await meetingsService.createMeeting({
      title: req.body.title,
      description: req.body.description,
      meeting_link: req.body.meeting_link,
      scheduled_at: req.body.scheduled_at,
      created_by: req.user.id,
    });
    res.status(201).json({ success: true, data: meeting });
  } catch (err) {
    console.error("Meetings Controller Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getAllMeetings = async (req, res) => {
  try {
    const meetings = await meetingsService.getAllMeetings();
    res.json({ success: true, data: meetings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getMeetingById = async (req, res) => {
  try {
    const meeting = await meetingsService.getMeetingById(req.params.id);
    if (!meeting) return res.status(404).json({ success: false, message: "Meeting not found" });
    res.json({ success: true, data: meeting });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.joinMeeting = async (req, res) => {
  try {
    const participant = await meetingsService.joinMeeting({
      meeting_id: req.params.id,
      user_id: req.user.id,
    });
    res.json({ success: true, data: participant });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};