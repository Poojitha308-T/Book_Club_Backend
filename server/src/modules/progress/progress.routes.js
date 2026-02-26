const express = require("express");
const router = express.Router();
const progressController = require("./progress.controller");
const { verifyToken } = require("../../middleware/auth.middleware");

// Add or update progress
router.post("/", verifyToken, progressController.addOrUpdateProgress);

// Get all progress for a user
router.get("/", verifyToken, progressController.getUserProgress);

// Get progress for a specific book
router.get("/book", verifyToken, progressController.getBookProgress);

console.log("Progress Routes Loaded");
module.exports = router;
