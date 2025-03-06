import { GameObjects, Scene } from "phaser";
import { io, Socket } from "socket.io-client";
import { EventBus } from "../EventBus";
import { getGlobalState } from "../globalState";

export class WaitingRoom extends Scene {
  socket!: Socket;
  roomLabel!: GameObjects.Text;
  roomID!: string;
  player!: GameObjects.Rectangle;
  readyButton!: GameObjects.Rectangle;
  user_id!: string;
  playersConnected!: number;
  playersReady!: number;
  opponents: GameObjects.Rectangle[] = [];
  playerText!: GameObjects.Text;

  constructor() {
    super("WaitingRoom");
  }

  preload() {
    const globalState = getGlobalState();
    this.user_id = globalState.user_id;
  }

  init() {
    this.preload();

    console.log("User ID: ", this.user_id);

    this.socket = io("http://localhost:3000");

    this.socket.on("connect", () => {
      console.log("Connected with ID:", this.socket.id);
    });

    this.roomID = "";
    this.playersConnected = 1;
    this.playersReady = 0;

    this.socket.emit("createGuestRoom", this.socket.id, (roomID: string) => {
      this.roomID = roomID;
      console.log("Room created: " + this.roomID);
    });
  }

  create() {
    const canvasWidth = this.sys.game.config.width as number;
    const canvasHeight = this.sys.game.config.height as number;
    const boxSize = 100;
    const spacing = 10;

    // Calculate the total width of the boxes and spacing
    const totalWidth = 5 * boxSize + 4 * spacing;

    // Center the boxes horizontally
    const startX = 50 + (canvasWidth - totalWidth) / 2;
    const startY = 150; // Adjusted Y position to match the image

    // Create Opponent boxes
    // Create Opponent boxes
    for (let j = 0; j < 5; j++) {
      const x = startX + 10 + j * (boxSize + spacing);
      const y = startY;

      // Store in array instead of dynamic properties
      this.opponents[j] = this.add
        .rectangle(x, y, boxSize, boxSize, 0x007bff, 0.2) // Semi-transparent blue fill
        .setStrokeStyle(4, 0xffffff)
        .setOrigin(0.5); // White outline
    }

    // Create Player box
    const playerBoxX = canvasWidth / 2;
    const playerBoxY = startY + boxSize + spacing + 50; // Position below Opponent boxes

    this.player = this.add
      .rectangle(playerBoxX, playerBoxY, boxSize, boxSize, 0x007bff, 0.2)
      .setStrokeStyle(4, 0xffffff);

    this.playerText = this.add
      .text(playerBoxX, playerBoxY, "Player", {
        fontFamily: "Arial",
        color: "#000000",
      })
      .setOrigin(0.5);

    // Create READY button (as a rectangle with text)
    this.readyButton = this.add
      .rectangle(
        canvasWidth / 2,
        playerBoxY + boxSize + spacing + 50,
        160,
        50,
        0x007bff,
        0.2,
      )
      .setStrokeStyle(2, 0xffffff)
      .setInteractive(
        new Phaser.Geom.Rectangle(0, 0, 160, 50),
        Phaser.Geom.Rectangle.Contains,
      ) // Make it clickable!
      .on("pointerdown", () => {
        console.log("Ready button clicked by: " + this.socket.id);

        this.socket.emit("playerReady", this.roomID, this.socket.id);

        this.readyButton.destroy();
        readyText.destroy();
      });

    const readyText = this.add
      .text(canvasWidth / 2, playerBoxY + boxSize + spacing + 50, "READY", {
        fontFamily: "Arial",
        color: "#ffffff",
        fontSize: "20px",
      })
      .setOrigin(0.5);

    this.add
      .text(
        canvasWidth / 2,
        canvasHeight - 200,
        `Players Ready: ${this.playersReady}`,
        {
          fontFamily: "Arial",
          fontSize: "32px",
          color: "#ffffff",
        },
      )
      .setOrigin(0.5, 0.5);

    this.add
      .text(
        canvasWidth / 2,
        canvasHeight - 100,
        `Connected players: ${this.playersConnected}`,
        {
          fontFamily: "Arial",
          fontSize: "32px",
          color: "#ffffff",
        },
      )
      .setOrigin(0.5, 0.5);

    // Add "Waiting for other players..." text
    this.add
      .text(
        canvasWidth / 2,
        canvasHeight - 50,
        "Waiting for other players...",
        {
          fontFamily: "Arial",
          fontSize: "16px",
          color: "#ffffff",
        },
      )
      .setOrigin(0.5, 0.5);

    // other web socket events
    // 1. update sng mga players nga ready
    this.socket.on("updatePlayersReady", (roomID: string, socketID: string) => {
      if (roomID === this.roomID) {
        console.log("Player ready: " + socketID);

        if (socketID == this.socket.id) {
          this.player.setFillStyle(0x00ff00);
        }

        this.playersReady++;
        console.log("Players ready: " + this.playersReady);
      }
    });

    EventBus.emit("current-scene-ready", this);
  }

  update() {
    // ang viewport sng browser
    const visualViewportWidth = window.visualViewport?.width;
    console.log("Viewport width: ", visualViewportWidth);

    if (visualViewportWidth !== undefined && visualViewportWidth < 580) {
      // Adjust the layout of opponent boxes
      const startX =
        150 + ((this.sys.game.config.width as number) - (5 * 100 + 4 * 10)) / 2;
      const startY = 100;
      const boxSize = 100;
      const spacing = 10;
      const topRowY = startY;
      const bottomRowY = startY + boxSize + spacing;

      for (let j = 0; j < 3; j++) {
        const x = startX + 10 + j * (boxSize + spacing);
        this.opponents[j].setPosition(x, topRowY);
      }

      for (let j = 3; j < 5; j++) {
        const x = startX + 60 + (j - 3) * (boxSize + spacing);
        this.opponents[j].setPosition(x, bottomRowY);
      }

      this.player.setPosition(1024 / 2, 350);
      this.playerText.setPosition(1024 / 2, 350);
    } else {
      const canvasWidth = this.sys.game.config.width as number;
      const boxSize = 100;
      const spacing = 10;

      // Calculate the total width of the boxes and spacing
      const totalWidth = 5 * boxSize + 4 * spacing;

      // Center the boxes horizontally
      const startX = 50 + (canvasWidth - totalWidth) / 2;
      const startY = 150; // Adjusted Y position to match the image

      for (let j = 0; j < 5; j++) {
        const x = startX + 10 + j * (boxSize + spacing);
        const y = startY;

        // Set position of existing opponent boxes
        this.opponents[j].setPosition(x, y);
      }

      this.player.setPosition(canvasWidth / 2, startY + boxSize + spacing + 50);
      this.playerText.setPosition(
        canvasWidth / 2,
        startY + boxSize + spacing + 50,
      );
    }
  }
}
