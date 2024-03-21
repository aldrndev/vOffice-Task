const express = require("express");
const router = express.Router();
const authRouter = require("./authRoutes");
const clientRouter = require("./clientRoutes");

router.use("/v1/auth", authRouter);
router.use("/v1/client", clientRouter);

module.exports = router;
