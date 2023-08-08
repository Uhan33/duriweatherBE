const express = require("express");
const apiRouter = express.Router();

apiRouter.use("/vilageFcst", require("./resources/vilageFcst"));
apiRouter.use("/ultraSrtNcst", require("./resources/ultraSrtNcst"));
apiRouter.use("/pm10", require("./resources/pm10"));
apiRouter.use("/comment", require("./resources/comment"));

apiRouter.use("/user", require("./resources/users"));

module.exports = apiRouter;