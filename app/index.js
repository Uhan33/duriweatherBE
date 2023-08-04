const express = require("express");

// Create an express instance
const app = express();

const apiRouter = require("./api/router");
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("Server On^^");
});

app.get("/ping", (req, res) => {
  res.send("pong 🏓");
});

module.exports = app;