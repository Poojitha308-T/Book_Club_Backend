const express = require("express");
const router = express.Router();
const discussionController = require("./discussions.controller");
const { verifyToken } = require("../../middleware/auth.middleware");

// Threads
router.post("/", verifyToken, discussionController.createThread);
router.get("/", verifyToken, discussionController.getThreadsByBook);

// Comments
router.post("/comments", verifyToken, discussionController.addComment);
router.get("/comments", verifyToken, discussionController.getComments);

console.log("Discussions Routes Loaded");
module.exports = router;
