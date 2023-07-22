/** @format */

import http from "http";
import express from "express";
import { Server } from "socket.io";
import { corsConfig, socketCorsConfig } from "./conf.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, socketCorsConfig);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("div moved", (position) => {
    socket.broadcast.emit("div moved", position);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
