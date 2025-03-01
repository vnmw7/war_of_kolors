"use client"; // ✅ Required for client components

import { useState } from "react";
import ConnectWallet from "@/components/WalletButton";
import CheckBalance from "@/components/CheckBalance"; // Ensure this is a valid component

export default function Home() {
  const [walletConnect, setWalletConnected] = useState(false);

  return (
    <main className="w-screen h-screen flex flex-wrap">
      <ConnectWallet setWalletConnected={setWalletConnected} />
      {/* {walletConnect && <CheckBalance />} */}
    </main>
  );
}
