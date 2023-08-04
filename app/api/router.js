const express = require("express");
const apiRouter = express.Router();

apiRouter.use("/hello", require("./resources/hello"));
apiRouter.use("/test", require("./resources/test"));
apiRouter.use("/user", require("./resources/users"));

module.exports = apiRouter;