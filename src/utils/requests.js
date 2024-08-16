const API_KEY = "504b85f6fe0a10a9c7f35945e14e7ddf";

const requests = {
  fetchTrending: `/api/movies/trending?&token=RYoOcWM4JW`,
  fetchNetflixOriginals: `/api/movies/all?&token=RYoOcWM4JW`,
  fetchTopRated: `/api/movies/top-rate?token=RYoOcWM4JW`,
  fetchActionMovies: `/api/movies/discover?genre=28&token=RYoOcWM4JW`,
  fetchComedyMovies: `/api/movies/discover?genre=35&token=RYoOcWM4JW`,
  fetchHorrorMovies: `/api/movies/discover?genre=27&token=RYoOcWM4JW`,
  fetchRomanceMovies: `/api/movies/discover?genre=10749&token=RYoOcWM4JW`,
  fetchDocumentaries: `/api/movies/discover?genre=99&token=RYoOcWM4JW`,
  fetchSearch: `/api/movies/search?token=RYoOcWM4JW`,
  //  fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
};

export default requests;
