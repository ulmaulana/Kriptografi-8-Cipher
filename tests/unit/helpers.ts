import { createHash } from "node:crypto";
import { EMPTY_KEY_VALUES, type KeyFormValues } from "@/lib/validation/keys";

/** Indeks huruf dihitung langsung dari kode karakter, tanpa memanggil kode produksi. */
export function idx(letters: string): Uint8Array {
  return Uint8Array.from(letters, (ch) => ch.charCodeAt(0) - 65);
}

export function str(indices: Uint8Array): string {
  return String.fromCharCode(...Array.from(indices, (i) => i + 65));
}

export function keys(values: Partial<KeyFormValues>): KeyFormValues {
  return { ...EMPTY_KEY_VALUES, ...values };
}

/** SHA-256 dari node:crypto sebagai pembanding independen. */
export function sha256(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}

/** PRNG deterministik (mulberry32) untuk data uji berukuran besar. */
export function pseudoRandomBytes(length: number, seed: number): Uint8Array {
  const out = new Uint8Array(length);
  let a = seed >>> 0;
  for (let i = 0; i < length; i++) {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    out[i] = ((t ^ (t >>> 14)) >>> 0) & 255;
  }
  return out;
}

/** Kunci uji yang tercatat untuk setiap cipher. */
export const TEST_KEYS = {
  vigenere: keys({ keyword: "KRIPTOGRAFI" }),
  autokey: keys({ keyword: "UTSKRIPTO" }),
  "extended-vigenere": keys({ byteKey: "Kunci Byte 2026!", byteKeyFormat: "text" }),
  playfair: keys({ keyword: "MONARCHY" }),
  affine: keys({ affineA: "7", affineB: "10" }),
  hill: keys({ hillMatrix: "6 24 1\n13 16 10\n20 17 15" }),
  super: keys({ byteKey: "SuperKunci", byteKeyFormat: "text", columnKey: "TRANSPOSISI" }),
  "enigma-i": keys({ rotors: ["I", "II", "III"], ringSettings: [1, 1, 1], initialPositions: ["A", "A", "A"], reflector: "B", plugboard: "" }),
} as const;
