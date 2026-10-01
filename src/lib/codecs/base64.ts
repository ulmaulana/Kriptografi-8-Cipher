// Base64 standar RFC 4648 bagian 4 dengan padding "=".
// Kapitalisasi dipertahankan apa adanya karena "A" dan "a" mewakili nilai berbeda.

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const ENCODE_TABLE = new Uint8Array(64);
const DECODE_TABLE = new Int16Array(128).fill(-1);
for (let i = 0; i < 64; i++) {
  const code = CHARS.charCodeAt(i);
  ENCODE_TABLE[i] = code;
  DECODE_TABLE[code] = i;
}
const PAD = 61; // "="

const asciiDecoder = new TextDecoder();

export function encodeBase64(bytes: Uint8Array): string {
  const outLength = Math.ceil(bytes.length / 3) * 4;
  const out = new Uint8Array(outLength);
  let o = 0;
  let i = 0;
  const full = bytes.length - (bytes.length % 3);
  for (; i < full; i += 3) {
    const n = (bytes[i]! << 16) | (bytes[i + 1]! << 8) | bytes[i + 2]!;
    out[o++] = ENCODE_TABLE[(n >> 18) & 63]!;
    out[o++] = ENCODE_TABLE[(n >> 12) & 63]!;
    out[o++] = ENCODE_TABLE[(n >> 6) & 63]!;
    out[o++] = ENCODE_TABLE[n & 63]!;
  }
  const rest = bytes.length - full;
  if (rest === 1) {
    const n = bytes[i]! << 16;
    out[o++] = ENCODE_TABLE[(n >> 18) & 63]!;
    out[o++] = ENCODE_TABLE[(n >> 12) & 63]!;
    out[o++] = PAD;
    out[o++] = PAD;
  } else if (rest === 2) {
    const n = (bytes[i]! << 16) | (bytes[i + 1]! << 8);
    out[o++] = ENCODE_TABLE[(n >> 18) & 63]!;
    out[o++] = ENCODE_TABLE[(n >> 12) & 63]!;
    out[o++] = ENCODE_TABLE[(n >> 6) & 63]!;
    out[o++] = PAD;
  }
  return asciiDecoder.decode(out);
}

/** Base64 dari sebagian awal data, untuk pratinjau tanpa mengode seluruh data. */
export function encodeBase64Preview(bytes: Uint8Array, maxChars: number): { text: string; truncated: boolean } {
  const fullLength = Math.ceil(bytes.length / 3) * 4;
  if (fullLength <= maxChars) return { text: encodeBase64(bytes), truncated: false };
  const byteCount = Math.floor(maxChars / 4) * 3;
  return { text: encodeBase64(bytes.subarray(0, byteCount)), truncated: true };
}

export class Base64Error extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Base64Error";
  }
}

/**
 * Dekode Base64 secara ketat. Spasi dan baris baru di antara karakter diabaikan
 * (sering terbawa saat menyalin), tetapi karakter lain di luar alfabet Base64,
 * padding yang salah letak, panjang yang bukan kelipatan 4, dan bit sisa yang
 * tidak nol ditolak. Tidak ada huruf yang diubah kapitalisasinya atau dibuang.
 */
export function decodeBase64(input: string): Uint8Array {
  const clean = input.replace(/[ \t\r\n]/g, "");
  if (clean.length % 4 !== 0) {
    throw new Base64Error(`Panjang Base64 (${clean.length} karakter) bukan kelipatan 4.`);
  }
  let padding = 0;
  if (clean.endsWith("==")) padding = 2;
  else if (clean.endsWith("=")) padding = 1;
  const body = clean.length - padding;
  for (let i = 0; i < body; i++) {
    const code = clean.charCodeAt(i);
    if (code >= 128 || DECODE_TABLE[code] === -1) {
      const ch = clean[i];
      if (ch === "=") throw new Base64Error(`Tanda "=" hanya boleh berada di akhir (posisi ${i}).`);
      throw new Base64Error(`Karakter "${ch}" pada posisi ${i} bukan karakter Base64.`);
    }
  }
  const outLength = (clean.length / 4) * 3 - padding;
  const out = new Uint8Array(outLength);
  let o = 0;
  for (let i = 0; i < clean.length; i += 4) {
    const a = DECODE_TABLE[clean.charCodeAt(i)]!;
    const b = DECODE_TABLE[clean.charCodeAt(i + 1)]!;
    const cCode = clean.charCodeAt(i + 2);
    const dCode = clean.charCodeAt(i + 3);
    const c = cCode === PAD ? 0 : DECODE_TABLE[cCode]!;
    const d = dCode === PAD ? 0 : DECODE_TABLE[dCode]!;
    const n = (a << 18) | (b << 12) | (c << 6) | d;
    out[o++] = (n >> 16) & 255;
    if (cCode !== PAD) out[o++] = (n >> 8) & 255;
    if (dCode !== PAD) out[o++] = n & 255;
    if (cCode === PAD && (b & 15) !== 0) throw new Base64Error("Bit sisa sebelum padding tidak nol. Base64 rusak.");
    if (cCode !== PAD && dCode === PAD && (c & 3) !== 0) {
      throw new Base64Error("Bit sisa sebelum padding tidak nol. Base64 rusak.");
    }
  }
  return out;
}
