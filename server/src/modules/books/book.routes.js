const express = require("express");
const router = express.Router();

const bookController = require("./book.controller");
const { verifyToken } = require("../../middleware/auth.middleware");
const allowRoles = require("../../middleware/role.middleware");
const reviewRoutes = require("../reviews/review.routes");

router.post("/", verifyToken, bookController.createBook);

router.get("/", bookController.getAllBooks);

router.get("/:id", bookController.getBookById);

router.put("/:id", verifyToken, allowRoles("admin"), bookController.updateBook);

router.delete(
  "/:id",
  verifyToken,
  allowRoles("admin"),
  bookController.deleteBook,
);

router.use("/:bookId/reviews", reviewRoutes);

console.log("verifyToken:", verifyToken);
console.log("createBook:", bookController.createBook);

module.exports = router;
