const express = require("express");
const router = express.Router();

router.use("/auth", require("../modules/auth/auth.routes"));
router.use("/books", require("../modules/books/book.routes"));
router.use("/recommendations", require("../modules/recommendations/recommendations.routes"));

module.exports = router;