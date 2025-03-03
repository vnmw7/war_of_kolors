import { GameObjects, Scene } from "phaser";
import { io, Socket } from "socket.io-client";
import { EventBus } from "../EventBus";

export class Room extends Scene {
  background!: GameObjects.Image;
  title!: GameObjects.Text;
  image!: GameObjects.Image;
  player!: GameObjects.Rectangle;
  opponent1!: GameObjects.Rectangle;
  opponent2!: GameObjects.Rectangle;
  opponent3!: GameObjects.Rectangle;
  colorButtonRed!: GameObjects.Text;
  colorButtonYellow!: GameObjects.Text;
  colorButtonBlue!: GameObjects.Text;
  readyButton!: GameObjects.Text;
  socket!: Socket;
  win!: GameObjects.Text;
  lose!: GameObjects.Text;
  roomID!: string;

  constructor() {
    super("Room");
    this.socket = io("http://localhost:3000");

    this.socket.on("connect", () => {
      console.log("Connected with ID:", this.socket.id);
    });

    this.socket.on("test", () => {
      this.changePlayerColor(0x0cce6b);
    });

    this.socket.on("correctGuess", (socketId) => {
      if (socketId === this.socket.id) {
        this.changePlayerColor(0xffffff);
        this.title.setText("You Win!");
        this.nextRound();
      } else {
        this.title.setText("You Lose!");
        this.changePlayerColor(0xffffff);
        this.nextRound();
      }
    });
  }

  // Add this method after constructor
  init(data: { roomID: string }) {
    this.roomID = data.roomID;
    console.log("Room initialized with roomId:", this.roomID);
  }

  create() {
    this.background = this.add.image(512, 384, "background");

    this.title = this.add
      .text(512, 460, this.roomID, {
        fontFamily: "Arial Black",
        fontSize: 38,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5)
      .setDepth(100);

    this.opponent1 = this.add.rectangle(612, 384, 50, 50, 0xffffff);
    this.opponent2 = this.add.rectangle(512, 384, 50, 50, 0xffffff);
    this.opponent3 = this.add.rectangle(412, 384, 50, 50, 0xffffff);
    this.player = this.add.rectangle(512, 584, 50, 50, 0xffffff);

    this.colorButtonRed = this.add
      .text(362, 684, "red", {
        fontFamily: "Arial",
        fontSize: 24,
        color: "white",
        backgroundColor: "red",
        padding: { x: 10, y: 5 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => this.changePlayerColor(0xff0000))
      .on("pointerover", () =>
        this.colorButtonRed.setStyle({ backgroundColor: "#555555" }),
      )
      .on("pointerout", () =>
        this.colorButtonRed.setStyle({ backgroundColor: "#333333" }),
      );

    this.colorButtonYellow = this.add
      .text(512, 684, "yellow", {
        fontFamily: "Arial",
        fontSize: 24,
        color: "white",
        backgroundColor: "yellow",
        padding: { x: 10, y: 5 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => this.changePlayerColor(0xffff00))
      .on("pointerover", () =>
        this.colorButtonYellow.setStyle({ backgroundColor: "#555555" }),
      )
      .on("pointerout", () =>
        this.colorButtonYellow.setStyle({ backgroundColor: "#333333" }),
      );

    this.colorButtonBlue = this.add
      .text(662, 684, "blue", {
        fontFamily: "Arial",
        fontSize: 24,
        color: "white",
        backgroundColor: "blue",
        padding: { x: 10, y: 5 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => this.changePlayerColor(0x0000ff))
      .on("pointerover", () =>
        this.colorButtonBlue.setStyle({ backgroundColor: "#555555" }),
      )
      .on("pointerout", () =>
        this.colorButtonBlue.setStyle({ backgroundColor: "#333333" }),
      );

    this.readyButton = this.add
      .text(662, 84, "ready", {
        fontFamily: "Arial",
        fontSize: 24,
        color: "white",
        backgroundColor: "blue",
        padding: { x: 10, y: 5 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => this.playerReady())
      .on("pointerover", () =>
        this.readyButton.setStyle({ backgroundColor: "#555555" }),
      )
      .on("pointerout", () =>
        this.readyButton.setStyle({ backgroundColor: "#333333" }),
      );

    EventBus.emit("current-scene-ready", this);
  }

  playerReady() {
    this.colorButtonBlue.destroy();
    this.colorButtonRed.destroy();
    this.colorButtonYellow.destroy();
    this.socket.emit("player-ready", this.socket.id);
  }

  nextRound() {
    this.colorButtonRed = this.add
      .text(362, 684, "red", {
        fontFamily: "Arial",
        fontSize: 24,
        color: "white",
        backgroundColor: "red",
        padding: { x: 10, y: 5 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => this.changePlayerColor(0xff0000))
      .on("pointerover", () =>
        this.colorButtonRed.setStyle({ backgroundColor: "#555555" }),
      )
      .on("pointerout", () =>
        this.colorButtonRed.setStyle({ backgroundColor: "#333333" }),
      );

    this.colorButtonYellow = this.add
      .text(512, 684, "yellow", {
        fontFamily: "Arial",
        fontSize: 24,
        color: "white",
        backgroundColor: "yellow",
        padding: { x: 10, y: 5 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => this.changePlayerColor(0xffff00))
      .on("pointerover", () =>
        this.colorButtonYellow.setStyle({ backgroundColor: "#555555" }),
      )
      .on("pointerout", () =>
        this.colorButtonYellow.setStyle({ backgroundColor: "#333333" }),
      );

    this.colorButtonBlue = this.add
      .text(662, 684, "blue", {
        fontFamily: "Arial",
        fontSize: 24,
        color: "white",
        backgroundColor: "blue",
        padding: { x: 10, y: 5 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => this.changePlayerColor(0x0000ff))
      .on("pointerover", () =>
        this.colorButtonBlue.setStyle({ backgroundColor: "#555555" }),
      )
      .on("pointerout", () =>
        this.colorButtonBlue.setStyle({ backgroundColor: "#333333" }),
      );
    this.readyButton.setStyle({ backgroundColor: "blue" });
  }

  changePlayerColor(color: number = 0xfff) {
    this.player.setFillStyle(color);
  }

  changeScene() {
    // para mang change scenes
    this.scene.start("Room");
  }
}
