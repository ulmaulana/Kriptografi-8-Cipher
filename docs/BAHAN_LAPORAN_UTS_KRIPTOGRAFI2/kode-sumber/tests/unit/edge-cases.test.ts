// Kasus batas TC-01 sampai TC-12 (PRD 9.2). Nilai acuan dihitung manual.

import { describe, expect, it } from "vitest";
import { alpha25Decode, alpha25Encode } from "@/lib/codecs/alpha25";
import { normalizeAlphabetic } from "@/lib/codecs/alphabet";
import { decodeBase64, encodeBase64 } from "@/lib/codecs/base64";
import { autokeyDecrypt, autokeyEncrypt } from "@/lib/crypto/autokey";
import { extendedVigenereDecrypt, extendedVigenereEncrypt } from "@/lib/crypto/extended-vigenere";
import { hillApply, hillDecryptRaw, hillEncrypt, hillInverseMod26 } from "@/lib/crypto/hill";
import { buildPlayfairMatrix, playfairDecryptRaw, playfairEncrypt, playfairRestore } from "@/lib/crypto/playfair";
import { columnarDecrypt, columnarEncrypt } from "@/lib/crypto/transposition";
import { vigenereDecrypt, vigenereEncrypt } from "@/lib/crypto/vigenere";
import { decryptMessage } from "@/lib/engine/decrypt";
import { encryptMessage } from "@/lib/engine/encrypt";
import { parseKey } from "@/lib/validation/keys";
import { idx, keys, str } from "./helpers";

describe("TC-01 normalisasi", () => {
  it("Serang pukul 10.30! menjadi SERANGPUKUL", () => {
    expect(normalizeAlphabetic("Serang pukul 10.30!")).toBe("SERANGPUKUL");
  });
  it("huruf non-ASCII tidak ditransliterasi", () => {
    expect(normalizeAlphabetic("Straße ıi Ärger ﬁ")).toBe("STRAEIRGER");
  });
});

describe("TC-02 panjang kata kunci", () => {
  it("kunci satu huruf", () => {
    expect(str(vigenereEncrypt(idx("HELLO"), idx("B")))).toBe("IFMMP");
  });
  it("kunci lebih pendek (TV-01)", () => {
    expect(str(vigenereEncrypt(idx("ATTACKATDAWN"), idx("LEMON")))).toBe("LXFOPVEFRNHR");
  });
  it("kunci sama panjang", () => {
    expect(str(vigenereEncrypt(idx("HELLO"), idx("WORLD")))).toBe("DSCWR");
    expect(str(vigenereDecrypt(idx("DSCWR"), idx("WORLD")))).toBe("HELLO");
  });
  it("kunci lebih panjang dari pesan", () => {
    expect(str(vigenereEncrypt(idx("HELLO"), idx("ABCDEFGHIJ")))).toBe("HFNOS");
    expect(str(vigenereDecrypt(idx("HFNOS"), idx("ABCDEFGHIJ")))).toBe("HELLO");
  });
  it("karakter yang dibuang tidak menggeser indeks kunci", async () => {
    const res = await encryptMessage({ cipher: "vigenere", key: keys({ keyword: "lemon" }), input: { kind: "text", text: "attack at dawn!" } });
    expect(new TextDecoder().decode(res.payload)).toBe("LXFOPVEFRNHR");
  });
});

describe("TC-03 Auto-Key", () => {
  it("pesan melampaui primer beberapa kali", () => {
    expect(str(autokeyEncrypt(idx("ATTACKATDAWN"), idx("K")))).toBe("KTMTCMKTWDWJ");
    expect(str(autokeyDecrypt(idx("KTMTCMKTWDWJ"), idx("K")))).toBe("ATTACKATDAWN");
  });
  it("dekripsi tidak sama dengan mengulang primer seperti Vigenere", () => {
    expect(str(vigenereDecrypt(idx("KTMTCMKTWDWJ"), idx("K")))).not.toBe("ATTACKATDAWN");
  });
});

