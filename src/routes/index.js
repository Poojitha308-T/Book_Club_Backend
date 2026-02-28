
const express = require("express");
const router = express.Router();

// Auth & User routes
router.use("/auth", require("../modules/auth/auth.routes"));
router.use("/users", require("../modules/users/users.routes"));

// Book-related routes
router.use("/books", require("../modules/books/book.routes"));
router.use("/recommendations", require("../modules/recommendations/recommendations.routes"));
router.use("/library", require("../modules/library/library.routes"));
router.use("/reviews", require("../modules/likes/likes.routes"));

// Progress & Goals
router.use("/progress", require("../modules/progress/progress.routes"));
router.use("/goals", require("../modules/goals/goals.routes"));

// Voting & Discussions
router.use("/voting", require("../modules/voting/voting.routes"));
router.use("/discussions", require("../modules/discussions/discussions.routes"));

// Dashboard & Feed
router.use("/", require("../modules/dashboard/dashboard.routes"));
router.use("/feed", require("../modules/feed/feed.routes"));

// Meetings, Notifications & Achievements
router.use("/meetings", require("../modules/meetings/meetings.routes"));
router.use("/notifications", require("../modules/notifications/notifications.routes"));
router.use("/achievements", require("../modules/achievements/achievements.routes"));
router.use("/suggestions", require("../modules/suggestions/suggestion.routes"));

module.exports = router;