// One command starts Sinatra/Puma and Next.js, and stops both on exit.
import { fileURLToPath } from "node:url";
import { ensureRuby, spawnCommand, stopProcess } from "./ruby-service.mjs";

let ruby;
let next;
let stopping = false;

function shutdown(code = 0) {
  if (stopping) return;
  stopping = true;
  stopProcess(next);
  stopProcess(ruby);
  process.exitCode = code;
}

process.on("SIGINT", () => shutdown());
process.on("SIGTERM", () => shutdown());

try {
  ruby = await ensureRuby();
  const arguments_ = process.argv.slice(2);
  const production = arguments_.includes("--production");
  const nextPath = fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url));
  next = spawnCommand(process.execPath, [nextPath, production ? "start" : "dev", ...arguments_.filter((argument) => argument !== "--production")]);
  next.on("error", (error) => {
    console.error(error.message);
    shutdown(1);
  });
  next.on("exit", (code) => shutdown(code ?? 1));
  ruby?.on("exit", (code) => {
    if (!stopping) {
      console.error("Layanan Ruby berhenti; frontend dihentikan.");
      shutdown(code || 1);
    }
  });
} catch (error) {
  console.error(error.message);
  shutdown(1);
}
