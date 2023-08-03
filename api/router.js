const express = require("express");
const apiRouter = express.Router();

apiRouter.use("/hello", require("./hello"));

module.exports = apiRouter;
