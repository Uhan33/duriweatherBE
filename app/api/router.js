const express = require("express");
const apiRouter = express.Router();

apiRouter.use("/hello", require("./resources/hello"));
apiRouter.use("/vilageFcst", require("./resources/vilageFcst"));
apiRouter.use("/ultraSrtNcst", require("./resources/ultraSrtNcst"));
apiRouter.use("/pm10", require("./resources/pm10"));

apiRouter.use("/user", require("./resources/users"));

module.exports = apiRouter;