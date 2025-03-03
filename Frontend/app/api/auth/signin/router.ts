import { NextApiRequest, NextApiResponse } from "next";
import { signIn } from "@/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { provider } = req.body;

    try {
      await signIn(provider, { redirect: false });
      res.status(200).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Guest login failed" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
