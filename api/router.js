const express = require("express");
const apiRouter = express.Router();

apiRouter.use("/hello", require("./hello.ts"));

module.exports = apiRouter;
