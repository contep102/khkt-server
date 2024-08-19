import express from "express";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import cors from "cors";
import UserRoute from "./router/userRor.js"; // Ensure the import path is correct
import RoomRoute from "./router/roomRor.js"; // Ensure the import path is correct
import mongoose from "mongoose";
import { app, server } from "./socket/socket.js";
dotenv.config();

app.set("trust proxy", 1);
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
  credentials: true, // Adjust as needed for security
};
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

// const peerServer = ExpressPeerServer(server, {
//   debug: true,
//   secure: true,
// });
app.use("/api/user", UserRoute);
app.use("/api/room", RoomRoute);
// app.use("/peerjs", peerServer);
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
