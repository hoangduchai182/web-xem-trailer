const path = require("path");

const express = require("express");

const trailerController = require("../controllers/movies");

const authMiddleware = require("../middleware/middleware");

const router = express.Router();

router.get(
  "/video",
  authMiddleware.authenticateUser,
  trailerController.getTrailer
);

module.exports = router;
