import axios from "axios";

/** base url to make request to the themoviedatabase */

const instance = axios.create({
  baseURL: "http://localhost:4000",
});

export default instance;
