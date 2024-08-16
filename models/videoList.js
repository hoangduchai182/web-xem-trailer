const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "videoList.json"
);

class MovieModel {
  // hàm xử lý dữ liệu
  static getTrailer(id, cb) {
    // đọc file json
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb({ status: 404, message: "Not found video" });
        return;
      }

      const videos = JSON.parse(fileContent);
      const filmVideos = videos.find((video) => video.id === id);

      if (!filmVideos) {
        cb({ status: 404, message: "Not found video" });
        return;
      }

      const trailers = filmVideos.videos.filter(
        (video) =>
          video.official === true &&
          video.site === "YouTube" &&
          (video.type === "Trailer" || video.type === "Teaser")
      );

      if (trailers.length === 0) {
        cb({ status: 404, message: "Not found video" });
        return;
      }

      // Sort the trailers by published_at to get the latest one
      trailers.sort(
        (a, b) => new Date(b.published_at) - new Date(a.published_at)
      );

      cb({ status: 200, video: trailers[0] });
    });
  }
}
module.exports = MovieModel;
