import { useState } from "react";
import { useWallet } from "../context/WalletContext";

const SendTokens: React.FC = () => {
  const { sendTokens } = useWallet();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Recipient Address"
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        type="text"
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={() => sendTokens(recipient, amount)}>Send Tokens</button>
    </div>
  );
};

export default SendTokens;
