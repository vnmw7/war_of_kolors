import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class Game extends Scene {
  camera!: Phaser.Cameras.Scene2D.Camera;
  background!: Phaser.GameObjects.Image;
  gameText!: Phaser.GameObjects.Text;

  constructor() {
    super("Game");
  }

  create() {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0x00ff00);

    this.background = this.add.image(512, 384, "background");
    this.background.setAlpha(0.5);

    // this.gameText = this.add
    //   .text(
    //     512,
    //     384,
    //     "Make something fun!\nand share it with us:\nsupport@phaser.io",
    //     {
    //       fontFamily: "Arial Black",
    //       fontSize: 38,
    //       color: "#ffffff",
    //       stroke: "#000000",
    //       strokeThickness: 8,
    //       align: "center",
    //     },
    //   )
    //   .setOrigin(0.5)
    //   .setDepth(100);

    const colors = [0xffff00, 0xff0000, 0x0000ff, 0x00ff00, 0xff00ff, 0x800080];

    const chances = [0.1, 40, 20, 30, 50, 80];

    const box1 = this.add.rectangle(300, 300, 200, 200, colors[1]);
    const box2 = this.add.rectangle(600, 300, 200, 200, colors[1]);
    const box3 = this.add.rectangle(900, 300, 200, 200, colors[1]);

    this.add.rectangle(600, 500, 200, 100, 0xffffff);
    this.add.text(525, 485, "Random Colors", {
      fontSize: "24px",
      color: "#ff0000",
      fontFamily: "Arial",
    });

    setInterval(() => {
      box1.fillColor = RandomColors();
      box2.fillColor = RandomColors();
      box3.fillColor = RandomColors();
    }, 500);

    function RandomColors() {
      const random = Math.random() * 100;

      let cumu = 0;

      for (let i = 0; i < colors.length; i++) {
        cumu += chances[i];
        if (random < cumu) {
          return colors[i];
        }
      }

      return colors[0];
    }

    EventBus.emit("current-scene-ready", this);
  }

  changeScene() {
    this.scene.start("GameOver");
  }
}
