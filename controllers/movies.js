const movies = require("../models/movieList");
const genres = require("../models/genreList");
const trailers = require("../models/videoList");
const middleware = require("../middleware/middleware");
const { response } = require("express");

// lấy tất cả movie
exports.getAll = (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const itemsPerPage = 20;
  // hàm này dùng để lấy dữ liệu từ model
  movies.fetchAll(page, itemsPerPage, (allMovies) => {
    // trả dữ liệu dưới dạng json
    res.json(allMovies);
  });
};

// gọi hàm getTrending từ model movieList
exports.getTrending = (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const itemsPerPage = 20;
  // hàm này dùng để lấy dữ liệu từ model
  movies.trendingMovies(page, itemsPerPage, (trendingMovies) => {
    res.json(trendingMovies);
  });
  // render dữ liệu
};

// lấy toprate movie
exports.getTopRate = (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const itemsPerPage = 20;

  movies.topRateMovie(page, itemsPerPage, (topRateMovie) => {
    res.json(topRateMovie);
  });
};

// lấy genres
exports.getGenres = (req, res, next) => {
  // lấy ví dụ genreId = 28
  // const genreId = parseInt(req.query.genre) || 28;
  const genreId = parseInt(req.query.genre);
  const page = parseInt(req.query.page) || 1;
  const itemsPerPage = 20;

  genres.getMoviesByGenre(genreId, page, itemsPerPage, (moviesByGenre) => {
    if (!moviesByGenre) {
      return res.status(400).json({ message: "Not found that genre id" });
    }
    res.json(moviesByGenre);
  });
};

// lấy trailer
exports.getTrailer = (req, res, next) => {
  const movieId = req.query.movie_id || 361743;
  if (!movieId) {
    return res.status(400).json({ message: "Not found film_id parram" });
  }

  trailers.getTrailer(movieId, (trailer) => {
    if (response.status === 404) {
      return res.status(404).json({ message: response.message });
    }
    res.json(trailer);
  });
};

// lấy search
exports.getSearch = (req, res, next) => {
  const keyword = req.query.keyword;
  const genres = parseInt(req.query.genres);
  const language = req.query.language;
  const type = req.query.type;
  const year = req.query.year;

  if (!keyword) {
    return res.status(400).json({ message: "Not found keyword parram" });
  }

  const page = parseInt(req.query.page) || 1;
  const itemsPerPage = 20;
  // movies.searchMovies(keyword, page, itemsPerPage, (searchMovies) => {
  //   res.json(searchMovies);
  // });
  movies.searchMore(
    keyword,
    genres,
    language,
    type,
    year,
    page,
    itemsPerPage,
    (searchMovies) => {
      res.json(searchMovies);
    }
  );
};
