const express = require("express");
const router = express.Router();

const { vote, getVotes } = require("./voting.controller");
const { verifyToken } = require("../../middleware/auth.middleware");

router.post("/", verifyToken, vote);

router.get("/", getVotes);

module.exports = router;