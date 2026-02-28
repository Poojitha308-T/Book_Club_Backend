const cors = require("cors");

app.use(
  cors({
    origin:["http://localhost:5173",
    "https://fluffy-bubblegum-5fd360.netlify.app/"],
    credentials: true,
  })
);