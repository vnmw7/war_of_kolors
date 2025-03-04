"use server";

import { signIn } from "@/lib/auth";
// import { v4 as uuidv4 } from "uuid";
import { executeAction } from "@/lib/executeAction";

export async function metaMaskSignInAction() {
  return await executeAction({
    actionFn: async () => {
      await signIn("credentials", {
        userID: "testID",
        password: "testPassword",
        accountType: "testAccountType",
      });
    },
  });
}
