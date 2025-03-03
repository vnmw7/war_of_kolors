import { execSync } from "child_process";
import getPort from "get-port";

async function start() {
  try {
    const port = await getPort({ port: 3001 });
    console.log(`Starting Next.js on port ${port}`);
    execSync(`next dev -p ${port} --turbopack`, { stdio: "inherit" });
  } catch (error) {
    console.error("Failed to start dev server:", error);
    process.exit(1);
  }
}

start();
