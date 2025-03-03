import { GameObjects, Scene } from "phaser";
import { io, Socket } from "socket.io-client";
import { EventBus } from "../EventBus";

export class WaitingRoom extends Scene {
  socket!: Socket;
  win!: GameObjects.Text;
  roomID!: string;

  constructor() {
    super("WaitingRoom");
    this.socket = io("http://localhost:3000");

    this.socket.on("connect", () => {
      console.log("Connected with ID:", this.socket.id);
    });
  }

  // Add this method after constructor
  init(data: { roomID: string }) {
    this.roomID = data.roomID;
    console.log("Room initialized with roomId:", this.roomID);
  }

  create() {
    EventBus.emit("current-scene-ready", this);
  }
}
