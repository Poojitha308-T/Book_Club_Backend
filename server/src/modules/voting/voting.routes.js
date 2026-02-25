const express = require("express");
const router = express.Router();
const votingController = require("./voting.controller");
const verifyToken = require("../../middleware/auth.middleware");

router.post("/", verifyToken, votingController.vote);
router.get("/", verifyToken, votingController.getVotes);

console.log("Voting Routes Loaded");
module.exports = router;