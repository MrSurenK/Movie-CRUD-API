// export get request so that it can be used on server.js
module.exports = (req, res) => {
  // Set base url with req.url method to get specific id of movie
  // substring specifies the id of the movie which we want
  // (0,req.url.lastIndex) --> url/api/movies/ <-- The last slash is the lastIndex
  // +1 gives the movie id in the dataset
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  // print the baseUrl to check
  // console.log(baseUrl);

  // Get the UUID of the movie and prints to console. splits each content after / into an array
  let id = req.url.split("/")[3];
  // Check if UUID passed by the client is a valid UUID with regex : https://ihateregex.io/expr/uuid/
  const regexV4 = new RegExp(
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
  );
  console.log(id);

  // Set the endpoint for get request, status code and header
  if (req.url === "/api/movies") {
    res.statusCode = 200;
    // setHeader allows for single header to be set
    res.setHeader("Content-Type", "application/json");
    // Send the data over from movies.json file
    res.write(JSON.stringify(req.movies));
    res.end();

    // if uuid is not a match
    // .test(id) return boolean
  } else if (!regexV4.test(id)) {
    // Header show return a response with error code 404 and the content type
    res.writeHead(404, { "Content-Type": "application/json" });
    // JSON returned from data
    res.end(
      JSON.stringify({
        title: "Validation failed",
        message: "UUID is not valid",
      })
    );
    //  If base url and uuid is a match return the following response
  } else if (baseUrl === "/api/movies/" && regexV4.test(id)) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    // We need to send back the individual movie requested to the user.
    let filteredMovie = req.movies.filter((movie) => {
      return movie.id === id;
    });
    // if movie is in the database/file then filteredMovie will return more than 1 item in the array
    if (filteredMovie.length > 0) {
      res.statusCode = 200;
      res.write(JSON.stringify(filteredMovie));
      res.end();
    } else {
      res.statusCode = 404;
      res.end(
        JSON.stringify({ title: "Not Found", message: "Route not found" })
      );
    }

    // if url does not match...
  } else {
    // Header show return a response with error code 404 and the content type
    res.writeHead(404, { "Content-Type": "application/json" });
    // JSON returned from data
    res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
  }
};
