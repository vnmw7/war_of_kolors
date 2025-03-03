import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { User } from "next-auth";

// Extend the NextAuth User type with your additional properties
declare module "next-auth" {
  interface User {
    userID: string;
    accountType: string;
  }
}

export const { auth, signIn, handlers } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        userID: { label: "User ID", type: "text" },
        password: { label: "Password", type: "password" },
        accountType: { label: "Account Type", type: "text" },
      },
      authorize: async (credentials): Promise<User | null> => {
        const userID = "testID";
        const password = "testPassword";
        const accountType = "testAccountType";

        if (
          credentials.userID === userID &&
          credentials.password === password &&
          credentials.accountType === accountType
        ) {
          return { userID, accountType };
        } else {
          console.log("Invalid credentials");
          // throw new Error("Invalid credentials");
          return null;
        }
      },
    }),
  ],
});
