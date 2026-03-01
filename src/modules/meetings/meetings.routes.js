const express = require("express");
const router = express.Router();
const meetingsController = require("./meetings.controller");
const { verifyToken, verifyRoles } = require("../../middleware/auth.middleware");

// Meetings routes
router.post("/", verifyToken, meetingsController.createMeeting);
router.get("/", verifyToken, meetingsController.getAllMeetings);
router.get("/:id", verifyToken, meetingsController.getMeetingById);
router.post("/:id/join", verifyToken, meetingsController.joinMeeting);
router.delete("/:id", verifyToken, verifyRoles("admin"), meetingsController.deleteMeeting);

module.exports = router;