const express = require("express");
const router = express.Router();
const usersController = require("./users.controller");
const authMiddleware = require("../../middleware/auth.middleware");

// Get logged-in user
router.get("/me", authMiddleware, usersController.getCurrentUser);

// Update logged-in user
router.put("/me", authMiddleware, usersController.updateCurrentUser);

// Get public profile
router.get("/:id", usersController.getUserById);

module.exports = router;