const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");

const errorController = require("./controllers/error");
const allRoutes = require("./routes/fetchAll");
const trendingRoutes = require("./routes/trending");
const topRateRoutes = require("./routes/topRate");
const genresRoutes = require("./routes/genres");
const trailerRoutes = require("./routes/trailer");
const searchRoutes = require("./routes/search");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/movies", allRoutes);
app.use("/api/movies", trendingRoutes);
app.use("/api/movies", topRateRoutes);
app.use("/api/movies", genresRoutes);
app.use("/api/movies", trailerRoutes);
app.use("/api/movies", searchRoutes);
app.use(errorController.get404Page);

app.listen(4000);
