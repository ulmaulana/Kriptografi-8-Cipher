// TC-13 sampai TC-16 (PRD 9.2): kontainer, file, kesalahan, dan tampilan.

import { describe, expect, it } from "vitest";
import { CIPHER_IDS, type CipherId, isAlphaCipher } from "@/lib/crypto/ciphers";
import { parseContainer } from "@/lib/container/format";
import { decryptMessage } from "@/lib/engine/decrypt";
import { encryptMessage } from "@/lib/engine/encrypt";
import { keys, pseudoRandomBytes, sha256, TEST_KEYS } from "./helpers";

const TEXT = "Ujian Tengah Semester Kriptografi, Rabu 30 September 2026. XQ jaJa ZZ!";

/** Menyalin byte ke buffer baru agar tidak ada referensi ke objek hasil enkripsi. */
function fresh(bytes: Uint8Array): Uint8Array {
  return new Uint8Array(Array.from(bytes));
}

function freshKey(cipher: CipherId) {
  return JSON.parse(JSON.stringify(TEST_KEYS[cipher]));
}

describe("TC-13 kontainer lintas sesi", () => {
  for (const cipher of CIPHER_IDS) {
    it(`${cipher}: paket teks didekripsi hanya dengan paket dan kunci`, async () => {
      const enc = await encryptMessage({ cipher, key: TEST_KEYS[cipher], input: { kind: "text", text: TEXT } });
      const container = fresh(enc.container);
      const dec = await decryptMessage({ kind: "package", container, key: freshKey(cipher) });
      expect(dec.cipher).toBe(cipher);
      expect(dec.verified).toBe(true);
      const expected = isAlphaCipher(cipher) ? "UJIANTENGAHSEMESTERKRIPTOGRAFIRABUSEPTEMBERXQJAJAZZ" : TEXT;
      expect(new TextDecoder().decode(dec.bytes)).toBe(expected);
      expect(dec.sha256).toBe(sha256(new TextEncoder().encode(expected)));
    });
  }
  it("metadata tidak memuat kunci atau plainteks", async () => {
    const enc = await encryptMessage({ cipher: "vigenere", key: keys({ keyword: "RAHASIASEKALI" }), input: { kind: "text", text: "PESANYANGSANGATRAHASIA" } });
    const json = JSON.stringify(parseContainer(enc.container).metadata);
    expect(json).not.toContain("RAHASIASEKALI");
    expect(json).not.toContain("PESANYANGSANGATRAHASIA");
  });
});

describe("TC-14 file", () => {
  const files: Array<[string, Uint8Array]> = [
    ["kosong", new Uint8Array(0)],
    ["satu byte", Uint8Array.from([0xff])],
    ["semua nilai byte", Uint8Array.from({ length: 256 }, (_, i) => i)],
    ["biner bukan UTF-8", Uint8Array.from([0xc3, 0x28, 0xa0, 0xa1, 0xe2, 0x28, 0xa1, 0xf0, 0x90, 0x28, 0xbc, 0xfe, 0xff])],
  ];
  for (const cipher of CIPHER_IDS) {
    for (const [label, bytes] of files) {
      it(`${cipher}: ${label}`, async () => {
        const enc = await encryptMessage({
          cipher,
          key: TEST_KEYS[cipher],
          input: { kind: "file", bytes, name: "contoh.bin", type: "application/octet-stream", readAs: "bytes" },
        });
        const dec = await decryptMessage({ kind: "package", container: fresh(enc.container), key: freshKey(cipher) });
        expect(dec.fileName).toBe("contoh.bin");
        expect(dec.bytes.length).toBe(bytes.length);
        expect(sha256(dec.bytes)).toBe(sha256(bytes));
        expect(Buffer.from(dec.bytes).equals(Buffer.from(bytes))).toBe(true);
      });
    }
  }
  it("file beberapa megabyte pada setiap cipher", async () => {
    const big = pseudoRandomBytes(3 * 1024 * 1024, 2026);
    for (const cipher of CIPHER_IDS) {
      const enc = await encryptMessage({
        cipher,
        key: TEST_KEYS[cipher],
        input: { kind: "file", bytes: big, name: "besar.bin", type: "", readAs: "bytes" },
      });
      // Seluruh byte, termasuk "header", ikut berubah: payload tidak memuat 64 byte awal file apa adanya.
      if (!isAlphaCipher(cipher)) expect(Buffer.from(enc.payload.subarray(0, 64)).equals(Buffer.from(big.subarray(0, 64)))).toBe(false);
      const dec = await decryptMessage({ kind: "package", container: enc.container, key: freshKey(cipher) });
      expect(sha256(dec.bytes)).toBe(sha256(big));
    }
  }, 120_000);
});

