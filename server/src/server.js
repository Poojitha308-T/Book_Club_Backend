require("dotenv").config();
const app = require("./app");
// Routes
app.use("/api/auth", require("./modules/auth/auth.routes"));
app.use("/api/books", require("./modules/books/book.routes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});