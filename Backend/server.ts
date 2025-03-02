import express, { Request, Response } from "express";
import { Server } from "socket.io";
import cors from "cors";
import http from "http";

// Create express app
const app = express();
app.use(express.json());
app.use(cors());

// Create HTTP server with Express
const server = http.createServer(app);

// Create Socket.IO server using the HTTP server
const io = new Server(server, {
  cors: {
    origin: "*", // change this to the frontend URL kng mag deploy na
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected! " + socket.id);

  socket.on("player-ready", (socketId) => {
    console.log(`Player ${socketId} is ready`);
    // You can add additional logic here
  });

  // You can add more socket event handlers here
});

// Define the root path with a greeting message
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the Express + TypeScript Server!" });
});

// Set the network port
const port = process.env.PORT || 3000;

// Start the Express server
server.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});
