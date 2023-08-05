// request is what we will get from the client
module.exports = async (request) => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      //Creat an event to get stream of data
      //.on method binds an event to an object. event listener captures the incoming chunks of data and appends them to the data variable.
      //Event driven programming
      request.on("data", (chunk) => {
        body += chunk;
      });
      //when all data has been received then end event listener is triggered
      //result from above will be in the form of a string
      //JSON.parse to parse the result to feed back to the database.
      request.on("end", () => {
        resolve(JSON.parse(body));
      });
    } catch (err) {
      console.log(err);
      // Reject the promise
      reject(err);
    }
  });
};
