import { auth } from "@/lib/auth";
import { GithubSignIn } from "@/components/auth/github-sign-in";
import { redirect } from "next/navigation";
import { GuestSignIn } from "@/components/auth/GuestSignIn";

const Page = async () => {
  const session = await auth();
  if (session) redirect("/");

  return (
    <div className="w-full max-w-sm mx-auto space-y-6 h-screen grid place-content-center">
      <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>

      <GithubSignIn />
      <GuestSignIn />
    </div>
  );
};

export default Page;
