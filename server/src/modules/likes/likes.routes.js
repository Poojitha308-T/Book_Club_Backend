const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/auth.middleware");
const { likeReview, unlikeReview } = require("./likes.controller");

router.post("/:reviewId/like", verifyToken, likeReview);
router.delete("/:reviewId/unlike", verifyToken, unlikeReview);

module.exports = router;