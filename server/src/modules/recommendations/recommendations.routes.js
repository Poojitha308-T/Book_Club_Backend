const express = require("express");
const router = express.Router();
const recommendationController = require("./recommendations.controller");
const verifyToken = require("../../middleware/auth.middleware");

router.get("/", verifyToken, recommendationController.getRecommendations);

module.exports = router;