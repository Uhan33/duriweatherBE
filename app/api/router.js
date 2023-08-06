const express = require("express");
const apiRouter = express.Router();

apiRouter.use("/hello", require("./resources/hello"));
apiRouter.use("/vilageFcst", require("./resources/vilageFcst"));
apiRouter.use("/ultraSrtNcst", require("./resources/ultraSrtNcst"));

apiRouter.use("/user", require("./resources/users"));

module.exports = apiRouter;