const fs = require("fs");
const path = require("path");

const userTokenPath = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "userToken.json"
);

// Middleware for authentication
exports.authenticateUser = (req, res, next) => {
  const token = req.query.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Read the content of the userToken.json file
  fs.readFile(userTokenPath, (err, data) => {
    if (err) {
      console.error("Error reading userToken file:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    // Parse the JSON data
    const userTokens = JSON.parse(data);
    // console.log(userTokens);

    // Check if the token exists in the userTokens JSON
    const user = userTokens.find((user) => user.token === token);

    if (user) {
      // If the user is authenticated, proceed to the next middleware or route handler
      next();
    } else {
      // If the user is not authenticated, return 401 Unauthorized
      return res.status(401).json({ message: "Unauthorized" });
    }
  });
};
