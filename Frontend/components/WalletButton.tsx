import { useState, useEffect } from "react";
import { getProvider } from "@/utils/ethersProvider";
import { useRouter } from "next/navigation"; // Use next/navigation instead

interface ConnectWalletProps {
  setWalletConnected: (connected: boolean) => void;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ setWalletConnected }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const router = useRouter(); // Ensure this runs only on the client

  useEffect(() => {
    const provider = getProvider();
    
    const checkIfWalletIsConnected = async () => {
      try {
        const accounts = await provider.send("eth_accounts", []);
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setWalletConnected(true);
        }
      } catch (error) {
        console.error("Failed to check wallet connection:", error);
      }
    };

    checkIfWalletIsConnected();

    provider.on("accountsChanged", (accounts: string[]) => {
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setWalletConnected(true);
      } else {
        setWalletAddress(null);
        setWalletConnected(false);
      }
    });

    return () => {
      provider.removeAllListeners("accountsChanged"); 
    };
  }, [setWalletConnected]);

  const connectWallet = async () => {
    try {
      const provider = getProvider();
      const accounts = await provider.send("eth_requestAccounts", []);
      setWalletAddress(accounts[0]);
      setWalletConnected(true);
      router.push("/Menu");

    } catch (error) {
      console.error("Connection failed:", error);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setWalletConnected(false);
    alert("To fully disconnect, please disconnect from your wallet provider.");
    router.push('/pages/Menu');
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <button
        onClick={walletAddress ? disconnectWallet : connectWallet}
        className={`h-24 w-1/3 cursor-pointer rounded-3xl ${
          walletAddress ? "bg-red-600" : "bg-blue-600"
        }`}
      >
        {walletAddress ? `Connected: ${walletAddress}` : "Connect Wallet"}
      </button>
      {walletAddress && (
        <p className="text-white mt-4">Active Account: {walletAddress}</p>
      )}
    </div>
  );
};

export default ConnectWallet;