describe("TC-04 Extended Vigenere", () => {
  const all = Uint8Array.from({ length: 256 }, (_, i) => i);
  it("seluruh nilai byte 0-255 dengan kunci berisi byte nol", () => {
    const key = Uint8Array.from([0, 255, 128]);
    const enc = extendedVigenereEncrypt(all, key);
    expect(enc[0]).toBe(0);
    expect(enc[1]).toBe(0); // 1 + 255 = 256 mod 256
    expect(enc[2]).toBe(130);
    expect(enc[255]).toBe(255); // 255 + 0
    expect(Array.from(extendedVigenereDecrypt(enc, key))).toEqual(Array.from(all));
  });
  it("teks UTF-8 multibyte melalui paket", async () => {
    const text = "Kriptografi 漢字 é 🔐";
    const enc = await encryptMessage({ cipher: "extended-vigenere", key: keys({ byteKey: "kunci" }), input: { kind: "text", text } });
    expect(enc.plainBytes.length).toBe(Buffer.from(text, "utf8").length);
    const dec = await decryptMessage({ kind: "package", container: enc.container, key: keys({ byteKey: "kunci" }) });
    expect(new TextDecoder().decode(dec.bytes)).toBe(text);
    expect(dec.representation).toBe("utf8");
  });
  it("kunci heksadesimal 00 valid, kunci kosong ditolak", () => {
    expect(parseKey("extended-vigenere", keys({ byteKey: "00", byteKeyFormat: "hex" })).ok).toBe(true);
    expect(parseKey("extended-vigenere", keys({ byteKey: "" })).ok).toBe(false);
    expect(parseKey("extended-vigenere", keys({ byteKey: "0", byteKeyFormat: "hex" })).ok).toBe(false);
  });
});

describe("TC-05 Playfair", () => {
  const key = idx("PLAYFAIREXAMPLE");
  const matrix = buildPlayfairMatrix(key);
  const cases: Array<[string, string, string]> = [
    // [masukan, teks siap pasangan, cipherteks]
    ["BALLOON", "BALXLOON", "DPYRANQO"],
    ["JIG", "IXIG", "RMXB"],
    ["XX", "XQXQ", "GWGW"],
    ["XQX", "XQXQ", "GWGW"],
  ];
  for (const [input, prepared, cipher] of cases) {
    it(`${input} dienkripsi dan dipulihkan tepat`, () => {
      const out = playfairEncrypt(idx(input), key);
      expect(str(out.prepared)).toBe(prepared);
      expect(str(out.cipher)).toBe(cipher);
      const raw = playfairDecryptRaw(out.cipher, matrix);
      expect(str(raw)).toBe(prepared);
      expect(str(playfairRestore(raw, out.fillerBits, out.jBits))).toBe(input);
    });
  }
  for (const input of ["HELLOX", "TESQ", "QUIZX", "ABC", "JJJ", "XXQQJ"]) {
    it(`X, Q, J asli dan panjang ganjil pulih melalui paket: ${input}`, async () => {
      const k = keys({ keyword: "PLAYFAIREXAMPLE" });
      const enc = await encryptMessage({ cipher: "playfair", key: k, input: { kind: "text", text: input } });
      const dec = await decryptMessage({ kind: "package", container: enc.container, key: k });
      expect(new TextDecoder().decode(dec.bytes)).toBe(input);
    });
  }
  it("cipherteks mentah berpanjang ganjil ditolak", async () => {
    await expect(
      decryptMessage({ kind: "raw-letters", cipher: "playfair", text: "BMO", key: keys({ keyword: "PLAYFAIREXAMPLE" }) }),
    ).rejects.toThrow(/genap/);
  });
});

