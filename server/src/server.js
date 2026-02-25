const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

// Routes
app.use("/api/auth", require("./modules/auth/auth.routes"));
app.use("/api/books", require("./modules/books/book.routes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});