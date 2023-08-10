const express = require("express");
const apiRouter = express.Router();

apiRouter.use("/vilageFcst", require("./resources/vilageFcst"));
apiRouter.use("/ultraSrtNcst", require("./resources/ultraSrtNcst"));
apiRouter.use("/pm10", require("./resources/pm10"));
apiRouter.use("/comment", require("./resources/comment"));
apiRouter.use("/closet", require("./resources/closet"));

apiRouter.use("/user", require("./resources/users"));
apiRouter.use("/", require("./guide"));

module.exports = apiRouter;