describe("TC-06 Affine", () => {
  it("a = 2 ditolak", () => {
    const res = parseKey("affine", keys({ affineA: "2", affineB: "3" }));
    expect(res.ok).toBe(false);
  });
  it("a = 13 ditolak", () => {
    expect(parseKey("affine", keys({ affineA: "13", affineB: "0" })).ok).toBe(false);
  });
  it("a = -21 dan b = 34 direduksi menjadi a = 5, b = 8", async () => {
    const res = parseKey("affine", keys({ affineA: "-21", affineB: "34" }));
    expect(res.ok && res.key.cipher === "affine" && res.key.key).toEqual({ a: 5, b: 8 });
    const enc = await encryptMessage({ cipher: "affine", key: keys({ affineA: "-21", affineB: "34" }), input: { kind: "text", text: "AFFINECIPHER" } });
    expect(new TextDecoder().decode(enc.payload)).toBe("IHHWVCSWFRCP");
  });
  it("a = 31 dan b = -18 direduksi menjadi a = 5, b = 8", () => {
    const res = parseKey("affine", keys({ affineA: "31", affineB: "-18" }));
    expect(res.ok && res.key.cipher === "affine" && res.key.key).toEqual({ a: 5, b: 8 });
  });
  it("bukan bilangan bulat ditolak", () => {
    expect(parseKey("affine", keys({ affineA: "5.5", affineB: "1" })).ok).toBe(false);
  });
});

describe("TC-07 Hill matriks tidak valid", () => {
  for (const matrix of ["1 2\n2 4", "2 0\n0 1", "13 0\n0 1", "1 2 3\n4 5 6"]) {
    it(`ditolak: ${matrix.replace(/\n/g, " / ")}`, () => {
      expect(parseKey("hill", keys({ hillMatrix: matrix })).ok).toBe(false);
    });
  }
  it("matriks 1 x 1 ditolak", () => {
    expect(parseKey("hill", keys({ hillMatrix: "3" })).ok).toBe(false);
  });
});

describe("TC-08 Hill [[2,1],[13,7]]", () => {
  const K = [
    [2, 1],
    [13, 7],
  ];
  it("diterima dengan invers [[7,25],[13,2]]", () => {
    expect(hillInverseMod26(K)).toEqual([
      [7, 25],
      [13, 2],
    ]);
    expect(parseKey("hill", keys({ hillMatrix: "[[2,1],[13,7]]" })).ok).toBe(true);
  });
  it("HI menjadi WR dan kembali", () => {
    expect(str(hillEncrypt(idx("HI"), K).cipher)).toBe("WR");
    expect(str(hillDecryptRaw(idx("WR"), K))).toBe("HI");
  });
});

describe("TC-09 padding Hill", () => {
  const K = [
    [6, 24, 1],
    [13, 16, 10],
    [20, 17, 15],
  ];
  it("ACTX dengan X asli dipadding dua X", () => {
    const out = hillEncrypt(idx("ACTX"), K);
    expect(out.padCount).toBe(2);
    expect(str(out.cipher)).toBe("POHLNA");
    expect(str(hillApply(out.cipher, hillInverseMod26(K)!))).toBe("ACTXXX");
  });
  it("paket membuang tepat padding dan mempertahankan X asli", async () => {
    const k = keys({ hillMatrix: "6 24 1; 13 16 10; 20 17 15" });
    for (const text of ["ACT", "ACTX", "ACTXX", "XXXX"]) {
      const enc = await encryptMessage({ cipher: "hill", key: k, input: { kind: "text", text } });
      const dec = await decryptMessage({ kind: "package", container: enc.container, key: k });
      expect(new TextDecoder().decode(dec.bytes)).toBe(text);
    }
  });
  it("dekripsi mentah mempertahankan padding, panjang bukan kelipatan n ditolak", async () => {
    const k = keys({ hillMatrix: "6 24 1; 13 16 10; 20 17 15" });
    const dec = await decryptMessage({ kind: "raw-letters", cipher: "hill", text: "POHLNA", key: k });
    expect(new TextDecoder().decode(dec.bytes)).toBe("ACTXXX");
    await expect(decryptMessage({ kind: "raw-letters", cipher: "hill", text: "POHL", key: k })).rejects.toThrow(/kelipatan/);
  });
});

