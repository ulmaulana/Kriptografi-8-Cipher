// Memeriksa pnpm-lock.yaml terhadap security/malicious-packages.txt.
// Keluar dengan kode 1 bila ada versi paket terlarang yang ter-resolve.
import { readFileSync } from "node:fs";

const deny = new Set(
  readFileSync("security/malicious-packages.txt", "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#")),
);

const lock = readFileSync("pnpm-lock.yaml", "utf8");
// Entri paket pada lockfile pnpm v9: "  name@version:" atau "  'name@version':"
// dengan kemungkinan sufiks peer "(peer@x)".
const resolved = new Set();
for (const match of lock.matchAll(/^\s{2}'?(@?[^@\s'(]+(?:\/[^@\s'(]+)?)@([^\s'(:]+)/gm)) {
  resolved.add(`${match[1]}@${match[2]}`);
}

const hits = [...resolved].filter((entry) => deny.has(entry));
console.log(`Paket ter-resolve: ${resolved.size}. Entri denylist: ${deny.size}.`);
if (hits.length > 0) {
  console.error("DITEMUKAN paket terlarang:");
  for (const hit of hits) console.error(`  ${hit}`);
  process.exit(1);
}
console.log("Tidak ada versi terlarang pada pnpm-lock.yaml.");
