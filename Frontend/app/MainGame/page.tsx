"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import type { IRefPhaserGame } from "../_game/PhaserGame";
import { useWallet } from "@/context/WalletContext";

// Dynamically import PhaserGame with SSR disabled
const PhaserGame = dynamic(
  () => import("../_game/PhaserGame").then((mod) => mod.PhaserGame),
  { ssr: false },
);

function App() {
  const { walletAddress, balance } = useWallet();

  //  References to the PhaserGame component (game and scene are exposed)
  const phaserRef = useRef<IRefPhaserGame | null>(null);

  return (
    <div id="app" className="relative">
      {walletAddress ? (
        <div className="absolute top-0 left-0 z-50">
          <p className="mb-2 text-4xl">
            Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </p>
          <p className="mb-4 text-4xl">Balance: {balance} tokens</p>
        </div>
      ) : (
        <p className="absolute top-0 left-0 z-50 text-4xl">
          Please connect your wallet to continue
        </p>
      )}
      <PhaserGame ref={phaserRef} />
    </div>
  );
}

export default App;
