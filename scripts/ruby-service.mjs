import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";
import { dirname, delimiter, join } from "node:path";
import { createRequire } from "node:module";

export const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const apiDirectory = fileURLToPath(new URL("../apps/api/", import.meta.url));

// Use Next.js' installed environment loader so custom URLs and interpolation
// follow the same precedence in the runner, web server, and integration tests.
const require = createRequire(import.meta.url);
const nextRequire = createRequire(require.resolve("next/package.json"));
const { loadEnvConfig } = nextRequire("@next/env");
const testing = process.argv[1]?.endsWith("with-ruby.mjs");
if (testing && !process.env.NODE_ENV) process.env.NODE_ENV = "test";
loadEnvConfig(projectRoot, !testing && !process.argv.includes("--production") && process.env.NODE_ENV !== "production");

// RUBY_API_URL is read by both the Next.js proxy and Node integration tests.
export function apiAddress() {
  const address = new URL(process.env.RUBY_API_URL ?? "http://127.0.0.1:4567");
  if (!["http:", "https:"].includes(address.protocol)) throw new Error("RUBY_API_URL harus berupa URL HTTP/HTTPS.");
  return address;
}

export async function healthy() {
  try {
    const response = await fetch(new URL("/health", apiAddress()), { signal: AbortSignal.timeout(1000), cache: "no-store" });
    return response.ok;
  } catch {
    return false;
  }
}

export function stopProcess(child) {
  if (!child || child.exitCode !== null) return;
  if (process.platform === "win32") {
    // Only terminate the process tree that this runner started.
    spawn("taskkill", ["/pid", String(child.pid), "/T", "/F"], { stdio: "ignore", windowsHide: true });
  } else child.kill("SIGTERM");
}

export async function ensureRuby({ reuse = true } = {}) {
  if (await healthy()) {
    if (reuse) return null;
    throw new Error(`Alamat Ruby ${apiAddress().origin} sudah dipakai. Hentikan layanan lama atau ganti RUBY_API_URL.`);
  }
  const address = apiAddress();
  if (!["127.0.0.1", "localhost", "[::1]"].includes(address.hostname)) {
    throw new Error(`Layanan Ruby ${address.origin} tidak tersedia. Runner hanya memulai backend pada localhost.`);
  }
  if (address.protocol !== "http:") {
    throw new Error("Backend lokal otomatis memakai HTTP. Untuk HTTPS, jalankan layanan Ruby secara terpisah terlebih dahulu.");
  }
  const gemfile = fileURLToPath(new URL("../apps/api/Gemfile", import.meta.url));
  if (!existsSync(gemfile)) throw new Error("Gemfile backend Ruby belum tersedia pada apps/api.");
  const portableRuby = fileURLToPath(new URL("../.tools/rubyinstaller-3.4.5-1-x64/bin/ruby.exe", import.meta.url));
  const command = process.env.RUBY_COMMAND ?? (existsSync(portableRuby) ? portableRuby : "ruby");
  const localPath = existsSync(command) ? `${dirname(command)}${delimiter}${process.env.PATH ?? ""}` : process.env.PATH;
  // Load Bundler within Ruby to keep paths containing spaces out of RUBYOPT.
  const serveScript = fileURLToPath(new URL("./serve-api.rb", import.meta.url));
  const child = spawn(command, [serveScript, "-C", "config/puma.rb", "config.ru"], {
    cwd: apiDirectory,
    stdio: "inherit",
    windowsHide: true,
    env: { ...process.env, PATH: localPath, BUNDLE_GEMFILE: gemfile, API_HOST: address.hostname, API_PORT: address.port || "80" },
  });
  let startupError;
  child.on("error", (error) => { startupError = error; });
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (startupError || child.exitCode !== null) {
      stopProcess(child);
      throw new Error(`Backend Ruby gagal dimulai. Instal Ruby dan jalankan bundle install di apps/api. ${startupError?.message ?? ""}`);
    }
    if (await healthy()) return child;
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  stopProcess(child);
  throw new Error("Backend Ruby belum siap setelah 30 detik. Periksa instalasi Ruby dan dependensi Bundler.");
}

export function spawnCommand(command, args, options = {}) {
  if (process.platform === "win32" && /^(pnpm|pnpm\.cmd)$/.test(command)) {
    const candidates = [
      process.env.npm_execpath,
      ...(process.env.PATH ?? "").split(delimiter).flatMap((entry) => [
        join(entry, "node_modules/pnpm/bin/pnpm.cjs"),
        join(entry, "node_modules/corepack/dist/pnpm.js"),
        join(entry, "pnpm.cjs"),
      ]),
    ];
    const cli = candidates.find((candidate) => candidate && /pnpm\.(?:cjs|js)$/.test(candidate) && existsSync(candidate));
    if (cli) return spawnCommand(process.execPath, [cli, ...args], options);
  }
  return spawn(command, args, {
    cwd: projectRoot,
    stdio: "inherit",
    windowsHide: true,
    shell: process.platform === "win32" && /^(pnpm|bundle)(\.cmd|\.bat)?$/.test(command),
    ...options,
  });
}
