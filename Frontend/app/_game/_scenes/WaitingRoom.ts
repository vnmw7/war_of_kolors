import { GameObjects, Scene } from "phaser";
import { io, Socket } from "socket.io-client";
import { EventBus } from "../EventBus";

export class WaitingRoom extends Scene {
  socket!: Socket;
  roomLabel!: GameObjects.Text;
  roomID!: string;

  skipButton!: GameObjects.Rectangle;
  opponents: GameObjects.Rectangle[] = [];

  connectedPlayers!: number;
  playersReady: number = 0;
  playersReadyText!: GameObjects.Text;

  // players
  characterName!: GameObjects.Text;
  playerName!: GameObjects.Text;
  playerBox!: GameObjects.Rectangle;
  opponentBox1!: GameObjects.Rectangle;
  opponentBox2!: GameObjects.Rectangle;
  opponentBox3!: GameObjects.Rectangle;
  opponentBox4!: GameObjects.Rectangle;
  opponentBox5!: GameObjects.Rectangle;
  opponentName1!: GameObjects.Text;
  opponentName2!: GameObjects.Text;
  opponentName3!: GameObjects.Text;
  opponentName4!: GameObjects.Text;
  opponentName5!: GameObjects.Text;
  oppCharacterName1!: GameObjects.Text;
  oppCharacterName2!: GameObjects.Text;
  oppCharacterName3!: GameObjects.Text;
  oppCharacterName4!: GameObjects.Text;
  oppCharacterName5!: GameObjects.Text;
  characterImage1!: GameObjects.Image;
  characterImage2!: GameObjects.Image;
  characterImage3!: GameObjects.Image;
  characterImage4!: GameObjects.Image;
  characterImage5!: GameObjects.Image;
  characterImage6!: GameObjects.Image;

  //  player information
  user!: { id: string; user_id: string; username: string };
  potions!: {
    id: string;
    devil: number;
    leprechaun: number;
  };
  character!: {
    id: number;
    name: string;
    sprite: string;
    created_at: string;
    tier: string;
    color: string;
    luck?: number;
  };

  constructor() {
    super("WaitingRoom");
  }

  preload() {
    this.load.setPath("assets");

    this.load.image("campfire", "/waitingRoom/campfire.jpg");
    this.load.image("logo", "logo.png");
  }

  init(data: {
    roomID: string;
    user: { id: string; user_id: string; username: string };
    character: {
      id: number;
      name: string;
      sprite: string;
      created_at: string;
      tier: string;
      color: string;
      luck?: number;
    };
    potions: { id: string; devil: number; leprechaun: number };
  }) {
    this.roomID = data.roomID;
    this.user = data.user;
    this.character = data.character;
    this.potions = data.potions;

    this.socket = io("http://localhost:3000");

    this.socket.on("connect", () => {
      console.log("Connected with ID:", this.socket.id);

      this.socket.emit(
        "joinWaitingRoom",
        this.roomID,
        this.socket.id,
        this.user,
        this.character,
        this.potions,
      );
    });
  }

