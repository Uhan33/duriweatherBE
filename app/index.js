const express = require("express");

const bodyParser = require("body-parser");
const basicAuth = require("express-basic-auth");

// Create an express instance
const app = express();

console.log(`[INFO] __dirname: ${__dirname}`);

/**
 * Express 내장 미들웨어 등록
 */
// app.use(express.static("public")); // ok
app.use("/static", express.static("static")); // ok
// app.use("/static", express.static(__dirname + "/public")); // ko

app.use(express.urlencoded());
app.use(express.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );
// app.use(bodyParser.json());

/**
 * API router 등록
 */
const apiRouter = require("./api/router");
app.use("/api", apiRouter);

/**
 * Page router 등록
 */
app.use("/api", apiRouter);
app.get("/", (req, res) => {
  res.send("Express JS on Vercel");
});
app.get("/ping", (req, res) => {
  res.send("pong 🏓");
});

module.exports = app;