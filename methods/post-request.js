// import crypto core module from node to generate the UUID for the new data sets being added
const crypto = require("crypto");

// import body-parser
const requestBodyparser = require("../Util/body-parser");

// import file that will add new data to the actual file
const writeToFile = require("../Util/write-to-file");

module.exports = async (req, res) => {
  if (req.url === "/api/movies") {
    try {
      let body = await requestBodyparser(req);
      body.id = crypto.randomUUID();
      //   console.log(body);
      //   console.log(body.id);
      //req.movie is an array containing the movie data
      req.movies.push(body);
      // Before showing status write the new data to the file
      writeToFile(req.movies);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end();
    } catch (err) {
      // log the error
      console.log(err);
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "Validation failed",
          message: "Request body is not valid",
        })
      );
    }
    // if route is wrong
  } else {
    // Header show return a response with error code 404 and the content type
    res.writeHead(404, { "Content-Type": "application/json" });
    // JSON returned from data
    res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
  }
};
