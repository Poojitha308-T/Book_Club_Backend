const express = require("express");
const router = express.Router();
const achievementsController = require("./achievements.controller");
const { verifyToken } = require("../../middleware/auth.middleware");
const allowRoles = require("../../middleware/role.middleware");

// Public: Get all achievement types
router.get("/", verifyToken, achievementsController.getAchievements);

// User: Get their own earned achievements
router.get("/me", verifyToken, achievementsController.getUserAchievements);

// Admin: Assign achievement to a user
router.post("/create", verifyToken, allowRoles("admin"), achievementsController.addUserAchievement);

console.log("Achievements Routes Loaded");

router.delete(
  "/remove",
  verifyToken,
  allowRoles("admin"),
  achievementsController.removeUserAchievement
);

module.exports = router;