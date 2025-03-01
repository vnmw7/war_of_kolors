// app/MainGame/Game.tsx
"use client";

import React, { useEffect, useRef } from "react";
import TestGameScene1 from "../_scenes/TestGameScene1";
import TestGameScene2 from "../_scenes/TestGameScene2";
import * as Phaser from "phaser";

const Game: React.FC = () => {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // NO Phaser-related variables declared here!

  useEffect(() => {
    let game: Phaser.Game | null = null; // Declare inside useEffect

    if (!canvasRef.current) {
      console.error("canvasRef.current is null!");
      return;
    }

    try {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.CANVAS,
        width: 1280,
        height: 720,
        canvas: canvasRef.current,
        physics: {
          default: "arcade",
          arcade: {
            gravity: { x: 0, y: 0 },
            debug: false,
          },
        },
        scene: [],
      };

      game = new Phaser.Game(config); // Initialize inside useEffect

      const gameScene1 = new TestGameScene1();
      game.scene.add("TestGameScene1", gameScene1);
      const gameScene2 = new TestGameScene2();
      game.scene.add("TestGameScene2", gameScene2);
      game.scene.start("TestGameScene1");
    } catch (error) {
      console.error("Error initializing Phaser:", error);
    }

    return () => {
      if (game) {
        game.destroy(true);
      }
    };
  }, []);

  return (
    <div ref={gameContainerRef} className="w-full h-full bg-gray-200">
      <p>This is inside the Game component.</p>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Game;
