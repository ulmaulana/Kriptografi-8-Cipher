// Vektor acuan TV-01 sampai TV-07 (PRD 9.1). Nilai yang diharapkan dibekukan
// sebagai literal dan diperiksa pada arah enkripsi maupun dekripsi.

import { describe, expect, it } from "vitest";
import { affineDecrypt, affineEncrypt } from "@/lib/crypto/affine";
import { autokeyDecrypt, autokeyEncrypt } from "@/lib/crypto/autokey";
import { extendedVigenereDecrypt, extendedVigenereEncrypt } from "@/lib/crypto/extended-vigenere";
import { hillDecryptRaw, hillEncrypt } from "@/lib/crypto/hill";
import { buildPlayfairMatrix, playfairDecryptRaw, playfairEncrypt, playfairRestore } from "@/lib/crypto/playfair";
import { superDecrypt, superEncryptStages } from "@/lib/crypto/super-encryption";
import { columnOrder } from "@/lib/crypto/transposition";
import { vigenereDecrypt, vigenereEncrypt } from "@/lib/crypto/vigenere";
import { idx, str } from "./helpers";

describe("TV-01 Vigenere standar", () => {
  it("ATTACKATDAWN + LEMON = LXFOPVEFRNHR", () => {
    expect(str(vigenereEncrypt(idx("ATTACKATDAWN"), idx("LEMON")))).toBe("LXFOPVEFRNHR");
  });
  it("dekripsi LXFOPVEFRNHR", () => {
    expect(str(vigenereDecrypt(idx("LXFOPVEFRNHR"), idx("LEMON")))).toBe("ATTACKATDAWN");
  });
});

describe("TV-02 Auto-Key plaintext", () => {
  it("ATTACKATDAWN + QUEENLY = QNXEPVYTWTWP", () => {
    expect(str(autokeyEncrypt(idx("ATTACKATDAWN"), idx("QUEENLY")))).toBe("QNXEPVYTWTWP");
  });
  it("dekripsi QNXEPVYTWTWP", () => {
    expect(str(autokeyDecrypt(idx("QNXEPVYTWTWP"), idx("QUEENLY")))).toBe("ATTACKATDAWN");
  });
});

describe("TV-03 Extended Vigenere", () => {
  it("[0,65,255] + [1,2] = [1,67,0]", () => {
    expect(Array.from(extendedVigenereEncrypt(Uint8Array.from([0, 65, 255]), Uint8Array.from([1, 2])))).toEqual([1, 67, 0]);
  });
  it("dekripsi [1,67,0]", () => {
    expect(Array.from(extendedVigenereDecrypt(Uint8Array.from([1, 67, 0]), Uint8Array.from([1, 2])))).toEqual([0, 65, 255]);
  });
});

describe("TV-04 Playfair", () => {
  const key = idx("PLAYFAIREXAMPLE");
  it("matriks per baris", () => {
    expect(str(buildPlayfairMatrix(key).cells)).toBe("PLAYFIREXMBCDGHKNOQSTUVWZ");
  });
  it("HIDETHEGOLDINTHETREESTUMP menjadi BMODZBXDNABEKUDMUIXMMOUVIF", () => {
    const out = playfairEncrypt(idx("HIDETHEGOLDINTHETREESTUMP"), key);
    expect(str(out.prepared)).toBe("HIDETHEGOLDINTHETREXESTUMP");
    expect(str(out.cipher)).toBe("BMODZBXDNABEKUDMUIXMMOUVIF");
  });
  it("dekripsi mentah mempertahankan pengisi, dekripsi paket membuangnya", () => {
    const raw = playfairDecryptRaw(idx("BMODZBXDNABEKUDMUIXMMOUVIF"), buildPlayfairMatrix(key));
    expect(str(raw)).toBe("HIDETHEGOLDINTHETREXESTUMP");
    const { fillerBits, jBits } = playfairEncrypt(idx("HIDETHEGOLDINTHETREESTUMP"), key);
    expect(str(playfairRestore(raw, fillerBits, jBits))).toBe("HIDETHEGOLDINTHETREESTUMP");
  });
});

describe("TV-05 Affine", () => {
  it("AFFINECIPHER, a=5, b=8 = IHHWVCSWFRCP", () => {
    expect(str(affineEncrypt(idx("AFFINECIPHER"), { a: 5, b: 8 }))).toBe("IHHWVCSWFRCP");
  });
  it("dekripsi IHHWVCSWFRCP", () => {
    expect(str(affineDecrypt(idx("IHHWVCSWFRCP"), { a: 5, b: 8 }))).toBe("AFFINECIPHER");
  });
});

describe("TV-06 Hill vektor kolom", () => {
  const K = [
    [6, 24, 1],
    [13, 16, 10],
    [20, 17, 15],
  ];
  it("ACT menjadi POH", () => {
    const out = hillEncrypt(idx("ACT"), K);
    expect(str(out.cipher)).toBe("POH");
    expect(out.padCount).toBe(0);
  });
  it("dekripsi POH", () => {
    expect(str(hillDecryptRaw(idx("POH"), K))).toBe("ACT");
  });
});

describe("TV-07 Super Enkripsi", () => {
  const plain = Uint8Array.from([0, 1, 2, 3, 254, 255, 128]);
  const byteKey = Uint8Array.from([1, 2]);
  const colKey = idx("BABA");
  it("urutan kolom BABA adalah [1,3,0,2]", () => {
    expect(columnOrder(colKey)).toEqual([1, 3, 0, 2]);
  });
  it("tahap perantara dan hasil akhir", () => {
    const stages = superEncryptStages(plain, byteKey, colKey);
    expect(Array.from(stages.vigenere)).toEqual([1, 3, 3, 5, 255, 1, 129]);
    expect(Array.from(stages.cipher)).toEqual([3, 1, 5, 1, 255, 3, 129]);
  });
  it("dekripsi [3,1,5,1,255,3,129]", () => {
    expect(Array.from(superDecrypt(Uint8Array.from([3, 1, 5, 1, 255, 3, 129]), byteKey, colKey))).toEqual([
      0, 1, 2, 3, 254, 255, 128,
    ]);
  });
});
