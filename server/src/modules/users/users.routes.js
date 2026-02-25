const express = require("express");
const router = express.Router();
const usersController = require("./users.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const verifyToken = require("../../middleware/auth.middleware");

// Get logged-in user
router.get("/me", authMiddleware, usersController.getCurrentUser);

// Update logged-in user
router.put("/me", authMiddleware, usersController.updateCurrentUser);

// Get public profile
router.get("/:id", usersController.getUserById);

router.get("/", verifyToken, usersController.getAllUsers);

module.exports = router;