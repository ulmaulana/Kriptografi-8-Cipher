// Menyusun ulang bahan laporan dari sumber dan hasil eksekusi yang tersedia.
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const target = path.resolve(root, "docs/BAHAN_LAPORAN_UTS_KRIPTOGRAFI");
if (!target.startsWith(`${path.resolve(root)}${path.sep}`)) throw new Error("Bahan laporan harus berada dalam repositori.");
mkdirSync(target, { recursive: true });
const generatedAt = new Date().toISOString();
const generatedWib = new Intl.DateTimeFormat("id-ID", { timeZone: "Asia/Jakarta", dateStyle: "long", timeStyle: "short" }).format(new Date());
const readJson = (file) => {
  try { return JSON.parse(readFileSync(path.join(root, file), "utf8")); }
  catch { return null; }
};
const filesEvidence = readJson("evidence/file-scenarios.json");
const textEvidence = readJson("evidence/text-examples.json");
const rubyEvidence = readJson("evidence/ruby-test-results.json");
const unitEvidence = readJson("evidence/unit-test-results.json");
const e2eEvidence = readJson("evidence/e2e-results.json");
const formatEvidence = readJson("evidence/format-checks.json");
const currentFiles = filesEvidence?.engine === "Ruby via HTTP" ? filesEvidence.scenarios ?? [] : [];
const currentTexts = textEvidence?.engine === "Ruby via HTTP" ? textEvidence.examples ?? [] : [];
const algorithms = [
  ["vigenere", "Vigenere standar"], ["autokey", "Auto-Key Vigenere"],
  ["extended-vigenere", "Extended Vigenere"], ["playfair", "Playfair"],
  ["affine", "Affine"], ["hill", "Hill"], ["super", "Super Enkripsi"], ["enigma-i", "Bonus Enigma Cipher"],
];
const testsInSuites = (suites) => (suites ?? []).flatMap((suite) => [
  ...(suite.specs ?? []).map((spec) => ({ title: spec.title, ok: spec.ok, tests: spec.tests ?? [] })),
  ...testsInSuites(suite.suites),
]);
const browserSpecs = testsInSuites(e2eEvidence?.suites);
const currentBrowser = browserSpecs.some((spec) => spec.title.includes("enigma-i"));
const browserSummary = currentBrowser && e2eEvidence?.stats
  ? `${e2eEvidence.stats.expected} lulus, ${e2eEvidence.stats.unexpected} gagal, ${e2eEvidence.stats.skipped} dilewati. Waktu mulai: ${e2eEvidence.stats.startTime}.`
  : "Hasil browser untuk versi delapan cipher belum tersedia. Hasil lama tidak membuktikan integrasi Ruby.";
const rubySummary = rubyEvidence?.summary
  ? `${rubyEvidence.summary.example_count} contoh, ${rubyEvidence.summary.failure_count} kegagalan, ${rubyEvidence.summary.pending_count} pending.`
  : "Hasil RSpec belum tersedia.";
const unitSummary = unitEvidence && JSON.stringify(unitEvidence).includes("migration-compatibility")
  ? `${unitEvidence.numPassedTests} lulus, ${unitEvidence.numFailedTests} gagal, ${unitEvidence.numPendingTests} pending.`
  : "Hasil Vitest setelah migrasi belum tersedia.";
const alphabetVectors = [
  ["Vigenere", "ATTACKATDAWN / LEMON", "LXFOPVEFRNHR"],
  ["Auto-Key", "ATTACKATDAWN / QUEENLY", "QNXEPVYTWTWP"],
  ["Playfair", "HIDETHEGOLDINTHETREESTUMP / PLAYFAIREXAMPLE", "BMODZBXDNABEKUDMUIXMMOUVIF"],
  ["Affine", "AFFINECIPHER / a=5,b=8", "IHHWVCSWFRCP"],
  ["Hill", "ACT / matriks TV-06", "POH"],
  ["Enigma I", "AAAAA / I-II-III,01-01-01,AAA,B,tanpa plugboard", "BDZGO"],
  ["Enigma I", "HELLOWORLD / konfigurasi awal yang sama", "ILBDAAMTAZ"],
];

