"use client"; // ✅ Required for client components

import { useState } from "react";
import ConnectWallet from "@/components/WalletButton";
import CheckBalance from "@/components/CheckBalance"; // Ensure this is a valid component

export default function Home() {
  const [walletConnect, setWalletConnected] = useState(false);

  return (
    <main className="w-screen h-screen flex flex-wrap">
      <ConnectWallet setWalletConnected={setWalletConnected} />
      {walletConnect && <CheckBalance />}
      <div className="w-full flex flex-col items-center justify-center">
        <button
          className={`h-24 w-1/3 cursor-pointer rounded-3xl bg-neutral-500
          }`}
        >
          Continue as a Guest
        </button>
      </div>
    </main>
  );
}
