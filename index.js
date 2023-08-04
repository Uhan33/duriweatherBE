const express = require("express");

// Create an express instance
const app = express();

app.use("/", (req, res) => {
  res.send("Server On");
});

app.listen(5000, console.log("Server Started On Port 5000"));
