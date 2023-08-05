// Need to add the data to the actual movies.json file after calling on the POST method

// import file system
const fs = require("fs");
// import path to construct the path of movie.json file
const path = require("path");

module.exports = (data) => {
  try {
    // _dirname returns the current directory
    // .. goes 1 level up
    // movie.json is the name of the file we want to access
    // JSON.stringify(data) --> stringify the data object that we want to add to our file
    // utf-8 is the encoding
    fs.writeFileSync(
      path.join(__dirname, "..", "data", "movies.json"),
      JSON.stringify(data),
      "utf-8"
    );
  } catch (err) {
    console.log(err);
  }
};
