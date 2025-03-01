import { ethers } from "ethers";
import contractABI from "../contracts/WokToken.json"; // Adjust path if needed

const contractAddress = "0x098D02dBf82eA43c1cAdC98b282F8f97046CA566"; // Replace with actual address

export const getContract = (providerOrSigner: ethers.Provider | ethers.Signer) => {
  return new ethers.Contract(contractAddress, contractABI.abi, providerOrSigner);
};
