// import { signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { MetaMaskSVG } from "@/components/ui/metaMaskSVG";

const MetaMaskSignIn = () => {
  return (
    <Button className="w-full" variant="default">
      <MetaMaskSVG height={32} width={32} />
      Continue with MetaMask
    </Button>
  );
};

export { MetaMaskSignIn };