  create() {
    const cameraX = this.cameras.main.width / 2;
    const cameraY = this.cameras.main.height / 2;
    const canvasWidth = this.sys.game.config.width as number;
    const canvasHeight = this.sys.game.config.height as number;
    const visualViewportWidth = window.visualViewport?.width;

    console.log("Viewport width: ", visualViewportWidth);

    this.add.image(cameraX - 3, cameraY, "campfire").setScale(0.2);
    this.cameras.main.setBackgroundColor(0x000000);

    const boxSize = 100;

    this.playerBox = this.add
      .rectangle(cameraX, cameraY + 135, boxSize, boxSize, 0x007bff, 0.2)
      .setStrokeStyle(4, 0xa9a9a9);
    this.characterImage1 = this.add
      .image(cameraX, cameraY + 135, "logo")
      .setDisplaySize(200, 200)
      .setAlpha(0);
    this.characterName = this.add
      // cameray + 135 +69
      .text(cameraX, cameraY + 204, "Character Name", {
        fontFamily: "Arial",
        color: "#ffffff",
        fontSize: "14px",
      })
      .setOrigin(0.5);
    this.playerName = this.add
      //// cameray + 204 + 16
      .text(cameraX, cameraY + 220, "(Player Name)", {
        fontFamily: "Arial",
        color: "#ADADAD",
        fontSize: "14px",
      })
      .setOrigin(0.5);

    this.opponentBox1 = this.add
      .rectangle(
        cameraX - 130,
        cameraY + 60,
        boxSize - 5,
        boxSize - 5,
        0x007bff,
        0.2,
      )
      .setStrokeStyle(4, 0xa9a9a9);
    this.characterImage2 = this.add
      .image(cameraX - 130, cameraY + 60, "logo")
      .setDisplaySize(200 - 5, 200 - 5)
      .setAlpha(0);
    this.oppCharacterName1 = this.add
      .text(cameraX - 130, cameraY + 129, "Character Name", {
        fontFamily: "Arial",
        color: "#ffffff",
        fontSize: "14px",
      })
      .setOrigin(0.5);
    this.opponentName1 = this.add
      .text(cameraX - 130, cameraY + 145, "(Player Name)", {
        fontFamily: "Arial",
        color: "#ADADAD",
        fontSize: "14px",
      })
      .setOrigin(0.5);

    this.opponentBox2 = this.add
      .rectangle(
        cameraX + 130,
        cameraY + 60,
        boxSize - 5,
        boxSize - 5,
        0x007bff,
        0.2,
      )
      .setStrokeStyle(4, 0xa9a9a9);
    this.characterImage3 = this.add
      .image(cameraX + 130, cameraY + 60, "logo")
      .setDisplaySize(200 - 5, 200 - 5)
      .setAlpha(0);
    this.oppCharacterName2 = this.add
      .text(cameraX + 130, cameraY + 129, "Character Name", {
        fontFamily: "Arial",
        color: "#ffffff",
        fontSize: "14px",
      })
      .setOrigin(0.5);
    this.opponentName2 = this.add
      .text(cameraX + 130, cameraY + 145, "(Player Name)", {
        fontFamily: "Arial",
        color: "#ADADAD",
        fontSize: "14px",
      })
      .setOrigin(0.5);

    this.opponentBox3 = this.add
      .rectangle(
        cameraX - 125,
        cameraY - 100,
        boxSize - 10,
        boxSize - 10,
        0x007bff,
        0.2,
      )
      .setStrokeStyle(4, 0xa9a9a9);
    this.characterImage4 = this.add
      .image(cameraX - 125, cameraY - 100, "logo")
      .setDisplaySize(200 - 10, 200 - 10)
      .setAlpha(0);
    this.oppCharacterName3 = this.add
      .text(cameraX - 125, cameraY - 31, "Character Name", {
        fontFamily: "Arial",
        color: "#ffffff",
        fontSize: "14px",
      })
      .setOrigin(0.5);
    this.opponentName3 = this.add
      .text(cameraX - 125, cameraY - 15, "(Player Name)", {
        fontFamily: "Arial",
        color: "#ADADAD",
        fontSize: "14px",
      })
      .setOrigin(0.5);

    this.opponentBox4 = this.add
      .rectangle(
        cameraX + 125,
        cameraY - 100,
        boxSize - 10,
        boxSize - 10,
        0x007bff,
        0.2,
      )
      .setStrokeStyle(4, 0xa9a9a9);
    this.characterImage5 = this.add
      .image(cameraX + 125, cameraY - 100, "logo")
      .setDisplaySize(200 - 10, 200 - 10)
      .setAlpha(0);
    this.oppCharacterName4 = this.add
      .text(cameraX + 125, cameraY - 31, "Character Name", {
        fontFamily: "Arial",
        color: "#ffffff",
        fontSize: "14px",
      })
      .setOrigin(0.5);
    this.opponentName4 = this.add
      .text(cameraX + 125, cameraY - 15, "(Player Name)", {
        fontFamily: "Arial",
        color: "#ADADAD",
        fontSize: "14px",
      })
      .setOrigin(0.5);

    this.opponentBox5 = this.add
      .rectangle(
        cameraX,
        cameraY - 125,
        boxSize - 15,
        boxSize - 15,
        0x007bff,
        0.2,
      )
      .setStrokeStyle(4, 0xa9a9a9);
    this.characterImage6 = this.add
      .image(cameraX, cameraY - 125, "logo")
      .setDisplaySize(200 - 15, 200 - 15)
      .setAlpha(0);
    this.oppCharacterName5 = this.add
      .text(cameraX, cameraY - 205, "Character Name", {
        fontFamily: "Arial",
        color: "#ffffff",
        fontSize: "14px",
      })
      .setOrigin(0.5);
    this.opponentName5 = this.add
      .text(cameraX, cameraY - 189, "(Player Name)", {
        fontFamily: "Arial",
        color: "#ADADAD",
        fontSize: "14px",
      })
      .setOrigin(0.5);

    // Create READY button (as a rectangle with text)
    this.skipButton = this.add
      .rectangle(cameraX, this.cameras.main.height - 80, 160, 50, 0x007bff, 0.2)
      .setStrokeStyle(2, 0xffffff)
      .on("pointerdown", () => {
        console.log("Ready button clicked by: " + this.socket.id);

        this.socket.emit("playerReady", this.roomID, this.socket.id);

        this.skipButton.destroy();
        skipText.destroy();
      })
      .on("pointerover", () => {
        this.skipButton.setFillStyle(0x007bff, 0.5);
      })
      .on("pointerout", () => {
        this.skipButton.setFillStyle(0x007bff, 0.2);
      });
    const skipText = this.add
      .text(cameraX, this.cameras.main.height - 80, "Skip Waiting", {
        fontFamily: "Arial",
        color: "#ffffff",
        fontSize: "18px",
      })
      .setOrigin(0.5);
    const votesToSkip = 0;
    const neededVotes = this.connectedPlayers - 1 || 2;
    this.add
      .text(
        canvasWidth / 2,
        canvasHeight - 120,
        `Need ${votesToSkip}/${neededVotes} to skip waiting.`,
        {
          fontFamily: "Arial",
          fontSize: "14px",
          color: "#ffffff",
        },
      )
      .setOrigin(0.5, 0.5)
      .setAlpha(0);

    this.add
      .text(canvasWidth / 2, cameraY - 300, "Waiting for other players...", {
        fontFamily: "Arial",
        fontSize: "24px",
        color: "#ffffff",
      })
      .setOrigin(0.5, 0.5);

    // +---------------------------+
    // +---------------------------+
    // |    🔊 SOCKET LISTERNS    |
    // +---------------------------+
    // +---------------------------+
    this.socket.on(
      "playerJoinedWaitingRoom",
      (
        players: {
          socketID: string;
          user: { id: string; user_id: string; username: string };
          potions: {
            id: string;
            devil: number;
            leprechaun: number;
          };
          character: {
            id: number;
            name: string;
            sprite: string;
            created_at: string;
            tier: string;
            color: string;
            luck?: number;
          };
        }[],
      ) => {
        console.log("Players in the room: ", players);
        if (players.length > 2) {
          this.skipButton.setInteractive();
          skipText.setAlpha(1);
          this.connectedPlayers = players.length;
        }

        // Loop through the players array to find the current client
        const currentPlayer = players.find(
          (player) => player.socketID === this.socket.id,
        );
        if (currentPlayer) {
          console.log("Current player information:", currentPlayer);
          this.characterName.setText(currentPlayer.character.name);
          this.playerName.setText(currentPlayer.user.username);
          this.characterImage1
            .setTexture(currentPlayer.character.sprite)
            .setAlpha(1);

          if (currentPlayer.character.color.toLowerCase() === "red") {
            this.playerBox.setStrokeStyle(4, 0xff0000);
          } else if (currentPlayer.character.color.toLowerCase() === "blue") {
            this.playerBox.setStrokeStyle(4, 0x0000ff);
          } else if (currentPlayer.character.color.toLowerCase() === "green") {
            this.playerBox.setStrokeStyle(4, 0x00ff00);
          } else if (currentPlayer.character.color.toLowerCase() === "yellow") {
            this.playerBox.setStrokeStyle(4, 0xffff00);
          } else if (currentPlayer.character.color.toLowerCase() === "purple") {
            this.playerBox.setStrokeStyle(4, 0x800080);
          } else if (currentPlayer.character.color.toLowerCase() === "orange") {
            this.playerBox.setStrokeStyle(4, 0xffa500);
          } else if (currentPlayer.character.color.toLowerCase() === "pink") {
            this.playerBox.setStrokeStyle(4, 0xffc0cb);
          } else if (currentPlayer.character.color.toLowerCase() === "brown") {
            this.playerBox.setStrokeStyle(4, 0xa52a2a);
          } else if (currentPlayer.character.color.toLowerCase() === "black") {
            this.playerBox.setStrokeStyle(4, 0x000000);
          } else if (currentPlayer.character.color.toLowerCase() === "white") {
            this.playerBox.setStrokeStyle(4, 0xffffff);
          } else {
            this.playerBox.setStrokeStyle(4, 0x000000);
          }
        }

        // You could also update the opponent boxes with other players' information
        const otherPlayers = players.filter(
          (player) => player.socketID !== this.socket.id,
        );
        console.log("Other players in room:", otherPlayers);

        // Assign opponent objects
        const opponentBoxes = [
          this.opponentBox1,
          this.opponentBox2,
          this.opponentBox3,
          this.opponentBox4,
          this.opponentBox5,
        ];
        const opponentNames = [
          this.opponentName1,
          this.opponentName2,
          this.opponentName3,
          this.opponentName4,
          this.opponentName5,
        ];
        const oppCharacterNames = [
          this.oppCharacterName1,
          this.oppCharacterName2,
          this.oppCharacterName3,
          this.oppCharacterName4,
          this.oppCharacterName5,
        ];
        const characterImages = [
          this.characterImage2,
          this.characterImage3,
          this.characterImage4,
          this.characterImage5,
          this.characterImage6,
        ];

        otherPlayers.forEach((player, index) => {
          if (index < opponentBoxes.length) {
            opponentNames[index].setText(player.user.username);
            oppCharacterNames[index].setText(player.character.name);
            characterImages[index]
              .setTexture(player.character.sprite)
              .setAlpha(1);

            if (player.character.color.toLowerCase() === "red") {
              opponentBoxes[index].setStrokeStyle(4, 0xff0000);
            } else if (player.character.color.toLowerCase() === "blue") {
              opponentBoxes[index].setStrokeStyle(4, 0x0000ff);
            } else if (player.character.color.toLowerCase() === "green") {
              opponentBoxes[index].setStrokeStyle(4, 0x00ff00);
            } else if (player.character.color.toLowerCase() === "yellow") {
              opponentBoxes[index].setStrokeStyle(4, 0xffff00);
            } else if (player.character.color.toLowerCase() === "purple") {
              opponentBoxes[index].setStrokeStyle(4, 0x800080);
            } else if (player.character.color.toLowerCase() === "orange") {
              opponentBoxes[index].setStrokeStyle(4, 0xffa500);
            } else if (player.character.color.toLowerCase() === "pink") {
              opponentBoxes[index].setStrokeStyle(4, 0xffc0cb);
            } else if (player.character.color.toLowerCase() === "brown") {
              opponentBoxes[index].setStrokeStyle(4, 0xa52a2a);
            } else if (player.character.color.toLowerCase() === "black") {
              opponentBoxes[index].setStrokeStyle(4, 0x000000);
            } else if (player.character.color.toLowerCase() === "white") {
              opponentBoxes[index].setStrokeStyle(4, 0xffffff);
            } else {
              opponentBoxes[index].setStrokeStyle(4, 0x000000);
            }
          }
        });
      },
    );

    EventBus.emit("current-scene-ready", this);
  }

  update() {}
}
