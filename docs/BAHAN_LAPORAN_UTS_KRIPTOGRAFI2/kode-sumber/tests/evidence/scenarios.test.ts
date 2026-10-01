// Skenario bukti untuk laporan (PRD 9.3 dan 10). Menjalankan 8 cipher x 5
// fixture pada mode file utuh, ditambah satu contoh teks per cipher. Semua
// nilai pada berkas bukti berasal dari eksekusi ini. Checksum dan perbandingan
// byte dihitung dengan node:crypto dan Buffer, bukan dengan kode produksi.

import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { afterAll, describe, expect, it } from "vitest";
import { parseContainer } from "@/lib/container/format";
import { CIPHER_IDS, CIPHERS, type CipherId, isAlphaCipher } from "@/lib/crypto/ciphers";
import { decryptMessage } from "@/lib/engine/decrypt";
import { encryptMessage } from "@/lib/engine/encrypt";
import type { KeyFormValues } from "@/lib/validation/keys";
import { keys, TEST_KEYS } from "../unit/helpers";

const EVIDENCE = "evidence";
const SAMPLES = path.join(EVIDENCE, "samples");
const FIXTURES = [
  { file: "teks-contoh.txt", type: "text/plain", kind: "Teks" },
  { file: "gambar-contoh.png", type: "image/png", kind: "Gambar" },
  { file: "database-contoh.sqlite", type: "application/vnd.sqlite3", kind: "Database" },
  { file: "audio-contoh.wav", type: "audio/wav", kind: "Audio" },
  { file: "video-contoh.webm", type: "video/webm", kind: "Video" },
];

const sha256 = (bytes: Uint8Array) => createHash("sha256").update(bytes).digest("hex");

function keyParams(cipher: CipherId, k: KeyFormValues): Record<string, string> {
  switch (cipher) {
    case "vigenere":
    case "playfair":
      return { kataKunci: k.keyword };
    case "autokey":
      return { primer: k.keyword };
    case "extended-vigenere":
      return { kunciByte: k.byteKey, formatKunci: k.byteKeyFormat };
    case "affine":
      return { a: k.affineA, b: k.affineB };
    case "hill":
      return { matriks: k.hillMatrix.replace(/\n/g, "; ") };
    case "super":
      return { kunciByte: k.byteKey, formatKunci: k.byteKeyFormat, kunciKolom: k.columnKey };
    case "enigma-i":
      return {
        rotors: (k.rotors ?? ["I", "II", "III"]).join(" "),
        ringSettings: (k.ringSettings ?? [1, 1, 1]).join(" "),
        initialPositions: (k.initialPositions ?? ["A", "A", "A"]).join(""),
        reflector: k.reflector ?? "B",
        plugboard: k.plugboard ?? "",
      };
  }
}

interface FileScenario {
  no: number;
  algorithm: CipherId;
  algorithmName: string;
  mode: "file";
  codec: string;
  parameters: Record<string, string>;
  fileKind: string;
  fixture: string;
  originalSize: number;
  containerSize: number;
  payloadSize: number;
  decryptedSize: number;
  originalSha256: string;
  decryptedSha256: string;
  containerSha256: string;
  byteIdentical: boolean;
  headerChanged: boolean;
  encryptedFile: string;
  decryptedFile: string;
  result: "LULUS" | "GAGAL";
}

const scenarios: FileScenario[] = [];
const textExamples: Array<Record<string, unknown>> = [];

const resolvedSamples = path.resolve(SAMPLES);
const workspace = path.resolve(".");
if (!resolvedSamples.startsWith(`${workspace}${path.sep}`) || path.dirname(resolvedSamples) !== path.resolve(EVIDENCE)) {
  throw new Error("Skenario bukti hanya boleh mengganti evidence/samples di dalam repositori.");
}
rmSync(resolvedSamples, { recursive: true, force: true });
mkdirSync(SAMPLES, { recursive: true });

