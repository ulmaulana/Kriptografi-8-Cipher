export const CIPHER_IDS = [
  "vigenere",
  "autokey",
  "extended-vigenere",
  "playfair",
  "affine",
  "hill",
  "super",
  "enigma-i",
] as const;

export type CipherId = (typeof CIPHER_IDS)[number];

export type CipherKind = "alpha" | "byte";

export interface CipherInfo {
  id: CipherId;
  name: string;
  kind: CipherKind;
  summary: string;
}

export const CIPHERS: Record<CipherId, CipherInfo> = {
  vigenere: {
    id: "vigenere",
    name: "Vigenere standar",
    kind: "alpha",
    summary: "26 huruf, kata kunci diulang sepanjang pesan.",
  },
  autokey: {
    id: "autokey",
    name: "Auto-Key Vigenere",
    kind: "alpha",
    summary: "26 huruf, primer lalu dilanjutkan plainteks sebagai kunci.",
  },
  "extended-vigenere": {
    id: "extended-vigenere",
    name: "Extended Vigenere",
    kind: "byte",
    summary: "256 nilai byte, bekerja langsung pada byte data.",
  },
  playfair: {
    id: "playfair",
    name: "Playfair",
    kind: "alpha",
    summary: "Matriks 5 x 5, J digabung ke I, pengisi X atau Q.",
  },
  affine: {
    id: "affine",
    name: "Affine",
    kind: "alpha",
    summary: "C = a·P + b mod 26, a harus relatif prima terhadap 26.",
  },
  hill: {
    id: "hill",
    name: "Hill",
    kind: "alpha",
    summary: "Matriks n x n invertibel modulo 26, vektor kolom.",
  },
  super: {
    id: "super",
    name: "Super Enkripsi",
    kind: "byte",
    summary: "Extended Vigenere lalu transposisi kolom pada byte.",
  },
  "enigma-i": {
    id: "enigma-i",
    name: "Enigma I",
    kind: "alpha",
    summary: "Tiga rotor, reflector, ring setting, dan plugboard pada huruf A-Z.",
  },
};

export function isCipherId(value: unknown): value is CipherId {
  return typeof value === "string" && (CIPHER_IDS as readonly string[]).includes(value);
}

export function isAlphaCipher(id: CipherId): boolean {
  return CIPHERS[id].kind === "alpha";
}
