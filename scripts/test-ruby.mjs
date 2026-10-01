import { spawn } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, delimiter } from "node:path";
import { fileURLToPath } from "node:url";

const portable = fileURLToPath(new URL("../.tools/rubyinstaller-3.4.5-1-x64/bin/ruby.exe", import.meta.url));
const command = process.env.RUBY_COMMAND ?? (existsSync(portable) ? portable : "ruby");
const api = fileURLToPath(new URL("../apps/api", import.meta.url));
mkdirSync(fileURLToPath(new URL("../evidence", import.meta.url)), { recursive: true });
const runner = fileURLToPath(new URL("./run-rspec.rb", import.meta.url));
const child = spawn(command, [runner, "spec", "--format", "progress", "--format", "json", "--out", "../../evidence/ruby-test-results.json"], {
  cwd: api,
  stdio: "inherit",
  windowsHide: true,
  env: { ...process.env, PATH: existsSync(command) ? `${dirname(command)}${delimiter}${process.env.PATH ?? ""}` : process.env.PATH },
});
child.on("error", (error) => { console.error(`Ruby gagal dimulai: ${error.message}`); process.exitCode = 1; });
child.on("exit", (code) => { process.exitCode = code ?? 1; });
