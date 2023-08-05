// import body-parser
const requestBodyparser = require("../Util/body-parser");

// import file that will add new data to the actual file
const writeToFile = require("../Util/write-to-file");

module.exports = async (req, res) => {
  // Using the base url to input the id of the movie entry we want to edit
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  let id = req.url.split("/")[3];
  const regexV4 = new RegExp(
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
  );

  //   Check UUID if valid from client
  if (!regexV4.test(id)) {
    // Header show return a response with error code 404 and the content type
    res.writeHead(404, { "Content-Type": "application/json" });
    // JSON returned from data
    res.end(
      JSON.stringify({
        title: "Validation failed",
        message: "UUID is not valid",
      })
    );
    //  If valid UUID and correct base URL
  } else if (baseUrl === "/api/movies/" && regexV4.test(id)) {
    try {
      let body = await requestBodyparser(req);
      //if Valid request get the index
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
        // if index is found and we want to update the record
      } else {
        // This will update the record
        req.movies[index] = { id, ...body };
        // Update the movie.json
        writeToFile(req.movies);
        res.writeHead(200, { "Content-Type": "application/json" });
        // Send the updated data back to the database
        res.end(JSON.stringify(req.movies[index]));
      }

      //if invalid
    } catch (err) {
      console.log(err);
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "Validation failed",
          message: "Request body is not valid",
        })
      );
    }
  } else {
    // Header show return a response with error code 404 and the content type
    res.writeHead(404, { "Content-Type": "application/json" });
    // JSON returned from data
    res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
  }
};
