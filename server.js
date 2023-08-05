// import http
const http = require("http");
// import methods from methods folder
const getReq = require("./methods/get-request");
const postReq = require("./methods/post-request");
const putReq = require("./methods/put-request");
const deleteReq = require("./methods/delete-request");
// import movies starting data
let movies = require("./data/movies.json");

// require("dotenv").config(); --> import if we want to use .evn server

const PORT = process.env.PORT || 5001;

// Create HTTP server with request and response as param
const server = http.createServer((req, res) => {
  // Request for the movies.json data
  req.movies = movies;
  // The req.method property contains a string corresponding to the HTTP method of the request which can be either GET, POST, PUT, DELETE, etc.
  switch (req.method) {
    case "GET":
      getReq(req, res);
      break;
    case "POST":
      postReq(req, res);
      break;
    case "PUT":
      putReq(req, res);
      break;
    case "DELETE":
      deleteReq(req, res);
      break;
    // Catch error --> POSTMAN Select method: options
    default:
      res.statusCode = 404;
      //How we want the client to interprete the data from the server
      res.setHeader("Content-Type", "application/json");
      //Send data to the server
      //When sending data to a web server, the data has to be a string.JSON.stringify
      res.write(
        JSON.stringify({ title: "Not Found", message: "Route not found" })
      );
      //End the response
      res.end();
  }
});

//Listen for the server on a PORT
server.listen(PORT, () => {
  console.log(`Server started on port": ${PORT}`);
});
