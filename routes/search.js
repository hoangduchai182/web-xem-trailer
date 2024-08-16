const path = require("path");

const express = require("express");

const searchController = require("../controllers/movies");

const authMiddleware = require("../middleware/middleware");

const router = express.Router();

router.get(
  "/search",
  authMiddleware.authenticateUser,
  searchController.getSearch
);

module.exports = router;
