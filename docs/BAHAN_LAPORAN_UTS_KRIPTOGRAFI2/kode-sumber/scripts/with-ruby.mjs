// Run Node checks against the actual Ruby backend. An existing healthy backend
// is reused; a backend started by this runner is cleaned up afterwards.
import { ensureRuby, spawnCommand, stopProcess } from "./ruby-service.mjs";

let ruby;
let command;
let stopping = false;
function shutdown(code = 0) {
  if (stopping) return;
  stopping = true;
  stopProcess(command);
  stopProcess(ruby);
  process.exitCode = code;
}
process.on("SIGINT", () => shutdown());
process.on("SIGTERM", () => shutdown());

try {
  const [executable, ...args] = process.argv.slice(2);
  if (!executable) throw new Error("Sertakan perintah yang akan dijalankan dengan layanan Ruby.");
  ruby = await ensureRuby();
  command = spawnCommand(executable, args);
  command.on("error", (error) => {
    console.error(error.message);
    shutdown(1);
  });
  command.on("exit", (code) => shutdown(code ?? 1));
  ruby?.on("exit", () => {
    if (!stopping) {
      console.error("Backend Ruby berhenti selama pengujian.");
      shutdown(1);
    }
  });
} catch (error) {
  console.error(error.message);
  shutdown(1);
}