describe("TC-10 transposisi kolom", () => {
  it("kolom lebih banyak daripada byte", () => {
    const enc = columnarEncrypt(Uint8Array.from([10, 20]), idx("DCBA"));
    expect(Array.from(enc)).toEqual([20, 10]);
    expect(Array.from(columnarDecrypt(enc, idx("DCBA")))).toEqual([10, 20]);
  });
  it("baris terakhir tidak penuh", () => {
    const data = Uint8Array.from({ length: 10 }, (_, i) => i);
    const enc = columnarEncrypt(data, idx("CAB"));
    expect(Array.from(enc)).toEqual([1, 4, 7, 2, 5, 8, 0, 3, 6, 9]);
    expect(Array.from(columnarDecrypt(enc, idx("CAB")))).toEqual(Array.from(data));
  });
  it("huruf kunci berulang BABA stabil", () => {
    const data = Uint8Array.from([1, 3, 3, 5, 255, 1, 129]);
    expect(Array.from(columnarEncrypt(data, idx("BABA")))).toEqual([3, 1, 5, 1, 255, 3, 129]);
  });
});

describe("TC-11 codec alpha25-v1", () => {
  it("setiap nilai byte pulih tanpa perubahan", () => {
    const all = Uint8Array.from({ length: 256 }, (_, i) => i);
    const letters = alpha25Encode(all);
    expect(str(letters.subarray(0, 2))).toBe("AA");
    expect(str(letters.subarray(510, 512))).toBe("LF");
    expect(letters.includes(9)).toBe(false);
    expect(Array.from(alpha25Decode(letters))).toEqual(Array.from(all));
  });
  it("pasangan tidak valid ditolak", () => {
    expect(() => alpha25Decode(idx("ABC"))).toThrow(/ganjil/);
    expect(() => alpha25Decode(idx("AJ"))).toThrow(/J/);
    expect(() => alpha25Decode(idx("LG"))).toThrow(/256/);
    expect(() => alpha25Decode(idx("ZZ"))).toThrow(/624/);
  });
});

describe("TC-12 Base64", () => {
  it("cocok dengan Buffer Node dan kapitalisasi dipertahankan", () => {
    const data = Uint8Array.from([0, 1, 2, 250, 251, 252, 253, 254, 255, 77, 97, 110]);
    for (let len = 0; len <= data.length; len++) {
      const part = data.subarray(0, len);
      const b64 = encodeBase64(part);
      expect(b64).toBe(Buffer.from(part).toString("base64"));
      expect(Array.from(decodeBase64(b64))).toEqual(Array.from(part));
    }
    expect(encodeBase64(new TextEncoder().encode("Man"))).toBe("TWFu");
    expect(Array.from(decodeBase64("twfu"))).not.toEqual(Array.from(decodeBase64("TWFu")));
  });
  it("input rusak ditolak", () => {
    expect(() => decodeBase64("TWF")).toThrow(/kelipatan 4/);
    expect(() => decodeBase64("TW=u")).toThrow();
    expect(() => decodeBase64("TWF!")).toThrow(/bukan karakter Base64/);
    expect(() => decodeBase64("TR==")).toThrow(/Bit sisa/);
  });
  it("angka, +, /, = tidak dibuang saat dekripsi Base64 payload", async () => {
    const payload = Uint8Array.from([0xfb, 0xff, 0xbf, 0x3e]); // "+/+/Pg=="
    const b64 = Buffer.from(payload).toString("base64");
    expect(b64).toBe("+/+/Pg==");
    const dec = await decryptMessage({ kind: "payload-base64", cipher: "extended-vigenere", base64: b64, key: keys({ byteKey: "01", byteKeyFormat: "hex" }) });
    expect(Array.from(dec.bytes)).toEqual([0xfa, 0xfe, 0xbe, 0x3d]);
  });
});
