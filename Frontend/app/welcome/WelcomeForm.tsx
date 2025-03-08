"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";

interface WelcomeFormProps {
  session: Session | null;
}

export const WelcomeForm = ({ session }: WelcomeFormProps) => {
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    console.log("Session user:", JSON.stringify(session?.user, null, 2));
  }, [session?.user]);

  const handleSignOut = async () => {
    await signOut();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/mainGame");
  };

  return (
    <div className="flex flex-col space-y-2">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        {!session?.user?.username || session.user.username === "" ? (
          <div>
            <label>Enter Username:</label>
            <Input
              name="username"
              placeholder="username"
              type="text"
              required
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        ) : (
          <p className="text-center">{session?.user?.username}</p>
        )}

        <Button className="w-full" type="submit">
          Play Game
        </Button>
      </form>
      <Button variant="outline" className="w-full" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
};
