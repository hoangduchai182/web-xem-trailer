import React, { useState, useEffect } from "react";
import axios from "../../utils/axios";
import requests from "../../utils/requests";
import "./Banner.css";

function Banner() {
  // state này dùng để lưu trữ thông tin của 1 phim
  const [movie, setMovie] = useState([]);

  // useEffect này dùng để chạy 1 lần duy nhất khi component được render
  // nó sẽ gọi api để lấy danh sách phim và lưu vào state
  // sau đó lấy ngẫu nhiên 1 phim từ danh sách phim và lưu vào state
  useEffect(() => {
    async function fetchData() {
      // lấy danh sách phim từ api
      const request = await axios.get(requests.fetchNetflixOriginals);

      // lấy ngẫu nhiên 1 phim từ danh sách phim
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  // console.log(movie)

  // hàm này dùng để cắt chuỗi quá dài
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  // hiển thị thông tin của phim lên màn hình
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
				"https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
				)`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>
        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
