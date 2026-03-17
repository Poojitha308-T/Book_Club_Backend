const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();

app.use(express.json());

// Correct CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://book-club-frontend.pages.dev",                    
      "https://9a328140.book-club-frontend.pages.dev" // Cloudflare Pages frontend
    ],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Book Club Backend is running",
  });
});

app.use("/api", routes); // Central routing
app.use(errorMiddleware);

module.exports = app;