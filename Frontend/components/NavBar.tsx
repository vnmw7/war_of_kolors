"use client";

import { useState, useEffect } from "react";
import { getProvider } from "@/utils/ethersProvider";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const provider = getProvider();

    const fetchWalletInfo = async () => {
      try {
        const accounts = await provider.send("eth_accounts", []);
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);

          // Get balance
          const balanceWei = await provider.getBalance(accounts[0]);
          setBalance(ethers.formatEther(balanceWei));
        }
      } catch (error) {
        console.error("Failed to get wallet info:", error);
      }
    };

    fetchWalletInfo();

    provider.on("accountsChanged", (accounts: string[]) => {
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        provider.getBalance(accounts[0]).then((balanceWei) => {
          setBalance(ethers.formatEther(balanceWei));
        });
      } else {
        setWalletAddress(null);
        setBalance(null);
        router.push("/"); // Redirect to home if disconnected
      }
    });

    return () => {
      provider.removeAllListeners("accountsChanged");
    };
  }, [router]);

  return (
    <nav className="w-full bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="text-lg">My DApp</h1>
      {walletAddress ? (
        <div className="flex items-center gap-4">
          <p>Balance: {balance} ETH</p>
          <p className="truncate w-40">{walletAddress}</p>
        </div>
      ) : (
        <p>Not Connected</p>
      )}
    </nav>
  );
};

export default Navbar;
