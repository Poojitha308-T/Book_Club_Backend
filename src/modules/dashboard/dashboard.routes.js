const express = require("express");
const router = express.Router();
const dashboardController = require("./dashboard.controller");
const { verifyToken, verifyAdmin, verifyRoles } = require("../../middleware/auth.middleware");

// General dashboard stats
router.get("/", verifyToken, dashboardController.getDashboard);

// Users management
router.get("/users", verifyToken, verifyAdmin, dashboardController.getUsers);

// Books management
router.get("/books", verifyToken, verifyAdmin, dashboardController.getBooks);

// Reading progress stats
router.get("/progress", verifyToken, verifyAdmin, dashboardController.getProgress);

// Goals overview
router.get("/goals", verifyToken, verifyAdmin, dashboardController.getGoals);


console.log("Dashboard Routes Loaded");

module.exports = router;