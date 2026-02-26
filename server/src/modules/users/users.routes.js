const express = require("express");
const router = express.Router();

const usersController = require("./users.controller");
const { verifyToken } = require("../../middleware/auth.middleware");

// Get logged-in user
router.get("/me", verifyToken, usersController.getCurrentUser);

// Update logged-in user
router.put("/me", verifyToken, usersController.updateCurrentUser);

// Get public profile
router.get("/:id", usersController.getUserById);

// Get all users
router.get("/", verifyToken, usersController.getAllUsers);

module.exports = router;