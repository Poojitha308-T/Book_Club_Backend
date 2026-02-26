const express = require("express");
const router = express.Router();
const votingRoutes = require("../modules/voting/voting.routes");
const discussionsRoutes = require("../modules/discussions/discussions.routes");
const progressRoutes = require("../modules/progress/progress.routes");
const goalsRoutes = require("../modules/goals/goals.routes");
const libraryRoutes = require("../modules/library/library.routes");
const achievementsRoutes = require("../modules/achievements/achievements.routes");
const meetingsRoutes = require("../modules/meetings/meetings.routes");
const notificationsRoutes = require("../modules/notifications/notifications.routes");



router.use("/auth", require("../modules/auth/auth.routes"));
router.use("/books", require("../modules/books/book.routes"));
router.use("/recommendations", require("../modules/recommendations/recommendations.routes"));
router.use("/voting", votingRoutes);
router.use("/discussions", discussionsRoutes);
router.use("/progress", progressRoutes);
router.use("/goals", goalsRoutes);
router.use("/library", libraryRoutes);
router.use("/users", require("../modules/users/users.routes"));
router.use("/feed", require("../modules/feed/feed.routes"));
router.use("/reviews", require("../modules/likes/likes.routes"));
router.use("/dashboard", require("../modules/dashboard/dashboard.routes"));
router.use("/achievements", achievementsRoutes);
router.use("/meetings", meetingsRoutes);
router.use("/notifications", notificationsRoutes);


module.exports = router;