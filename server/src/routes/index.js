const express = require("express");
const router = express.Router();
const votingRoutes = require("../modules/voting/voting.routes");
const discussionsRoutes = require("../modules/discussions/discussions.routes");
const progressRoutes = require("../modules/progress/progress.routes");

router.use("/auth", require("../modules/auth/auth.routes"));
router.use("/books", require("../modules/books/book.routes"));
router.use("/recommendations", require("../modules/recommendations/recommendations.routes"));
router.use("/voting", votingRoutes);
router.use("/discussions", discussionsRoutes);
router.use("/progress", progressRoutes);

module.exports = router;