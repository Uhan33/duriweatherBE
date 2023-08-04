const express = require("express");
const apiRouter = express.Router();

apiRouter.use("/hello", require("./resources/hello"));

module.exports = apiRouter;