describe("40 skenario file Ruby (8 cipher x 5 jenis file)", () => {
  for (const cipher of CIPHER_IDS) {
    for (const fx of FIXTURES) {
      it(`${cipher} - ${fx.file}`, async () => {
        const health = await fetch(`${process.env.RUBY_API_URL ?? "http://127.0.0.1:4567"}/health`);
        expect(health.ok).toBe(true);
        const original = new Uint8Array(readFileSync(path.join("fixtures", fx.file)));
        const key = TEST_KEYS[cipher];
        const enc = await encryptMessage({
          cipher,
          key,
          input: { kind: "file", bytes: original, name: fx.file, type: fx.type, readAs: "bytes" },
        });
        const dir = path.join(SAMPLES, cipher);
        mkdirSync(dir, { recursive: true });
        const encryptedFile = path.join(dir, `${fx.file}.dat`);
        writeFileSync(encryptedFile, enc.container);

        // Sesi baru: paket dibaca kembali dari disk, kunci dibuat ulang dari nilai tercatat.
        const fromDisk = new Uint8Array(readFileSync(encryptedFile));
        const dec = await decryptMessage({ kind: "package", container: fromDisk, key: JSON.parse(JSON.stringify(key)) });
        const decryptedFile = path.join(dir, `pulih-${dec.fileName}`);
        writeFileSync(decryptedFile, dec.bytes);
        const restored = readFileSync(decryptedFile);

        const payload = parseContainer(fromDisk).payload;
        const identical = Buffer.from(restored).equals(Buffer.from(original));
        // Header file asal (16 byte pertama) tidak muncul apa adanya di dalam payload.
        const header = Buffer.from(original.subarray(0, 16));
        const headerChanged = Buffer.from(payload).indexOf(header) === -1;
        scenarios.push({
          no: scenarios.length + 1,
          algorithm: cipher,
          algorithmName: CIPHERS[cipher].name,
          mode: "file",
          codec: enc.metadata.codec,
          parameters: keyParams(cipher, key),
          fileKind: fx.kind,
          fixture: fx.file,
          originalSize: original.length,
          containerSize: fromDisk.length,
          payloadSize: payload.length,
          decryptedSize: restored.length,
          originalSha256: sha256(original),
          decryptedSha256: sha256(restored),
          containerSha256: sha256(fromDisk),
          byteIdentical: identical,
          headerChanged,
          encryptedFile: encryptedFile.replace(/\\/g, "/"),
          decryptedFile: decryptedFile.replace(/\\/g, "/"),
          result: identical && dec.verified && headerChanged ? "LULUS" : "GAGAL",
        });
        expect(identical).toBe(true);
        expect(headerChanged).toBe(true);
        expect(dec.fileName).toBe(fx.file);
      });
    }
  }
});

const TEXT_SAMPLES: Array<{ cipher: CipherId; message: string; key: KeyFormValues }> = [
  { cipher: "vigenere", message: "Serang pukul 10.30!", key: keys({ keyword: "KRIPTO" }) },
  { cipher: "autokey", message: "Ujian tengah semester kriptografi", key: keys({ keyword: "UTS" }) },
  { cipher: "extended-vigenere", message: "Halo, Dunia! Byte 0-255 ✓", key: keys({ byteKey: "kunci" }) },
  { cipher: "playfair", message: "Jangan lewatkan pesan XX ini", key: keys({ keyword: "MONARCHY" }) },
  { cipher: "affine", message: "Affine cipher", key: keys({ affineA: "5", affineB: "8" }) },
  { cipher: "hill", message: "Kriptografi klasik", key: keys({ hillMatrix: "6 24 1\n13 16 10\n20 17 15" }) },
  { cipher: "super", message: "Super enkripsi pada byte", key: keys({ byteKey: "SuperKunci", columnKey: "TRANSPOSISI" }) },
  { cipher: "enigma-i", message: "HELLOWORLD", key: TEST_KEYS["enigma-i"] },
];

