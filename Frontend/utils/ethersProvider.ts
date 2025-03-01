import { ethers, BrowserProvider } from "ethers";

export const getProvider = (): BrowserProvider => {
  if (typeof window !== "undefined" && window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum as any); // Type assertion
  }
  throw new Error("No Ethereum provider found. Install MetaMask.");
};

export const getSigner = async () => {
  const provider = getProvider();
  return await provider.getSigner();
};
