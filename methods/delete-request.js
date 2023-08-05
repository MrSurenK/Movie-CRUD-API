// import file that will add new data to the actual file
const writeToFile = require("../Util/write-to-file");

module.exports = (req, res) => {
  // Similar to get we need the id just like in GET
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  let id = req.url.split("/")[3];
  const regexV4 = new RegExp(
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
  );
  //   Check for UUID just like in GET
  if (!regexV4.test(id)) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        title: "Validation failed",
        message: "UUID is not valid",
      })
    );
    // Find the entry we want to delete using the UUID
  } else if (baseUrl === "/api/movies/" && regexV4.test(id)) {
    // findIndex matches the first element that matches the condition provided
    const index = req.movies.findIndex((movie) => {
      return movie.id === id;
    });
    // findIndex returns -1 if ***no elements*** matches the condition provided (case where movie id does not exisist)
    if (index === -1) {
      res.statusCode = 404;
      res.write(
        JSON.stringify({ title: "Not Found", message: "Route not found" })
      );
      res.end();
      // Now we have the movie let us delete the movie.
    } else {
      // splice the 1 record from that index (modifies the original array )
      req.movies.splice(index, 1);
      // Removes the movie from the movies.json file
      writeToFile(req.movies);
      res.writeHead(204, { "Content-Type": "application/json" });
      // Pass all the remaining movies to database
      res.end(JSON.stringify(req.movies));
    }
  } else {
    // Header show return a response with error code 404 and the content type
    res.writeHead(404, { "Content-Type": "application/json" });
    // JSON returned from data
    res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
  }
};
