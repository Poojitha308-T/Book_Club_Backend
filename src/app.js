const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin:["http://localhost:5173",
    "https://fluffy-bubblegum-5fd360.netlify.app/"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Book Club Backend is running ",
  });
});

app.use("/api", routes); // Central routing

app.use(errorMiddleware);

module.exports = app;
