
const express = require("express");
const {
  createSuggestion,
  getSuggestions,
  voteSuggestion,
  approveSuggestion,
} = require("./suggestion.controller");

const { verifyToken, verifyAdmin } = require("../../middleware/auth.middleware");

const router = express.Router();

// Create suggestion
router.post("/", verifyToken, createSuggestion);

// Get all suggestions
router.get("/", getSuggestions);

// Vote for a suggestion
router.post("/:id/vote", verifyToken, voteSuggestion);

// Approve suggestion (admin only)
router.patch("/:id/approve", verifyToken, verifyAdmin, approveSuggestion);

module.exports = router;