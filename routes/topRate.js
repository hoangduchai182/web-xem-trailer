const path = require("path");

const express = require("express");

const topRateController = require("../controllers/movies");

const authMiddleware = require("../middleware/middleware");

const router = express.Router();

router.get(
  "/top-rate",
  authMiddleware.authenticateUser,
  topRateController.getTopRate
);

module.exports = router;
