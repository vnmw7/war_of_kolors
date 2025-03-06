import { EventBus } from "../EventBus";

// Interface for settings that can be modified by Leva GUI
export interface GameSettings {
  playerColor: string;
  playerSize: number;
  backgroundColor: string;
  isReady: boolean;
}

// Default settings
export const defaultSettings: GameSettings = {
  playerColor: "#FFFFFF",
  playerSize: 50,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  isReady: false,
};

// Current settings instance
export let currentSettings: GameSettings = { ...defaultSettings };

// Function to update settings from Leva GUI
export function updateSettings(settings: Partial<GameSettings>) {
  currentSettings = { ...currentSettings, ...settings };

  // Emit events that the Phaser game can listen to
  if ("playerColor" in settings) {
    EventBus.emit("leva-player-color-changed", settings.playerColor);
  }

  if ("playerSize" in settings) {
    EventBus.emit("leva-player-size-changed", settings.playerSize);
  }

  if ("backgroundColor" in settings) {
    EventBus.emit("leva-background-color-changed", settings.backgroundColor);
  }

  if ("isReady" in settings) {
    EventBus.emit("leva-ready-state-changed", settings.isReady);
  }
}

// Initialize Leva (called from React component)
export function initLevaControls() {
  // This is just a placeholder - actual Leva panel setup happens in React components
  console.log("Leva controls initialized");
}