const summary = [
  "# Bahan Laporan UTS Kriptografi", "",
  "Aplikasi menyediakan tujuh cipher wajib serta Bonus Enigma Cipher. Mesin delapan cipher, codec file, validasi, dan kontainer menggunakan Ruby. Antarmuka memakai Next.js dan React.", "",
  `Bahan disusun ulang pada ${generatedWib} WIB (${generatedAt}) dari kode dan berkas hasil yang tersedia. Status hanya berasal dari hasil eksekusi. Kode lengkap ada pada \`01-LAMPIRAN_KODE_PROGRAM.md\`.`, "",
  "## Arsitektur dan cara menjalankan", "",
  "Browser mengirim teks atau byte file ke route Next.js. Route meneruskan operasi ke Sinatra/Puma. Ruby memvalidasi kunci, menjalankan algoritma, membentuk atau membaca kontainer, dan memeriksa hasil dekripsi. Browser menampilkan hasil dan membuat Blob untuk unduhan. Gangguan Ruby menjadi kesalahan tanpa mesin cipher browser sebagai pengganti.", "",
  "Jalankan `pnpm install`, lalu `bundle install` dari `apps/api`, kemudian `pnpm dev` dari root. Frontend tersedia pada localhost:3000 dan Ruby pada 127.0.0.1:4567. README menjelaskan runtime, variabel, build, dan kontrak API lengkap.", "",
  "## Konvensi teks, file, dan kontainer", "",
  "Teks alfabet hanya mempertahankan ASCII A sampai Z setelah normalisasi. Enigma mempertahankan I dan J sebagai huruf berbeda. File utuh mempertahankan semua byte termasuk header. Enam cipher alfabet memakai codec alpha25-v1, sedangkan Extended Vigenere dan Super Enkripsi bekerja langsung pada byte.", "",
  "Paket `.dat` memakai UTSKRIPT versi 1, panjang metadata big endian, JSON UTF-8, dan payload biner. Metadata menyimpan mode, codec, ukuran, SHA-256, nama file, serta penanda pemulihan Playfair/Hill yang diperlukan. Kunci dan salinan plainteks tidak disimpan. ID tujuh cipher lama tidak berubah, dan Enigma memakai `enigma-i`.", "",
  "Base64 plainteks, payload cipherteks, dan paket lengkap memiliki tujuan berbeda. Kapitalisasi Base64 dipertahankan. SHA-256 memeriksa kesamaan hasil dan bukan bukti autentikasi.", "",
  "## Bonus Enigma dan Ruby", "",
  "Enigma I memakai tiga rotor berbeda dari I sampai V, ring setting 01 sampai 26, posisi awal A sampai Z, reflector B/C, dan nol sampai 13 pasangan plugboard. Urutan konfigurasi adalah kiri, tengah, kanan. Rotor bergerak sebelum huruf. Kondisi notch dibaca sebelum gerak, sehingga double stepping ADU → ADV → AEW → BFX berjalan benar. Ring mengubah offset wiring tanpa menggeser lagi notch jendela. Dekripsi memulai konfigurasi awal yang sama.", "",
  "Ruby menjalankan kedelapan algoritma melalui fungsi yang sama dengan pengujian RSpec. Pengujian API, Vitest integrasi, evidence, dan browser memakai layanan nyata. Empat belas paket dari TypeScript sebelum migrasi dibekukan dalam tests/migration untuk pemeriksaan kompatibilitas.", "",
  "## Vektor acuan", "",
  "Tabel ini berisi nilai acuan tetap dari PRD, bukan klaim hasil pengujian.", "",
  "| Cipher | Masukan dan kunci | Cipherteks acuan |", "| --- | --- | --- |",
  ...alphabetVectors.map(([cipher, input, output]) => `| ${cipher} | ${input} | ${output} |`), "",
  "Extended Vigenere memakai byte [0,65,255] dan kunci [1,2] dengan keluaran [1,67,0]. Super Enkripsi memakai byte [0,1,2,3,254,255,128], kunci byte [1,2], dan kunci kolom BABA dengan keluaran [3,1,5,1,255,3,129].", "",
  "## Hasil pengujian aktual", "",
  `RSpec: ${rubySummary}`, "", `Vitest: ${unitSummary}`, "", `Playwright: ${browserSummary}`, "",
  `Evidence Ruby: ${currentFiles.length} skenario file tersedia, ${currentFiles.filter((row) => row.result === "LULUS").length} lulus. ${currentTexts.length} contoh teks tersedia. Sasaran penerimaan adalah 40 skenario file dan delapan contoh teks.`, "",
  formatEvidence && currentFiles.length === 40 && formatEvidence.generatedAt >= filesEvidence.generatedAt ? `Pemeriksaan format: ${formatEvidence.passed} dari ${formatEvidence.checked} file lulus pada ${formatEvidence.generatedAt}.` : "Hasil pemeriksaan format setelah 40 skenario Ruby belum tersedia.", "",
  "| Algoritma | Skenario file aktual | Lulus | Contoh teks |", "| --- | --- | --- | --- |",
  ...algorithms.map(([id, name]) => {
    const rows = currentFiles.filter((row) => row.algorithm === id);
    const text = currentTexts.find((row) => row.algorithm === id);
    return `| ${name} | ${rows.length} | ${rows.filter((row) => row.result === "LULUS").length} | ${text?.result ?? "Belum tersedia"} |`;
  }), "",
  "Rincian ukuran, parameter uji, checksum, dan hasil tersedia di `evidence/file-scenarios.json`. Contoh plainteks, payload, paket Base64, serta hasil pemulihan tersedia di `evidence/text-examples.json`. Gunakan generatedAt pada setiap berkas untuk memastikan bukti berasal dari versi yang sedang dibahas.", "",
  "## Tabel penilaian", "",
  "Tanda keberhasilan berikut hanya diberikan ketika pasangan file dan teks tersedia. Penilaian final juga harus memeriksa hasil Ruby dan browser di atas.", "",
  "| No | Spek | Berhasil | Kurang Berhasil | Keterangan |", "| --- | --- | --- | --- | --- |",
  ...algorithms.map(([id, name], i) => {
    const rows = currentFiles.filter((row) => row.algorithm === id);
    const text = currentTexts.find((row) => row.algorithm === id);
    const complete = rows.length === 5 && rows.every((row) => row.result === "LULUS") && text?.result === "LULUS";
    return `| ${i + 1} | ${name} | ${complete ? "✓" : ""} | ${rows.some((row) => row.result !== "LULUS") || text?.result === "GAGAL" ? "✓" : ""} | ${complete ? "Lima file dan contoh teks pulih melalui Ruby" : "Bukti lengkap belum tersedia atau perlu diperiksa"} |`;
  }),
  `| 9 | Bonus bahasa Ruby | ${currentFiles.length === 40 && currentFiles.every((row) => row.result === "LULUS") && rubyEvidence?.summary?.example_count > 0 && rubyEvidence?.summary?.failure_count === 0 && currentBrowser && e2eEvidence.stats.unexpected === 0 ? "✓" : ""} | | Dinilai dari kode Ruby, RSpec, API, 40 pasangan file, dan alur browser aktual |`, "",
  "## Screenshot dan kode sumber", "",
  "Screenshot aktual di `evidence/screenshots` dihasilkan oleh Playwright. Screenshot Enigma meliputi teks, file, dan kesalahan plugboard. Screenshot sebelum migrasi serta ZIP lama merupakan arsip versi TypeScript dan tidak membuktikan bonus terbaru.", "",
  "| Berkas | Isi |", "| --- | --- |",
  "| evidence/screenshots/01-tampilan-utama.png | Halaman utama dengan pemilih delapan cipher |",
  "| evidence/screenshots/teks-enigma-i-enkripsi.png | Formulir Enigma, konfigurasi awal, dan hasil teks |",
  "| evidence/screenshots/teks-enigma-i-dekripsi.png | Pemulihan teks Enigma pada konteks baru |",
  "| evidence/screenshots/file-enigma-i-enkripsi.png | Enkripsi gambar melalui Enigma |",
  "| evidence/screenshots/file-enigma-i-dekripsi.png | Pemulihan file dengan ukuran dan SHA-256 cocok |",
  "| evidence/screenshots/validasi-enigma-plugboard.png | Plugboard berulang ditolak |", "",
  "Lampiran kode dihasilkan dari berkas aplikasi yang tersedia ketika generator berjalan. Jalankan ulang `node scripts/generate-report-materials.mjs` setelah perubahan implementasi atau hasil pengujian. Arsip ZIP lama tidak diperbarui otomatis oleh generator.", "",
];
writeFileSync(path.join(target, "00-BAHAN_LAPORAN_UTS_KRIPTOGRAFI.md"), summary.join("\n"));

