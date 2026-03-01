const express = require("express");
const router = express.Router();
const libraryController = require("./library.controller");
const { verifyToken } = require("../../middleware/auth.middleware");

// Add a book
router.post("/", verifyToken, libraryController.addBookToLibrary);

// Remove a book
router.delete("/", verifyToken, libraryController.removeBook);

// Get user's library
router.get("/", verifyToken, libraryController.getUserLibrary);

console.log("Library Routes Loaded");
module.exports = router;
