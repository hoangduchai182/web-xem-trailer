const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "movieList.json"
);

class MovieModel {
  // lấy dữ liệu từ file json
  static fetchAll(page, itemsPerPage, cb) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        const movieList = JSON.parse(fileContent);
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = page * itemsPerPage;
        const moviesOnPage = movieList.slice(startIndex, endIndex);
        const total_pages = Math.ceil(movieList.length / itemsPerPage);
        cb({
          results: moviesOnPage,
          page: page,
          total_pages: total_pages,
        });
      }
    });
  }

  // sắp xếp theo thứ tự giảm dần của vote_average
  static trendingMovies(page, itemsPerPage, cb) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        const movieList = JSON.parse(fileContent);
        // sắp xếp theo thứ tự giảm dần của popularity
        movieList.sort((a, b) => b.popularity - a.popularity);
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = page * itemsPerPage;
        const moviesOnPage = movieList.slice(startIndex, endIndex);
        const total_pages = Math.ceil(movieList.length / itemsPerPage);
        cb({
          results: moviesOnPage,
          page: page,
          total_pages: total_pages,
        });
      }
    });
  }

  // sắp xếp theo thứ tự giảm dần của vote_average
  static topRateMovie(page, itemsPerPage, cb) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        const movieList = JSON.parse(fileContent);
        // sắp xếp theo thứ tự giảm dần của vote_average
        movieList.sort((a, b) => b.vote_average - a.vote_average);
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = page * itemsPerPage;
        const moviesOnPage = movieList.slice(startIndex, endIndex);
        const total_pages = Math.ceil(movieList.length / itemsPerPage);
        cb({
          results: moviesOnPage,
          page: page,
          total_pages: total_pages,
        });
      }
    });
  }

  // tìm kiếm theo từ khóa
  static searchMovies(keyword, page, itemsPerPage, cb) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        const movieList = JSON.parse(fileContent);
        const searchMovies = movieList.filter((movie) => {
          if (!movie.title || !movie.overview) {
            return false; // Bỏ qua các bộ phim không có title hoặc overview
          }
          return (
            movie.title.toLowerCase().includes(keyword.toLowerCase()) ||
            movie.overview.toLowerCase().includes(keyword.toLowerCase())
          );
        });

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = page * itemsPerPage;
        const moviesOnPage = searchMovies.slice(startIndex, endIndex);
        const total_pages = Math.ceil(movieList.length / itemsPerPage);
        cb({
          results: moviesOnPage,
          page: page,
          total_pages: total_pages,
        });
      }
    });
  }

  // tìm kiếm
  static searchMore(
    keyword,
    genres,
    language,
    type,
    year,
    page,
    itemsPerPage,
    cb
  ) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        const movieList = JSON.parse(fileContent);
        let searchResult = movieList.filter((movie) => {
          if (!movie.title || !movie.overview) {
            return false; // Bỏ qua các bộ phim không có title hoặc overview
          }
          return (
            movie.title.toLowerCase().includes(keyword.toLowerCase()) ||
            movie.overview.toLowerCase().includes(keyword.toLowerCase())
          );
        });

        // tìm kiếm theo genres băng cách lọc ra các bộ phim có các phần tử trong mảng genre_ids chứa genres
        if (genres && genres != "all") {
          searchResult = searchResult.filter((movie) =>
            movie.genre_ids.includes(genres)
          );
        }
        if (language && language != "all") {
          searchResult = searchResult.filter(
            (movie) => movie.original_language === language
          );
        }
        if (type && type != "all") {
          searchResult = searchResult.filter(
            (movie) => movie.media_type === type
          );
        }
        if (year) {
          searchResult = searchResult.filter((movie) =>
            movie.release_date
              ? movie.release_date.split("-")[0] === year
              : movie.first_air_date.split("-")[0] === year
          );
        }

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = page * itemsPerPage;
        const moviesOnPage = searchResult.slice(startIndex, endIndex);
        const total_pages = Math.ceil(searchResult.length / itemsPerPage);
        cb({
          results: moviesOnPage,
          page: page,
          total_pages: total_pages,
        });
      }
    });
  }
}

module.exports = MovieModel;
