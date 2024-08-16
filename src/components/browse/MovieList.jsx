import React, { useState, useEffect } from "react";
import axios from "../../utils/axios";
import movieTrailer from "movie-trailer";
import MovieDetail from "../../components/browse/MovieDetail";
import "./MovieList.css";

const base_url = "https://image.tmdb.org/t/p/original";
const movies_limit = 10;

// component này dùng để hiển thị danh sách phim
// danh sách phim này bao gồm: tên phim, hình ảnh phim
// khi click vào 1 phim thì sẽ hiển thị thông tin chi tiết của phim đó
function MovieList({ title, fetchUrl, isLargeRow }) {
  // state này dùng để lưu trữ danh sách phim
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  // useEffect này dùng để chạy 1 lần duy nhất khi component được render
  // nó sẽ gọi api để lấy danh sách phim và lưu vào state
  useEffect(() => {
    // lấy danh sách phim từ api
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      // setMovies dùng để lưu trữ danh sách phim
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  // hàm này dùng để xử lý khi click vào 1 phim
  const handleClick = (movie) => {
    // nếu click vào phim đã được chọn thì sẽ ẩn thông tin chi tiết của phim đó
    // nếu click vào phim chưa được chọn thì sẽ hiển thị thông tin chi tiết của phim đó
    if (selectedMovie && selectedMovie.id === movie.id) {
      setSelectedMovie(null);
      setTrailerUrl("");
    } else {
      setSelectedMovie(movie);
      movieTrailer(movie?.title || "")
        // hàm này dùng để lấy trailer của phim
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  // lấy danh sách phim và sắp xếp theo thứ tự giảm dần của popularity
  movies.sort((a, b) => b.popularity - a.popularity);
  // giới hạn số lượng phim hiển thị
  movies.splice(movies_limit);
  console.log(movies);

  // hiển thị danh sách phim lên màn hình
  return (
    <div className="row">
      <h2 className="movie-list-title">{title}</h2>
      <div className="row_posters sc2">
        {movies.map((movie) => {
          return (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row_poster ${isLargeRow && "row_posterLarge"}`}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          );
        })}
      </div>
      <div style={{ padding: "40px" }}>
        {selectedMovie && (
          <MovieDetail movieData={selectedMovie} movieTrailer={trailerUrl} />
        )}
      </div>
    </div>
  );
}

export default MovieList;
