const express = require("express");
const router = express.Router();
const notificationsController = require("./notifications.controller");
const { verifyToken } = require("../../middleware/auth.middleware");

// Get notifications for a specific user
router.get("/user/:userId", verifyToken, notificationsController.getUserNotifications);

// Mark notification as read
router.patch("/:notificationId/read", verifyToken, notificationsController.markAsRead);

// Create a notification (admin only)
router.post("/", verifyToken, notificationsController.createNotification);

module.exports = router;