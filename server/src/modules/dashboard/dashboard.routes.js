const express = require("express");
const router = express.Router();

const { getDashboard } = require("./dashboard.controller");
const { verifyToken, verifyAdmin } = require("../../middleware/auth.middleware");

router.get("/", verifyToken, verifyAdmin, getDashboard);

module.exports = router;