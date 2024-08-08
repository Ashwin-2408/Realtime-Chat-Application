const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
app.use(cors);
const server = http.createServer(app);
server.listen(3001, (err) => {
  if (err) {
    console.log({ LOG: "ERROR" });
  } else {
    console.log("SERVER is running");
  }
});
