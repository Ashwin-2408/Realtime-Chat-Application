const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
const { Server } = require("socket.io");

app.use(cors);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("join_room", (data) => {
    console.log(`USER with socket id ${socket.id} has joined room ${data}`);
  });
  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED", socket.id);
  });
});
server.listen(3001, (err) => {
  if (err) {
    console.log({ LOG: "ERROR" });
  } else {
    console.log("SERVER is running");
  }
});
