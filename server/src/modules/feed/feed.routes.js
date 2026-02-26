const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/auth.middleware");
const { getFeed } = require("./feed.controller");

router.get("/", verifyToken, getFeed);

module.exports = router;