const sourceFiles = [];
const walk = (directory, accept) => {
  if (!existsSync(path.join(root, directory))) return;
  for (const entry of readdirSync(path.join(root, directory), { withFileTypes: true })) {
    const relative = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (!["vendor", ".bundle", "node_modules", ".git"].includes(entry.name)) walk(relative, accept);
    } else if (entry.isFile() && accept(relative)) sourceFiles.push(relative.replaceAll("\\", "/"));
  }
};
walk("src", (file) => /\.(ts|tsx|css|svg)$/.test(file));
walk("apps/api", (file) => /\.(rb|ru|py|json)$/.test(file) || ["Gemfile", "Gemfile.lock", ".ruby-version"].includes(path.basename(file)));
walk("tests", (file) => /\.(ts|json|md)$/.test(file));
walk("scripts", (file) => /\.(mjs|py|rb)$/.test(file));
for (const file of ["README.md", "CLAUDE.md", "docs/catatan-teknis.md", "package.json", "tsconfig.json", "next.config.ts", "eslint.config.mjs", "vitest.config.ts", "vitest.evidence.config.ts", "playwright.config.ts", ".gitignore", ".env.example"]) {
  if (existsSync(path.join(root, file))) sourceFiles.push(file);
}
sourceFiles.sort();
const code = ["# Lampiran Kode Program", "", `Disusun pada ${generatedWib} WIB (${generatedAt}) dari kode frontend Next.js dan backend Ruby. Dependensi dikunci pada pnpm-lock.yaml dan apps/api/Gemfile.lock di repositori. Berkas konfigurasi pribadi, runtime lokal, node_modules, dan vendor tidak dimuat.`, "", "## Daftar berkas", "", "| No | Berkas | Jumlah baris |", "| --- | --- | --- |"];
for (const [index, file] of sourceFiles.entries()) {
  const contents = readFileSync(path.join(root, file), "utf8");
  code.push(`| ${index + 1} | ${file} | ${contents.split("\n").length} |`);
}
for (const file of sourceFiles) {
  const contents = readFileSync(path.join(root, file), "utf8");
  const longestFence = Math.max(2, ...(contents.match(/`+/g) ?? []).map((match) => match.length));
  const fence = "`".repeat(longestFence + 1);
  const extension = path.extname(file).slice(1);
  const language = ["rb", "ru"].includes(extension) || path.basename(file) === "Gemfile" ? "ruby" : extension === "mjs" ? "javascript" : extension;
  code.push("", `## ${file}`, "", `${fence}${language}`, contents.trimEnd(), fence);
}
code.push("");
writeFileSync(path.join(target, "01-LAMPIRAN_KODE_PROGRAM.md"), code.join("\n"));
console.log(`Bahan laporan diperbarui: ${sourceFiles.length} berkas sumber, ${currentFiles.length} skenario file Ruby aktual.`);
