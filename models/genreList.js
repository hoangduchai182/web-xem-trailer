const fs = require("fs");
const path = require("path");

// đọc file json
const movieFilePath = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "movieList.json"
);
const genreFilePath = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "genreList.json"
);

class MovieModel {
  // hàm xử lý dữ liệu
  static getMoviesByGenre(genreId, page, itemsPerPage, cb) {
    // đọc file json
    fs.readFile(movieFilePath, (err, movieFileContent) => {
      if (err) {
        cb([]);
        return;
      }

      fs.readFile(genreFilePath, (err, genreFileContent) => {
        if (err) {
          cb([]);
          return;
        }

        // 2 mảng chứa dữ liệu từ việc đọc file json
        const movies = JSON.parse(movieFileContent);
        const genres = JSON.parse(genreFileContent);

        // tìm genres theo id
        const genre = genres.find((item) => item.id === genreId);
        if (!genre) {
          cb({ message: "Not found that genre id" });
          return;
        }

        // lọc ra các movie có genre_id trùng với genreId
        const filteredMovies = movies.filter((movie) =>
          movie.genre_ids.includes(genreId)
        );
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = page * itemsPerPage;
        const moviesOnPage = filteredMovies.slice(startIndex, endIndex);
        const total_pages = Math.ceil(filteredMovies.length / itemsPerPage);

        // trả về dữ liệu
        cb({
          results: moviesOnPage,
          page: page,
          total_pages: total_pages,
          genre_name: genre.name, // trả về tên genre
        });
      });
    });
  }
}
module.exports = MovieModel;
