"use client";

import React, { useEffect, useRef } from "react";

const MainGamePage: React.FC = () => {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("phaser").then((Phaser) => {
        const config: Phaser.Types.Core.GameConfig = {
          type: Phaser.CANVAS,
          width: 400,
          height: 300,
          canvas: canvasRef.current!,
          physics: {
            default: "arcade",
            arcade: {
              gravity: { x: 0, y: 0 },
              debug: false,
            },
          },
          scene: {
            preload: preload,
            create: create,
            update: update,
          },
        };

        const game = new Phaser.Game(config);
        let player: Phaser.GameObjects.Rectangle;
        let cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

        function preload(this: Phaser.Scene) {}

        function create(this: Phaser.Scene) {
          player = this.add.rectangle(50, 150, 50, 50, 0xff0000);
          this.physics.add.existing(player);
          (player.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(
            true,
          );
          cursors = this.input.keyboard?.createCursorKeys();
        }

        function update(this: Phaser.Scene) {
          if (!cursors) return;
          const body = player.body as Phaser.Physics.Arcade.Body;
          if (cursors.left.isDown) body.setVelocityX(-100);
          else if (cursors.right.isDown) body.setVelocityX(100);
          else body.setVelocityX(0);
          if (cursors.up.isDown) body.setVelocityY(-100);
          else if (cursors.down.isDown) body.setVelocityY(100);
          else body.setVelocityY(0);
        }

        return () => {
          game.destroy(true);
        };
      });
    }
  }, []);

  return (
    <div ref={gameContainerRef} className="grid place-items-center h-full">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default MainGamePage;
