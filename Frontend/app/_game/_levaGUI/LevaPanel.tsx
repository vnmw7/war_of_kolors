"use client";

import { useEffect } from "react";
import { useControls, button } from "leva";
import { updateSettings, defaultSettings } from "./LevaControls";

export function LevaPanel() {
  const values = useControls({
    playerColor: {
      value: defaultSettings.playerColor,
      options: {
        white: "#FFFFFF",
        red: "#FF0000",
        blue: "#0000FF",
        yellow: "#FFFF00",
        green: "#00FF00",
      },
    },
    playerSize: {
      value: defaultSettings.playerSize,
      min: 20,
      max: 100,
      step: 5,
    },
    backgroundColor: {
      value: defaultSettings.backgroundColor,
      label: "Background Alpha",
      options: {
        Transparent: "rgba(0, 0, 0, 0.5)",
        Solid: "rgba(0, 0, 0, 1)",
        Light: "rgba(200, 200, 200, 0.5)",
      },
    },
    isReady: {
      value: defaultSettings.isReady,
      label: "Ready",
    },
    startGame: button(() => {
      console.log("Starting game!");
      updateSettings({ isReady: true });
    }),
  });

  useEffect(() => {
    updateSettings(values);
  }, [values]);

  return null; // Leva creates its own UI, so we don't need to render anything here
}
