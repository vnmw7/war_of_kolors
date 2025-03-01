import { useWallet } from "@/context/WalletContext";

export default function Menu() {
  const { walletAddress, balance } = useWallet();

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Welcome to the Menu</h1>
      {walletAddress ? (
        <div className="mt-4">
          <p><strong>Wallet:</strong> {walletAddress}</p>
          <p><strong>Balance:</strong> {balance} ETH</p>
        </div>
      ) : (
        <p>Please connect your wallet.</p>
      )}
    </main>
  );
}