describe("contoh teks per cipher", () => {
  for (const sample of TEXT_SAMPLES) {
    it(sample.cipher, async () => {
      const enc = await encryptMessage({ cipher: sample.cipher, key: sample.key, input: { kind: "text", text: sample.message } });
      const dir = path.join(SAMPLES, "teks");
      mkdirSync(dir, { recursive: true });
      const file = path.join(dir, `${sample.cipher}.dat`);
      writeFileSync(file, enc.container);
      const dec = await decryptMessage({ kind: "package", container: new Uint8Array(readFileSync(file)), key: sample.key });
      const alpha = isAlphaCipher(sample.cipher);
      const plain = Buffer.from(enc.plainBytes).toString("utf8");
      const recovered = Buffer.from(dec.bytes).toString("utf8");
      textExamples.push({
        algorithm: sample.cipher,
        algorithmName: CIPHERS[sample.cipher].name,
        message: sample.message,
        parameters: keyParams(sample.cipher, sample.key),
        processedPlaintext: plain,
        plaintextBase64: Buffer.from(enc.plainBytes).toString("base64"),
        ciphertextLetters: alpha ? Buffer.from(enc.payload).toString("latin1") : null,
        ciphertextBase64: Buffer.from(enc.payload).toString("base64"),
        packageFile: file.replace(/\\/g, "/"),
        packageSize: enc.container.length,
        packageBase64: Buffer.from(enc.container).toString("base64"),
        recoveryMetadata: {
          playfair: enc.metadata.playfair ?? null,
          hill: enc.metadata.hill ?? null,
        },
        decrypted: recovered,
        checksumVerified: dec.verified,
        result: recovered === plain && dec.verified ? "LULUS" : "GAGAL",
      });
      expect(recovered).toBe(plain);
      if (sample.cipher === "enigma-i") expect(Buffer.from(enc.payload).toString("ascii")).toBe("ILBDAAMTAZ");
    });
  }
});

afterAll(() => {
  const generatedAt = new Date().toISOString();
  const summary = CIPHER_IDS.map((cipher) => {
    const rows = scenarios.filter((s) => s.algorithm === cipher);
    return {
      algorithm: cipher,
      algorithmName: CIPHERS[cipher].name,
      fileScenarios: rows.length,
      passed: rows.filter((s) => s.result === "LULUS").length,
      textExample: textExamples.find((t) => t.algorithm === cipher)?.result ?? "TIDAK DIJALANKAN",
    };
  });
  writeFileSync(
    path.join(EVIDENCE, "file-scenarios.json"),
    `${JSON.stringify({ generatedAt, command: "pnpm evidence", engine: "Ruby via HTTP", node: process.version, summary, scenarios }, null, 2)}\n`,
  );
  writeFileSync(
    path.join(EVIDENCE, "text-examples.json"),
    `${JSON.stringify({ generatedAt, command: "pnpm evidence", engine: "Ruby via HTTP", examples: textExamples }, null, 2)}\n`,
  );
  const lines = [
    "# Hasil skenario file",
    "",
    `Dihasilkan oleh \`pnpm evidence\` pada ${generatedAt} dengan Node.js ${process.version}. Data lengkap ada di \`file-scenarios.json\`.`,
    "",
    "| No | Algoritma | Jenis | Fixture | Ukuran asal | Ukuran paket | Ukuran pulih | SHA-256 asal (12 digit awal) | Identik | Hasil |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...scenarios.map(
      (s) =>
        `| ${s.no} | ${s.algorithmName} | ${s.fileKind} | ${s.fixture} | ${s.originalSize} | ${s.containerSize} | ${s.decryptedSize} | ${s.originalSha256.slice(0, 12)} | ${s.byteIdentical ? "Ya" : "Tidak"} | ${s.result} |`,
    ),
    "",
  ];
  writeFileSync(path.join(EVIDENCE, "file-scenarios.md"), lines.join("\n"));
});
