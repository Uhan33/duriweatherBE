const express = require("express");
const apiRouter = express.Router();

apiRouter.use("/test", require("./test1"));

module.exports = apiRouter;
