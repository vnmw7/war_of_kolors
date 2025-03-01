import { useWallet } from "../context/WalletContext";

const CheckBalance: React.FC = () => {
  const { walletAddress, balance } = useWallet();

  return (
    <div className="w-full  flex items-center flex-col">
      <p>Wallet: {walletAddress || "Not connected"}</p>
      <p>Your Balance: {balance} WOK</p>
    </div>
  );
};

export default CheckBalance;
