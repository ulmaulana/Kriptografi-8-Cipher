// Codec alpha25-v1 (PRD bagian 6): setiap byte b menjadi dua simbol dari
// alfabet 25 huruf tanpa J, dengan indeks floor(b / 25) dan b mod 25.
// Keluaran berupa indeks alfabet standar A=0 sampai Z=25 agar dapat langsung
// diproses cipher modulo 26. Codec ini representasi data, bukan enkripsi.

export const ALPHA25_ID = "alpha25-v1";
export const ALPHA25_ALPHABET = "ABCDEFGHIKLMNOPQRSTUVWXYZ";

const J_INDEX = 9;
// Indeks codec (0-24) ke indeks alfabet standar (0-25).
const CODEC_TO_STD = new Uint8Array(25);
// Indeks alfabet standar ke indeks codec, -1 untuk J.
const STD_TO_CODEC = new Int8Array(26).fill(-1);
for (let i = 0; i < 25; i++) {
  const std = ALPHA25_ALPHABET.charCodeAt(i) - 65;
  CODEC_TO_STD[i] = std;
  STD_TO_CODEC[std] = i;
}

export function alpha25Encode(bytes: Uint8Array): Uint8Array {
  const out = new Uint8Array(bytes.length * 2);
  for (let i = 0; i < bytes.length; i++) {
    const b = bytes[i]!;
    out[2 * i] = CODEC_TO_STD[Math.floor(b / 25)]!;
    out[2 * i + 1] = CODEC_TO_STD[b % 25]!;
  }
  return out;
}

export class CodecError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CodecError";
  }
}

export function alpha25Decode(indices: Uint8Array): Uint8Array {
  if (indices.length % 2 !== 0) {
    throw new CodecError(`Codec alpha25-v1: jumlah simbol ${indices.length} ganjil.`);
  }
  const out = new Uint8Array(indices.length / 2);
  for (let i = 0; i < out.length; i++) {
    const hi = STD_TO_CODEC[indices[2 * i]!] ?? -1;
    const lo = STD_TO_CODEC[indices[2 * i + 1]!] ?? -1;
    if (hi < 0 || lo < 0) {
      throw new CodecError(`Codec alpha25-v1: simbol di luar alfabet codec (J) pada pasangan ke-${i}.`);
    }
    const value = 25 * hi + lo;
    if (value > 255) {
      throw new CodecError(`Codec alpha25-v1: nilai pasangan ke-${i} adalah ${value}, melebihi 255.`);
    }
    out[i] = value;
  }
  return out;
}

export { J_INDEX };
