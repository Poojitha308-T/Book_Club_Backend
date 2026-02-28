const express = require("express");
const router = express.Router();

const usersController = require("./users.controller");
const { verifyToken, verifyRoles } = require("../../middleware/auth.middleware");

// Get logged-in user
router.get("/me", verifyToken, usersController.getCurrentUser);

// Update logged-in user
router.put("/me", verifyToken, usersController.updateCurrentUser);

// Get public profile
router.get("/:id", usersController.getUserById);

// Get all users
router.get(
  "/",
  verifyToken,
  verifyRoles("admin"),
  usersController.getAllUsers
);

// Delete user
router.delete(
  "/:id",
  verifyToken,
  verifyRoles("admin"),
  usersController.deleteUser
);

// Update role
router.put(
  "/:id/role",
  verifyToken,
  verifyRoles("admin"),
  usersController.updateCurrentUser
);

module.exports = router;