describe("TC-15 kesalahan tidak menghasilkan sukses palsu", () => {
  async function sample() {
    return encryptMessage({ cipher: "vigenere", key: keys({ keyword: "LEMON" }), input: { kind: "text", text: "ATTACKATDAWN" } });
  }
  it("kunci salah ditolak melalui checksum", async () => {
    const enc = await sample();
    await expect(decryptMessage({ kind: "package", container: enc.container, key: keys({ keyword: "LIME" }) })).rejects.toThrow(/Checksum/);
  });
  it("kunci salah pada file alpha25 ditolak", async () => {
    const bytes = Uint8Array.from({ length: 64 }, (_, i) => i * 3);
    for (const cipher of ["vigenere", "autokey", "playfair", "affine", "hill", "extended-vigenere", "super"] as const) {
      const enc = await encryptMessage({ cipher, key: TEST_KEYS[cipher], input: { kind: "file", bytes, name: "a.bin", type: "", readAs: "bytes" } });
      const wrong = {
        vigenere: keys({ keyword: "SALAH" }),
        autokey: keys({ keyword: "SALAH" }),
        playfair: keys({ keyword: "SALAH" }),
        affine: keys({ affineA: "5", affineB: "1" }),
        hill: keys({ hillMatrix: "3 3 1\n2 5 1\n1 1 1" }),
        "extended-vigenere": keys({ byteKey: "salah" }),
        super: keys({ byteKey: "SuperKunci", columnKey: "SALAH" }),
      }[cipher];
      await expect(decryptMessage({ kind: "package", container: enc.container, key: wrong })).rejects.toThrow();
    }
  });
  it("header terpotong", async () => {
    const enc = await sample();
    await expect(decryptMessage({ kind: "package", container: enc.container.slice(0, 10), key: keys({ keyword: "LEMON" }) })).rejects.toThrow(/terpotong/);
    await expect(decryptMessage({ kind: "package", container: enc.container.slice(0, 20), key: keys({ keyword: "LEMON" }) })).rejects.toThrow(/terpotong/);
  });
  it("bukan paket", async () => {
    await expect(decryptMessage({ kind: "package", container: new TextEncoder().encode("halo dunia bukan paket"), key: keys({ keyword: "LEMON" }) })).rejects.toThrow(/bukan paket/);
  });
  it("versi tidak didukung", async () => {
    const c = (await sample()).container.slice();
    c[8] = 2;
    await expect(decryptMessage({ kind: "package", container: c, key: keys({ keyword: "LEMON" }) })).rejects.toThrow(/Versi paket 2/);
  });
  it("panjang payload tidak cocok", async () => {
    const c = (await sample()).container;
    await expect(decryptMessage({ kind: "package", container: c.slice(0, c.length - 1), key: keys({ keyword: "LEMON" }) })).rejects.toThrow(/Panjang payload/);
  });
  it("metadata rusak", async () => {
    const c = (await sample()).container.slice();
    c[13] = 0x7b + 1; // karakter pertama JSON "{" diganti "|"
    await expect(decryptMessage({ kind: "package", container: c, key: keys({ keyword: "LEMON" }) })).rejects.toThrow(/Metadata paket rusak/);
  });
  it("checksum dalam metadata diubah", async () => {
    const enc = await sample();
    const tampered = Buffer.from(enc.container);
    const at = tampered.indexOf(enc.metadata.sha256, 0, "latin1");
    expect(at).toBeGreaterThan(13);
    tampered.write("0".repeat(64), at, "latin1");
    await expect(decryptMessage({ kind: "package", container: tampered, key: keys({ keyword: "LEMON" }) })).rejects.toThrow(/Checksum/);
  });
});

describe("TC-16 perbandingan tampilan", () => {
  for (const cipher of CIPHER_IDS) {
    it(`${cipher}: Base64 payload sama dengan payload dalam kontainer`, async () => {
      const enc = await encryptMessage({ cipher, key: TEST_KEYS[cipher], input: { kind: "text", text: TEXT } });
      const parsed = parseContainer(enc.container);
      expect(Buffer.from(parsed.payload).toString("base64")).toBe(Buffer.from(enc.payload).toString("base64"));
      // Unduhan .dat adalah kontainer biner, bukan teks Base64.
      expect(new TextDecoder().decode(enc.container.subarray(0, 8))).toBe("UTSKRIPT");
      expect(enc.container[8]).toBe(1);
      // Payload Base64 yang didekode lalu didekripsi mentah memberi hasil yang sama.
      if (cipher !== "playfair" && cipher !== "hill") {
        const dec = await decryptMessage({ kind: "payload-base64", cipher, base64: Buffer.from(enc.payload).toString("base64"), key: TEST_KEYS[cipher] });
        expect(Buffer.from(dec.bytes).equals(Buffer.from(enc.plainBytes))).toBe(true);
      }
    });
  }
});
