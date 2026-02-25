const express = require("express");
const router = express.Router();
const goalsController = require("./goals.controller");
const verifyToken = require("../../middleware/auth.middleware");

// Create a goal
router.post("/", verifyToken, goalsController.createGoal);

// Update completed progress
router.put("/", verifyToken, goalsController.updateGoalProgress);

// Get all goals
router.get("/", verifyToken, goalsController.getUserGoals);

// Get specific goal
router.get("/goal", verifyToken, goalsController.getGoalById);

console.log("Goals Routes Loaded");
module.exports = router;