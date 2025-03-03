import { ethers } from "ethers";
import contractABI from "../contracts/WokToken.json"; // Adjust path if needed

const contractAddress = "0x6EE3DdE20B0982f12232616B7EB84c11e353DBaA"; // Replace with actual address

export const getContract = (
  providerOrSigner: ethers.Provider | ethers.Signer,
) => {
  return new ethers.Contract(
    contractAddress,
    contractABI.abi,
    providerOrSigner,
  );
};
