const express = require("express");
const router = express.Router({ mergeParams: true });

const reviewController = require("./review.controller");
const verifyToken = require("../../middleware/auth.middleware");

// Add review (logged-in users only)
router.post("/", verifyToken, reviewController.addReview);

// Get reviews (public)
router.get("/", reviewController.getReviewsByBook);

module.exports = router;