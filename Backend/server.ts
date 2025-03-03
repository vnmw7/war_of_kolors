import express, { Request, Response } from "express";
import { Server } from "socket.io";
import cors from "cors";
import http from "http";

interface Player {
  playerId: string;
  guess: number;
}

const players: { [key: string]: Player } = {};
let readyCheck = 0;

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

  players[socket.id] = {
    playerId: socket.id,
    guess: 0,
  };

  socket.on("player-ready", (id) => {
    console.log("A user is ready " + id);
    readyCheck++;
    console.log(players);
  });
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
