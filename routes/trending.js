const path = require("path");

const express = require("express");

const trendingController = require("../controllers/movies");

const authMiddleware = require("../middleware/middleware");

const router = express.Router();

router.get(
  "/trending",
  authMiddleware.authenticateUser,
  trendingController.getTrending
);

module.exports = router;
