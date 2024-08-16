const path = require("path");

const express = require("express");

const allController = require("../controllers/movies");

const authMiddleware = require("../middleware/middleware");

const router = express.Router();

router.get("/all", authMiddleware.authenticateUser, allController.getAll);

module.exports = router;
