const path = require("path");

const express = require("express");

const genresController = require("../controllers/movies");

const middleware = require("../middleware/middleware");

const router = express.Router();

router.get(
  "/discover",
  middleware.authenticateUser,
  genresController.getGenres
);

module.exports = router;
