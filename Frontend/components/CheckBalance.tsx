import { useWallet } from "../context/WalletContext";

const CheckBalance: React.FC = () => {
  const { walletAddress, balance } = useWallet();

  return (
    <div>
      <p>Wallet: {walletAddress || "Not connected"}</p>
      <p>Balance: {balance} WOK</p>
    </div>
  );
};

export default CheckBalance;
