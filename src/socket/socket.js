import http from "http";
import { ExpressPeerServer } from "peer";
import { Server } from "socket.io";
import express from "express";
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  // path: "/socket.io",
  // pingTimeout: 60000,
  // pingInterval: 25000,
  // cors: {
  //   origin: ["*"],
  //   methods: ["GET", "POST"],
  // },
  // allowEIO3: true,
  cors: {
    origin: ["*"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId, userName) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-connected", userId, userName);
    socket.on("send-message", (inputMsg, userName) => {
      io.to(roomId).emit("recieve-message", inputMsg, userName);
    });
    socket.on("disconnect", () => {
      socket.broadcast.to(roomId).emit("user-disconnected", userId, userName);
    });
  });
});

export { app, server, io };
