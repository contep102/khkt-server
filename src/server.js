import express from "express";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import cors from "cors";
import UserRoute from "./router/userRor.js"; // Ensure the import path is correct
import RoomRoute from "./router/roomRor.js"; // Ensure the import path is correct
import mongoose from "mongoose";
import http from "http";
import { ExpressPeerServer } from "peer";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const server = http.createServer(app);

// CORS configuration
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
  credentials: true, // Adjust as needed for security
};

// Middleware
app.use(express.json()); // Place before rate limiter
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
      status: 429,
      message:
        "Too many requests from this IP, please try again after 15 minutes",
    },
  })
);
app.use(cors(corsOptions));

// Set up PeerJS server
const peerServer = ExpressPeerServer(server, {
  debug: true,
  secure: false,
});

// Routes
app.use("/api/user", UserRoute);
app.use("/api/room", RoomRoute);
app.use("/peerjs", peerServer);

// Socket.io configuration
const io = new Server(server, {
  path: "/socket.io",
  pingTimeout: 60000,
  pingInterval: 25000,
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
  allowEIO3: true,
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

// Connect to MongoDB and start server
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    server.listen(process.env.PORT || 8080, () => {
      console.log(`Server is running on port ${process.env.PORT || 8080}`);
    });
  })
  .catch((err) => {
    console.log("Something went wrong:", err);
  });
