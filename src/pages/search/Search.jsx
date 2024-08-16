import React, { useState } from "react";

import Nav from "../../components/browse/Nav";
import SearchResult from "../../components/search/SearchResult";
import "./Search.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [Genres, setGenres] = useState("All");

  const [Types, setType] = useState("all");

  const [Languages, setLanguage] = useState("all");

  const [Year, setYear] = useState("");
  const [searchYear, setSearchYear] = useState("");

  // hàm này được gọi khi người dùng click vào nút search
  const handleSearch = () => {
    // hàm setQuery sẽ set giá trị của query thành giá trị của searchInput
    // mục đích là để truyền giá trị của searchInput vào SearchResult
    setQuery(searchInput);
    setYear(searchYear);
  };

  // hàm này dùng để reset lại input search
  const resetSearch = () => {
    setQuery("");
    setSearchInput("");
    setYear("");
    setSearchYear("");
  };

  return (
    <div className="app">
      <Nav />
      <div className="s009">
        <form>
          <div className="inner-form">
            <div className="basic-search">
              <div className="input-field">
                <input
                  type="text"
                  placeholder="Type Keywords"
                  // thay đổi giá trị của input search
                  // mục đích là để lấy giá trị của input search
                  onChange={(e) => setSearchInput(e.target.value)}
                  value={searchInput}
                />
                <div className="icon-wrap">
                  <svg
                    className="svg-inline--fa fa-search fa-w-16"
                    fill="#ccc"
                    aria-hidden="true"
                    data-prefix="fas"
                    data-icon="search"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                  </svg>
                </div>
              </div>
              <div className="input-field">
                <select
                  name="genres"
                  id="genres"
                  value={Genres}
                  onChange={(e) => setGenres(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="28">Action</option>
                  <option value="12">Adventure</option>
                  <option value="16">Animation</option>
                  <option value="35">Comedy</option>
                  <option value="80">Crime</option>
                  <option value="99">Documentary</option>
                  <option value="18">Drama</option>
                  <option value="10751">Family</option>
                  <option value="14">Fantasy</option>
                  <option value="36">History</option>
                  <option value="27">Horror</option>
                  <option value="10402">Music</option>
                  <option value="9648">Mystery</option>
                  <option value="10749">Romance</option>
                  <option value="878">Science Fiction</option>
                  <option value="10770">TV Movie</option>
                  <option value="53">Thriller</option>
                  <option value="10752">War</option>
                  <option value="37">Western</option>
                </select>
                <select
                  name="types"
                  id="types"
                  value={Types}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="movie">Movie</option>
                  <option value="tv">TV</option>
                  <option value="person">Person</option>
                </select>
                <select
                  name="language"
                  id="language"
                  value={Languages}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="en">English</option>
                  <option value="ja">Japan</option>
                  <option value="ko">Korean</option>
                </select>
                <input
                  type="number"
                  placeholder="Năm Phát Hành"
                  value={Year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
            </div>
            <div className="advance-search">
              <div className="row third">
                <div className="input-field">
                  <div className="result-count"></div>
                  <div className="group-btn">
                    <button
                      className="btn-delete"
                      onClick={resetSearch}
                      type="button"
                    >
                      RESET
                    </button>
                    <button
                      className="btn-search"
                      type="button"
                      onClick={() => handleSearch()}
                    >
                      SEARCH
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <SearchResult
        query={query}
        Genres={Genres}
        Types={Types}
        Languages={Languages}
        Year={Year}
      />
    </div>
  );
};

export default Search;
